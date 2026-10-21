import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/admin/session";
import { authenticateAdmin } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Send username and password as JSON." }, { status: 400 });
  }
  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const username = typeof record.username === "string" ? record.username.trim() : "";
  const password = typeof record.password === "string" ? record.password : "";
  if (!username || !password) {
    return NextResponse.json({ ok: false, message: "Enter your username and password." }, { status: 400 });
  }

  try {
    const user = await authenticateAdmin(username, password);
    if (!user) {
      return NextResponse.json({ ok: false, message: "Those details did not match." }, { status: 401 });
    }
    await setAdminSession(user);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin] Login failed.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false, message: "Could not sign in. Check the database is running." }, { status: 500 });
  }
}
