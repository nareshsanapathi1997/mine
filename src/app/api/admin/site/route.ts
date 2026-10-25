import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getCms } from "@/lib/cms";
import { saveCmsKey } from "@/lib/cms/save";
import type { SiteBrand, SiteConfig, SiteSocialLink } from "@/content/site";

export const dynamic = "force-dynamic";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function socialList(value: unknown): SiteSocialLink[] | null {
  if (!Array.isArray(value)) return null;
  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const label = text(row.label);
      const href = text(row.href);
      if (!label || !href) return null;
      return { label, href };
    })
    .filter((item): item is SiteSocialLink => item !== null);
  return items;
}

function brandFrom(value: unknown, current: SiteBrand): SiteBrand {
  const row = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    logoLight: text(row.logoLight) || current.logoLight,
    logoDark: text(row.logoDark) || current.logoDark,
    icon: text(row.icon) || current.icon,
    mark: text(row.mark) || current.mark,
    favicon: text(row.favicon) || current.favicon,
  };
}

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { site } = await getCms();
  return NextResponse.json({ ok: true, site });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Send the site settings as JSON." }, { status: 400 });
  }
  const row = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const cms = await getCms();
  const social = socialList(row.social);
  if (social === null) {
    return NextResponse.json({ ok: false, message: "Social links must be a list of label and URL." }, { status: 400 });
  }

  const site: SiteConfig = {
    ...cms.site,
    name: text(row.name) || cms.site.name,
    email: text(row.email) || cms.site.email,
    supportEmail: text(row.supportEmail) || cms.site.supportEmail,
    phoneDisplay: text(row.phoneDisplay) || cms.site.phoneDisplay,
    phoneHref: text(row.phoneHref) || cms.site.phoneHref,
    altPhoneDisplay: text(row.altPhoneDisplay),
    altPhoneHref: text(row.altPhoneHref),
    whatsappHref: text(row.whatsappHref) || cms.site.whatsappHref,
    location: text(row.location),
    hours: text(row.hours),
    url: text(row.url) || cms.site.url,
    description: text(row.description) || cms.site.description,
    positioning: text(row.positioning) || cms.site.positioning,
    nameMeaning: text(row.nameMeaning) || cms.site.nameMeaning,
    tagline: text(row.tagline) || cms.site.tagline,
    locale: text(row.locale) || cms.site.locale,
    social,
    brand: brandFrom(row.brand, cms.site.brand),
  };

  const home = {
    ...cms.home,
    hero: { ...cms.home.hero, markSrc: site.brand.mark },
  };

  await saveCmsKey("site", site);
  await saveCmsKey("home", home);
  return NextResponse.json({ ok: true, site });
}
