import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getCms } from "@/lib/cms";
import { saveCmsKey } from "@/lib/cms/save";
import type { SiteBrand } from "@/content/site";

export const dynamic = "force-dynamic";

const SLOTS: (keyof SiteBrand)[] = ["logoLight", "logoDark", "icon", "mark", "favicon"];
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};
const CONTENT_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

async function saveFile(folder: "brand" | "content", name: string, file: File) {
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  const filename = `${name}-${Date.now()}.${TYPES[file.type]}`;
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${folder}/${filename}`;
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const form = await request.formData();
  const slot = String(form.get("slot") ?? "");
  const kind = String(form.get("kind") ?? "");
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "Choose an image file." }, { status: 400 });
  }

  const isBrand = SLOTS.includes(slot as keyof SiteBrand);
  if (!isBrand && kind !== "content") {
    return NextResponse.json({ ok: false, message: "Choose a logo file and a slot." }, { status: 400 });
  }

  const limit = isBrand ? 2_000_000 : 5_000_000;
  if (file.size > limit) {
    return NextResponse.json({ ok: false, message: `Keep the image under ${isBrand ? "2" : "5"} MB.` }, { status: 400 });
  }
  if (!TYPES[file.type] || (!isBrand && !CONTENT_TYPES.has(file.type))) {
    return NextResponse.json({ ok: false, message: isBrand ? "Use PNG, JPG, WebP, SVG or ICO." : "Use PNG, JPG or WebP." }, { status: 400 });
  }

  if (!isBrand) {
    const url = await saveFile("content", "photo", file);
    return NextResponse.json({ ok: true, url });
  }

  const url = await saveFile("brand", slot, file);
  const cms = await getCms();
  const brand = { ...cms.site.brand, [slot]: url };
  const site = { ...cms.site, brand };
  const home = slot === "mark" ? { ...cms.home, hero: { ...cms.home.hero, markSrc: url } } : cms.home;
  await saveCmsKey("site", site);
  if (slot === "mark") await saveCmsKey("home", home);

  return NextResponse.json({ ok: true, url, brand });
}
