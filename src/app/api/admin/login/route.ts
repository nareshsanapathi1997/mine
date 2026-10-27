import { NextResponse } from "next/server";
import { PASSWORD_MAX } from "@/lib/admin/password";
import { setAdminSession, sessionSecret } from "@/lib/admin/session";
import { authenticateAdmin, throttleKey } from "@/lib/admin/users";
import { clientIp, rateLimit, resetRateLimit } from "@/lib/spam";

export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
/** Attempts per IP, success or not. Stops one machine spraying many usernames. */
const IP_MAX = 20;
/**
 * Attempts per username from one IP. Keyed on the pair so an attacker can only
 * block their own address, never lock the real admin out from elsewhere.
 * Cleared on a successful sign-in.
 */
const USER_IP_MAX = 5;
/** Attempts per username across all IPs before each further try is slowed down (never refused). */
const USER_SLOW_AFTER = 30;
const SLOW_DOWN_MS = 2000;


function json(body: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

function tooMany(retryAfter: number) {
  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  return json(
    { ok: false, message: `Too many sign-in attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
    429,
    { "Retry-After": String(retryAfter) },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: "Send username and password as JSON." }, 400);
  }
  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const username = typeof record.username === "string" ? record.username.trim().slice(0, 80) : "";
  const password = typeof record.password === "string" ? record.password : "";
  if (!username || !password) {
    return json({ ok: false, message: "Enter your username and password." }, 400);
  }
  if (password.length > PASSWORD_MAX) {
    return json({ ok: false, message: "Those details did not match." }, 401);
  }
  if (!sessionSecret()) {
    return json({ ok: false, message: "Admin sign-in is not configured on this server." }, 503);
  }

  const ip = clientIp(request);
  const ipLimit = await rateLimit(ip, { scope: "admin-login-ip", max: IP_MAX, windowMs: WINDOW_MS });
  if (!ipLimit.ok) return tooMany(ipLimit.retryAfter);
  const userKey = throttleKey(username);
  const pairKey = `${userKey}|${ip}`;
  const pairLimit = await rateLimit(pairKey, { scope: "admin-login-user-ip", max: USER_IP_MAX, windowMs: WINDOW_MS });
  if (!pairLimit.ok) return tooMany(pairLimit.retryAfter);
  // Many IPs guessing one account: slow every attempt down instead of refusing,
  // so the real admin can still sign in while an attack is running.
  const accountLimit = await rateLimit(userKey, { scope: "admin-login-user", max: USER_SLOW_AFTER, windowMs: WINDOW_MS });
  if (!accountLimit.ok) await new Promise((resolve) => setTimeout(resolve, SLOW_DOWN_MS));

  try {
    const user = await authenticateAdmin(username, password);
    if (!user) {
      console.warn(`[admin] Failed sign-in for "${userKey}".`);
      return json({ ok: false, message: "Those details did not match." }, 401);
    }
    await resetRateLimit(pairKey, "admin-login-user-ip");
    await setAdminSession(user);
    return json({ ok: true });
  } catch (error) {
    console.error("[admin] Login failed.", error instanceof Error ? error.message : "Unknown error");
    return json({ ok: false, message: "Could not sign in. Check the database is running." }, 500);
  }
}
