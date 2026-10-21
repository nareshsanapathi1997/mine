import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { findAdmin, updateAdminPassword } from "@/lib/admin/users";
import { verifyPassword } from "@/lib/admin/password";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Send the current and new password." }, { status: 400 });
  }
  const row = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const current = typeof row.currentPassword === "string" ? row.currentPassword : "";
  const next = typeof row.nextPassword === "string" ? row.nextPassword : "";
  if (next.length < 6) {
    return NextResponse.json({ ok: false, message: "Use at least 6 characters for the new password." }, { status: 400 });
  }
  const user = await findAdmin(session.username);
  if (!user || !(await verifyPassword(current, user.password_hash))) {
    return NextResponse.json({ ok: false, message: "Current password is not correct." }, { status: 400 });
  }
  await updateAdminPassword(session.username, next);
  return NextResponse.json({ ok: true });
}
