export const blogCategories = [
  { id: "ai-automation", label: "AI & Automation", tags: ["ai", "automation"] },
  { id: "business-systems", label: "Business Systems", tags: ["sme", "whatsapp", "systems"] },
  { id: "web-development", label: "Web Development", tags: ["web", "web-development"] },
  { id: "technology", label: "Technology", tags: ["technology"] },
  { id: "industry-insights", label: "Industry Insights", tags: ["education", "industry"] },
] as const;

export function postMatchesCategory(tags: string[], categoryId: string) {
  if (categoryId === "all") return true;
  const category = blogCategories.find((item) => item.id === categoryId);
  if (!category) return true;
  return category.tags.some((tag) => tags.includes(tag));
}

export function formatPostDate(isoDate: string) {
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
}

export function tagLabel(tag: string) {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
