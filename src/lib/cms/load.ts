import { cache } from "react";
import { getPool } from "@/lib/db/pool";
import { cmsDefaults } from "@/lib/cms/defaults";
import { mergeContent } from "@/lib/cms/merge";
import { currentAltFor } from "@/content/new-images";
import { normalizeProject } from "@/content/projects";
import type { CmsBundle } from "@/lib/cms/types";
import type { DetailKind } from "@/content/details";

const KEYS: (keyof CmsBundle)[] = [
  "site",
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

/**
 * Stored rows keep the alt text a photo had when they were saved. Built-in
 * photos were replaced under the same file names, so old default descriptions
 * are refreshed from photos/credits.json. Descriptions an admin wrote are kept.
 */
function withCurrentPhotoAlts<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withCurrentPhotoAlts) as T;
  if (!value || typeof value !== "object") return value;
  const next: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) next[key] = withCurrentPhotoAlts(item);
  if (typeof next.src === "string" && typeof next.alt === "string") {
    next.alt = currentAltFor(next.src, next.alt);
  }
  return next as T;
}

/**
 * Rows saved before a field existed miss it, and arrays from the database
 * replace the defaults whole. Fill those fields in so pages can rely on them
 * and the admin editor shows every field (for example a team member's photo).
 */
function normalizeBundle(bundle: CmsBundle): CmsBundle {
  const emptyPhoto = { src: "", alt: "", width: 800, height: 800 };
  const people = (bundle.about.team.people ?? []).map((person) => ({
    name: person?.name ?? "",
    role: person?.role ?? "",
    bio: person?.bio ?? "",
    photo: person?.photo && typeof person.photo === "object" ? { ...emptyPhoto, ...person.photo } : { ...emptyPhoto },
    linkedin: person?.linkedin ?? "",
  }));
  return {
    ...bundle,
    about: { ...bundle.about, team: { ...bundle.about.team, people } },
    projects: { ...bundle.projects, items: (bundle.projects.items ?? []).map(normalizeProject) },
  };
}

export const getCms = cache(async (): Promise<CmsBundle> => {
  const defaults = cmsDefaults();
  const pool = getPool();
  if (!pool) return defaults;

  try {
    const [rows] = await pool.query("select content_key, payload from cms_content");
    if (!Array.isArray(rows) || rows.length === 0) return defaults;

    const overlay: Partial<CmsBundle> = {};
    for (const row of rows as { content_key: string; payload: string }[]) {
      if (!KEYS.includes(row.content_key as keyof CmsBundle)) continue;
      try {
        overlay[row.content_key as keyof CmsBundle] = JSON.parse(row.payload);
      } catch {
        console.error(`[cms] Invalid JSON for ${row.content_key}.`);
      }
    }
    return normalizeBundle(withCurrentPhotoAlts(mergeContent(defaults, overlay)));
  } catch (error) {
    console.error("[cms] Could not load content.", error instanceof Error ? error.message : "Unknown database error");
    return defaults;
  }
});

export async function getSite() {
  return (await getCms()).site;
}

export async function getChrome() {
  return (await getCms()).chrome;
}

export async function getDetailPage(kind: DetailKind, slug: string) {
  const { details } = await getCms();
  return details.find((page) => page.kind === kind && page.slug === slug);
}

export async function listDetailPages(kind: DetailKind) {
  const { details } = await getCms();
  return details.filter((page) => page.kind === kind);
}

