import type { PhotoRef } from "@/lib/cms/types";

/**
 * Real client projects, added from Admin → Content → Projects. Unlike the
 * sample scenarios in case-studies.ts, these describe work that was delivered,
 * so only add results the client has agreed to share.
 */
export type Project = {
  slug: string;
  /** Unpublished projects stay in the admin only. */
  published: boolean;
  title: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  summary: string;
  photo: PhotoRef;
  gallery: PhotoRef[];
  challenge: string[];
  built: string[];
  results: string[];
  tech: string[];
  /** Live website or app link, shown as "Visit". Optional. */
  link: string;
};

export const PROJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const EMPTY_PHOTO: PhotoRef = { src: "", alt: "", width: 1280, height: 720 };

/** Fills fields missing from older stored rows so pages and the admin editor see the full shape. */
export function normalizeProject(value: Partial<Project> | null | undefined): Project {
  const row = value ?? {};
  const text = (input: unknown) => (typeof input === "string" ? input : "");
  const list = (input: unknown) => (Array.isArray(input) ? input.filter((item): item is string => typeof item === "string") : []);
  const photo = (input: unknown): PhotoRef => {
    if (!input || typeof input !== "object") return { ...EMPTY_PHOTO };
    const p = input as Partial<PhotoRef>;
    return { src: text(p.src), alt: text(p.alt), width: Number(p.width) || 1280, height: Number(p.height) || 720 };
  };
  return {
    slug: text(row.slug).trim().toLowerCase(),
    published: row.published === true,
    title: text(row.title),
    client: text(row.client),
    industry: text(row.industry),
    location: text(row.location),
    year: text(row.year),
    summary: text(row.summary),
    photo: photo(row.photo),
    gallery: Array.isArray(row.gallery) ? row.gallery.map(photo) : [],
    challenge: list(row.challenge),
    built: list(row.built),
    results: list(row.results),
    tech: list(row.tech),
    link: text(row.link),
  };
}

/**
 * Projects that can be shown on the site: published, with a valid unique slug,
 * a title and a photo. Anything incomplete stays hidden instead of rendering
 * a broken card.
 */
export function publishedProjects(items: Project[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.published || !PROJECT_SLUG.test(item.slug) || !item.title.trim() || !item.photo.src || seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export function findProject(items: Project[], slug: string) {
  return publishedProjects(items).find((item) => item.slug === slug);
}

/**
 * Adds a "Projects" link after "Examples" once a project is published, and
 * removes any Projects link while none are, so visitors never reach an empty page.
 */
export function withProjectsLink<T extends { label: string; href: string }>(links: T[], hasProjects: boolean, label: string): T[] {
  const without = links.filter((link) => link.href !== "/projects");
  if (!hasProjects) return without;
  if (without.length !== links.length) return links;
  const at = without.findIndex((link) => link.href === "/case-studies");
  const next = [...without];
  next.splice(at === -1 ? next.length : at + 1, 0, { label, href: "/projects" } as T);
  return next;
}
