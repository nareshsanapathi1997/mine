import { siteConfig } from "@/content/site";
import { getDetail } from "@/content/details";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `${siteConfig.name} industry`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("industry", slug);
  if (!page) return socialImage();
  return socialImage({ eyebrow: "Industries", title: page.heading, footer: siteConfig.name });
}
