import type { Metadata } from "next";
import { geoMetaTags, keywordsForPath } from "@/content/seo";
import { getSite } from "@/lib/cms";

export async function createMetadata({
  title,
  description,
  path,
  keywords: extraKeywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}): Promise<Metadata> {
  const site = await getSite();
  const isHome = path === "/" || path === "";
  const fullTitle = isHome
    ? `${site.name} | ${title}`
    : `${title} · ${site.name}`;
  const canonical = path.startsWith("http") ? path : new URL(path, site.url).toString();
  const keywords = keywordsForPath(path, extraKeywords);

  return {
    title: isHome ? { absolute: fullTitle } : title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      ...geoMetaTags(),
    },
  };
}
