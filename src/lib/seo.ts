import type { Metadata } from "next";
import { geoMetaTags, keywordsForPath } from "@/content/seo";
import { getSite } from "@/lib/cms";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

function fitSearchText(value: string, limit: number) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const space = cut.lastIndexOf(" ");
  return (space > limit * 0.6 ? cut.slice(0, space) : cut).replace(/[|,&-]+$/, "").trimEnd();
}

function searchTitle(title: string) {
  const clean = title.replace(/\s+/g, " ").trim();
  const branded = clean.includes("VARASENA") ? clean : `${clean} | VARASENA`;
  return fitSearchText(branded.length <= TITLE_LIMIT ? branded : clean, TITLE_LIMIT);
}

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
  const fullTitle = searchTitle(title);
  const fullDescription = fitSearchText(description, DESCRIPTION_LIMIT);
  const canonical = path.startsWith("http") ? path : new URL(path, site.url).toString();
  const keywords = keywordsForPath(path, extraKeywords);

  return {
    title: { absolute: fullTitle },
    description: fullDescription,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description: fullDescription,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
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
