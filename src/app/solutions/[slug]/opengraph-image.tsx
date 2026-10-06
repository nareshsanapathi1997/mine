import { siteConfig } from "@/content/site";
import { getSolution, solutionAliases } from "@/content/solution-details";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `${siteConfig.name} solution`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolution(solutionAliases[slug] ?? slug);
  if (!page) return socialImage();
  return socialImage({ eyebrow: "Solutions", title: page.title, footer: siteConfig.name });
}
