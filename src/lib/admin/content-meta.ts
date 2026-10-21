import type { UiIconName } from "@/components/icons";

export const CONTENT_KEYS = [
  "chrome",
  "navigation",
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
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const CONTENT_SECTIONS: {
  key: ContentKey;
  title: string;
  body: string;
  preview?: string;
}[] = [
  { key: "chrome", title: "Header & footer", body: "Button labels, menu titles and footer headings.", preview: "/" },
  { key: "navigation", title: "Menu links", body: "Header, footer and legal links.", preview: "/" },
  { key: "home", title: "Home", body: "Hero photo, problems, services, industries, steps and FAQ.", preview: "/" },
  { key: "about", title: "About", body: "Story, beliefs, team photo and promises.", preview: "/about" },
  { key: "contact", title: "Contact", body: "Page photo, form labels and next steps.", preview: "/contact" },
  { key: "solutionsHub", title: "Solutions listing", body: "Title, intro and banner for /solutions.", preview: "/solutions" },
  { key: "industriesHub", title: "Industries listing", body: "Title, intro and banner for /industries.", preview: "/industries" },
  { key: "caseStudies", title: "Examples", body: "Sample stories with photos, before and after.", preview: "/case-studies" },
  { key: "aiAutomation", title: "AI & Automation", body: "What we can and cannot do, plus a sample flow.", preview: "/ai-automation" },
  { key: "insights", title: "Safety and quality", body: "Stages, checklist and FAQs.", preview: "/insights" },
  { key: "blog", title: "Blog listing", body: "Header photo and empty-state copy.", preview: "/blog" },
  { key: "notFound", title: "404 page", body: "Message and links when a page is missing.", preview: "/missing-page" },
  { key: "legal", title: "Privacy, terms & cookies", body: "Legal page titles and sections.", preview: "/privacy" },
  { key: "stats", title: "Home stats", body: "Numbers under the home hero. Leave empty until figures are real." },
  { key: "services", title: "Solutions list", body: "Cards on the solutions page and footer.", preview: "/solutions" },
  { key: "solutionGroups", title: "Solution groups", body: "Groups in the Solutions mega menu." },
  { key: "industries", title: "Industries list", body: "Cards on the industries page and footer.", preview: "/industries" },
  { key: "details", title: "Solution & industry pages", body: "Each inner page: photo, problems, sample and FAQ." },
];

export const ICON_OPTIONS: UiIconName[] = [
  "globe",
  "smartphone",
  "blocks",
  "bot",
  "audio",
  "message",
  "workflow",
  "cloud",
  "graduation",
  "hotel",
  "factory",
  "building",
  "heart",
  "briefcase",
  "compass",
  "cpu",
  "layers",
  "shield",
  "handshake",
  "link",
  "database",
  "clipboard",
  "user",
  "users",
  "zap",
  "mail",
  "phone",
  "pin",
  "search",
  "status",
  "plus",
  "check",
];

export function isContentKey(value: string): value is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(value);
}

export function sectionMeta(key: string) {
  return CONTENT_SECTIONS.find((item) => item.key === key);
}

const FIELD_LABELS: Record<string, string> = {
  alt: "Image description",
  markSrc: "Hero mark",
  metaTitle: "Browser title",
  metaDescription: "Search description",
  src: "Image",
  href: "Link",
  ctaHref: "Button link",
  primaryHref: "Primary button link",
  secondaryHref: "Secondary button link",
  moreHref: "More link",
  industryHref: "Industry link",
  q: "Question",
  a: "Answer",
  show: "Show this block on the site",
  showInFooter: "Show in footer",
  forWho: "Who this is for",
  footerLabel: "Footer label",
  footerServiceSlugs: "Footer solution slugs",
};

export function humanize(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

export function itemTitle(value: unknown, index: number) {
  if (typeof value === "string") return value.trim() || `Item ${index + 1}`;
  if (!value || typeof value !== "object") return `Item ${index + 1}`;
  const row = value as Record<string, unknown>;
  for (const key of ["name", "title", "heading", "label", "q", "slug", "who"]) {
    if (typeof row[key] === "string" && row[key].trim()) return row[key] as string;
  }
  return `Item ${index + 1}`;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isPhoto(value: unknown): value is { src: string; alt: string; width?: number; height?: number } {
  if (!isObject(value) || typeof value.src !== "string" || typeof value.alt !== "string") return false;
  return Object.keys(value).every((key) => key === "src" || key === "alt" || key === "width" || key === "height");
}

export function isImagePathKey(key: string) {
  return key === "markSrc" || key === "src" || /photo|image|logo|mark/i.test(key);
}

export function looksLikeImagePath(value: string) {
  return /\.(png|jpe?g|webp|gif|svg|ico)(\?|#|$)/i.test(value) || value.startsWith("/uploads/") || value.startsWith("/newImages/") || value.startsWith("/varasena-brand-pack/");
}

const LONG_KEYS = /body|description|intro|paragraph|message|subtitle|note|details|summary|audience|fix|problem$/i;

export function isLongText(key: string, value: string) {
  return value.length > 80 || LONG_KEYS.test(key) || key === "a";
}

export function emptyFrom(sample: unknown): unknown {
  if (Array.isArray(sample)) return sample.length ? [emptyFrom(sample[0])] : [];
  if (isPhoto(sample)) return { src: "", alt: "", width: sample.width ?? 1280, height: sample.height ?? 720 };
  if (isObject(sample)) {
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(sample)) {
      if (value === undefined) continue;
      next[key] = emptyFrom(value);
    }
    return next;
  }
  if (typeof sample === "boolean") return false;
  if (typeof sample === "number") return 0;
  return "";
}

const PHOTO = { src: "", alt: "", width: 1280, height: 720 };

export function newItem(cmsKey: ContentKey, path: string[], current: unknown[]): unknown {
  if (cmsKey === "stats" && path.length === 0) {
    return { value: 0, suffix: "+", label: "" };
  }
  if (cmsKey === "details" && path.length === 0) {
    return {
      slug: "new-page",
      kind: "solution",
      name: "New page",
      icon: "globe",
      heading: "",
      intro: "",
      photo: { ...PHOTO },
      forWho: [""],
      problems: [{ problem: "", fix: "" }],
      builds: [{ title: "", body: "" }],
      sample: { title: "", steps: [{ title: "", body: "" }] },
      faqs: [{ q: "", a: "" }],
      cta: { title: "", description: "" },
      related: [""],
    };
  }
  if (cmsKey === "services" && path.length === 0) {
    return { slug: "new-solution", title: "New solution", description: "", details: "", icon: "globe", showInFooter: true };
  }
  if (cmsKey === "industries" && path.length === 0) {
    return { slug: "new-industry", title: "New industry", audience: "", summary: "", solutions: [""], icon: "building", showInFooter: true };
  }
  if (cmsKey === "solutionGroups" && path.length === 0) {
    return { id: "new-group", title: "New group", description: "", slugs: [""] };
  }
  if (cmsKey === "caseStudies" && path[0] === "items") {
    return {
      slug: "new-example",
      industry: "",
      industryHref: "",
      photo: { ...PHOTO },
      title: "New example",
      before: [""],
      built: [""],
      after: [""],
    };
  }
  if (current[0] !== undefined) return emptyFrom(current[0]);
  return "";
}

