import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getCms } from "@/lib/cms";
import { saveCmsKey } from "@/lib/cms/save";
import { saveUpload, sniffImage } from "@/lib/uploads";
import type { SiteBrand } from "@/content/site";

export const dynamic = "force-dynamic";

const SLOTS: (keyof SiteBrand)[] = ["logoLight", "logoDark", "icon", "mark", "favicon"];
const BRAND_MAX = 2_000_000;
const CONTENT_MAX = 5_000_000;

function fail(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > CONTENT_MAX + 64_000) return fail("Keep the image under 5 MB.", 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Send the image as a form upload.");
  }
  const slot = String(form.get("slot") ?? "");
  const kind = String(form.get("kind") ?? "");
  const file = form.get("file");
  if (!(file instanceof File)) return fail("Choose an image file.");

  const isBrand = SLOTS.includes(slot as keyof SiteBrand);
  if (!isBrand && kind !== "content") return fail("Choose a logo file and a slot.");

  const limit = isBrand ? BRAND_MAX : CONTENT_MAX;
  if (file.size > limit) return fail(`Keep the image under ${isBrand ? "2" : "5"} MB.`);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniffImage(bytes);
  if (!type || (!isBrand && type.ext === "ico")) {
    return fail(isBrand ? "Use a PNG, JPG, WebP or ICO image." : "Use a PNG, JPG or WebP image.");
  }

  if (!isBrand) {
    const url = await saveUpload("content", "photo", bytes, type);
    return NextResponse.json({ ok: true, url });
  }

  const url = await saveUpload("brand", slot, bytes, type);
  const cms = await getCms();
  const brand = { ...cms.site.brand, [slot]: url };
  const site = { ...cms.site, brand };
  await saveCmsKey("site", site);
  if (slot === "mark") await saveCmsKey("home", { ...cms.home, hero: { ...cms.home.hero, markSrc: url } });

  return NextResponse.json({ ok: true, url, brand });
}
