import { siteConfig } from "@/content/site";
import { getDetail, listDetails } from "@/content/details";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `${siteConfig.name} solution`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

/** Render share images at build time instead of on every crawler request. */
export function generateStaticParams() {
  return listDetails("solution").map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("solution", slug);
  if (!page) return socialImage();
  return socialImage({ eyebrow: "Solutions", title: page.heading, footer: siteConfig.name });
}
