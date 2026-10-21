import { cache } from "react";
import { getPool } from "@/lib/db/pool";
import { cmsDefaults } from "@/lib/cms/defaults";
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

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function merge<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base)) return (Array.isArray(overlay) ? overlay : base) as T;
  if (isObject(base) && isObject(overlay)) {
    const next = { ...base } as Record<string, unknown>;
    for (const [key, value] of Object.entries(overlay)) {
      next[key] = merge((base as Record<string, unknown>)[key], value);
    }
    return next as T;
  }
  return overlay as T;
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
    return merge(defaults, overlay);
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

