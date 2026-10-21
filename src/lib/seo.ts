import type { Metadata } from "next";
import { getSite } from "@/lib/cms";

export async function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const site = await getSite();
  const fullTitle = `${title} · ${site.name}`;
  const canonical = path.startsWith("http") ? path : new URL(path, site.url).toString();

  return {
    title,
    description,
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
  };
}
