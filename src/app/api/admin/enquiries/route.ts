import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getPool } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const pool = getPool();
  if (!pool) return NextResponse.json({ ok: true, rows: [] });
  const [rows] = await pool.query(
    `select id, name, company, email, phone, industry, need, budget_range, message, status, created_at
     from enquiries
     order by created_at desc
     limit 200`,
  );
  return NextResponse.json({ ok: true, rows: Array.isArray(rows) ? rows : [] });
}
