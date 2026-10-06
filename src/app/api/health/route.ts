import { NextResponse } from "next/server";
import { checkDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const database = await checkDatabase();
  const ok = database !== "down";
  return NextResponse.json(
    { ok, database },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
