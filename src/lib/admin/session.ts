import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "vs_admin";
const WEEK = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.ADMIN_SECRET?.trim();
  if (value) return value;
  return "varasena-admin-dev-secret";
}

export type AdminSession = { username: string };

export function signSession(username: string) {
  const exp = Date.now() + WEEK * 1000;
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSession(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { u?: string; exp?: number };
    if (!data.u || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { username: data.u };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const jar = await cookies();
  return readSession(jar.get(COOKIE)?.value);
}

export async function setAdminSession(username: string) {
  const jar = await cookies();
  jar.set(COOKIE, signSession(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
