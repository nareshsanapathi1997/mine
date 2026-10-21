import type { MetadataRoute } from "next";
import { getCms } from "@/lib/cms";
import { getPosts, getTags } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, details } = await getCms();
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

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  try {
    for (const page of details.filter((item) => item.kind === "solution")) {
      pages.push({
        url: new URL(`/solutions/${page.slug}`, site.url).toString(),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const page of details.filter((item) => item.kind === "industry")) {
      pages.push({
        url: new URL(`/industries/${page.slug}`, site.url).toString(),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const post of getPosts()) {
      pages.push({
        url: new URL(`/blog/${post.slug}`, site.url).toString(),
        lastModified: new Date(`${post.date}T00:00:00.000Z`),
        changeFrequency: "monthly",
        priority: 0.6,
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
