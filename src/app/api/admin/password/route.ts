import { NextResponse } from "next/server";
import { getAdminSession, setAdminSession } from "@/lib/admin/session";
import { findAdmin, updateAdminPassword } from "@/lib/admin/users";
import { passwordProblem, verifyPassword } from "@/lib/admin/password";
import { rateLimit } from "@/lib/spam";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const limit = await rateLimit(session.username, { scope: "admin-password", max: 5, windowMs: 15 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Send the current and new password." }, { status: 400 });
  }
  const row = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const current = typeof row.currentPassword === "string" ? row.currentPassword : "";
  const next = typeof row.nextPassword === "string" ? row.nextPassword : "";
  const problem = passwordProblem(next, session.username);
  if (problem) {
    return NextResponse.json({ ok: false, message: problem }, { status: 400 });
  }
  if (next === current) {
    return NextResponse.json({ ok: false, message: "Pick a password you have not used here." }, { status: 400 });
  }
  const user = await findAdmin(session.username);
  if (!user || !(await verifyPassword(current, user.password_hash))) {
    return NextResponse.json({ ok: false, message: "Current password is not correct." }, { status: 400 });
  }
  const passwordHash = await updateAdminPassword(session.username, next);
  // Old tokens carry the old password version and stop working; keep this browser signed in.
  await setAdminSession({ username: session.username, password_hash: passwordHash });
  return NextResponse.json({ ok: true });
}
