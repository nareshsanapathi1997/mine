import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getCms } from "@/lib/cms";
import { saveCmsKey } from "@/lib/cms/save";
import type { CmsBundle } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

const KEYS: (keyof CmsBundle)[] = [
  "chrome",
  "home",
  "about",
  "contact",
  "solutionsHub",
  "industriesHub",
  "caseStudies",
  "projects",
  "aiAutomation",
  "insights",
  "blog",
  "notFound",
  "legal",
  "stats",
  "services",
  "solutionGroups",
  "industries",
  "details",
  "navigation",
];

export async function GET(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const key = new URL(request.url).searchParams.get("key") as keyof CmsBundle | null;
  const cms = await getCms();
  if (key && KEYS.includes(key)) {
    return NextResponse.json({ ok: true, key, payload: cms[key] });
  }
  return NextResponse.json({ ok: true, keys: KEYS });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Send key and payload as JSON." }, { status: 400 });
  }
  const row = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const key = typeof row.key === "string" ? (row.key as keyof CmsBundle) : null;
  if (!key || !KEYS.includes(key)) {
    return NextResponse.json({ ok: false, message: "Pick a valid content key." }, { status: 400 });
  }
  await saveCmsKey(key, row.payload as CmsBundle[typeof key]);
  return NextResponse.json({ ok: true });
}
