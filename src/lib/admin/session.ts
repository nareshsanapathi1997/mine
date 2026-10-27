import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { findAdmin } from "@/lib/admin/users";

const COOKIE = "vs_admin";
const WEEK = 60 * 60 * 24 * 7;
const SECRET_MIN = 32;
const DEV_SECRET = "varasena-admin-dev-secret-not-for-production";

/**
 * Signing key. Production requires ADMIN_SECRET of at least 32 characters;
 * without it no session can be created or read. Development falls back to a
 * fixed key so the panel works out of the box.
 */
export function sessionSecret(): string | null {
  const value = process.env.ADMIN_SECRET?.trim() ?? "";
  const strong = value.length >= SECRET_MIN && !/change-me/i.test(value);
  if (strong) return value;
  if (process.env.NODE_ENV === "production") {
    console.error(`[admin] ADMIN_SECRET must be a random string of at least ${SECRET_MIN} characters. Admin sign-in is disabled.`);
    return null;
  }
  return value || DEV_SECRET;
}

export type AdminSession = { username: string };
type TokenData = { u: string; v: string; exp: number };

/** Short fingerprint of the password hash. Changing the password invalidates every older token. */
export function passwordVersion(passwordHash: string) {
  return createHash("sha256").update(passwordHash).digest("base64url").slice(0, 16);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signSession(username: string, passwordHash: string, now = Date.now()) {
  const secret = sessionSecret();
  if (!secret) throw new Error("ADMIN_SECRET is not configured.");
  const data: TokenData = { u: username, v: passwordVersion(passwordHash), exp: now + WEEK * 1000 };
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

/** Verifies signature and expiry only. Use getAdminSession() to also check the password version. */
export function readSessionToken(token: string | undefined, now = Date.now()): TokenData | null {
  if (!token) return null;
  const secret = sessionSecret();
  if (!secret) return null;
  const [payload, sig, extra] = token.split(".");
  if (!payload || !sig || extra !== undefined) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload, secret));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<TokenData>;
    if (typeof data.u !== "string" || !data.u || typeof data.v !== "string") return null;
    if (typeof data.exp !== "number" || data.exp < now) return null;
    return { u: data.u, v: data.v, exp: data.exp };
  } catch {
    return null;
  }
}

/** Signed, unexpired, and issued for the admin's current password. Fails closed if the database is down. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = readSessionToken(jar.get(COOKIE)?.value);
  if (!token) return null;
  try {
    const user = await findAdmin(token.u);
    if (!user) return null;
    const a = Buffer.from(token.v);
    const b = Buffer.from(passwordVersion(user.password_hash));
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return { username: user.username };
  } catch (error) {
    console.error("[admin] Could not verify the session.", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

/**
 * For admin pages: the signed-in admin, or a redirect to the login page.
 * Call it in every page that reads admin data, not only in the layout. A
 * layout check alone does not stop a page segment from rendering (see
 * node_modules/next/dist/docs/01-app/02-guides/authentication.md).
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

async function cookieSecure() {
  if (process.env.ADMIN_COOKIE_SECURE === "0") return false;
  const proto = (await headers()).get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (proto === "https") return true;
  if (proto === "http") return false;
  return process.env.NODE_ENV === "production";
}

export async function setAdminSession(user: { username: string; password_hash: string }) {
  const jar = await cookies();
  jar.set(COOKIE, signSession(user.username, user.password_hash), {
    httpOnly: true,
    sameSite: "strict",
    secure: await cookieSecure(),
    path: "/",
    maxAge: WEEK,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete({ name: COOKIE, path: "/" });
}
