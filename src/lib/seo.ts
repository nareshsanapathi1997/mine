import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} · ${siteConfig.name}`;
  const canonical = path.startsWith("http") ? path : new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
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
  };
}
