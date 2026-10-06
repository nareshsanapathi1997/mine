import type { MetadataRoute } from "next";
import { listIndustrySlugs } from "@/content/industry-details";
import { siteConfig } from "@/content/site";
import { listSolutionSlugs } from "@/content/solution-details";
import { getPosts, getTags } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPaths = [
    "/",
    "/solutions",
    "/industries",
    "/about",
    "/case-studies",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  for (const slug of listSolutionSlugs()) {
    pages.push({
      url: new URL(`/solutions/${slug}`, siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of listIndustrySlugs()) {
    pages.push({
      url: new URL(`/industries/${slug}`, siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of getPosts()) {
    pages.push({
      url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const tag of getTags()) {
    pages.push({
      url: new URL(`/blog/tag/${tag}`, siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return pages;
}
