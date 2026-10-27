import type { MetadataRoute } from "next";
import { getCms } from "@/lib/cms";
import { getPosts, getTags } from "@/lib/blog";
import { publishedProjects } from "@/content/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, details, projects } = await getCms();
  const lastModified = new Date();
  const staticPaths = [
    "/",
    "/solutions",
    "/industries",
    "/about",
    "/case-studies",
    "/contact",
    "/blog",
    "/ai-automation",
    "/insights",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const hubPriority: Record<string, number> = {
    "/": 1,
    "/solutions": 0.9,
    "/industries": 0.9,
    "/ai-automation": 0.85,
    "/contact": 0.85,
    "/about": 0.8,
    "/blog": 0.75,
  };

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: path === "/" || path === "/blog" ? "weekly" : "monthly",
    priority: hubPriority[path] ?? 0.65,
  }));

  const moneySolutions = new Set([
    "web-development",
    "business-software",
    "whatsapp-automation",
    "ai-agents",
    "mobile-applications",
  ]);
  const moneyIndustries = new Set(["schools", "hotels", "healthcare", "manufacturing", "education"]);

  const shownProjects = publishedProjects(projects.items);
  if (shownProjects.length) {
    pages.push({ url: new URL("/projects", site.url).toString(), lastModified, changeFrequency: "monthly", priority: 0.8 });
    for (const project of shownProjects) {
      pages.push({ url: new URL(`/projects/${project.slug}`, site.url).toString(), lastModified, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  try {
    for (const page of details.filter((item) => item.kind === "solution")) {
      pages.push({
        url: new URL(`/solutions/${page.slug}`, site.url).toString(),
        lastModified,
        changeFrequency: "weekly",
        priority: moneySolutions.has(page.slug) ? 0.9 : 0.75,
      });
    }

    for (const page of details.filter((item) => item.kind === "industry")) {
      pages.push({
        url: new URL(`/industries/${page.slug}`, site.url).toString(),
        lastModified,
        changeFrequency: "weekly",
        priority: moneyIndustries.has(page.slug) ? 0.9 : 0.75,
      });
    }

    for (const post of getPosts()) {
      pages.push({
        url: new URL(`/blog/${post.slug}`, site.url).toString(),
        lastModified: new Date(`${post.date}T00:00:00.000Z`),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const tag of getTags()) {
      pages.push({
        url: new URL(`/blog/tag/${tag}`, site.url).toString(),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // Keep core URLs if optional content sources fail at runtime.
  }

  return pages;
}
