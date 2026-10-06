import { siteConfig } from "@/content/site";
import { getPost } from "@/lib/blog";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `${siteConfig.name} article`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return socialImage();
  return socialImage({ eyebrow: "Blog", title: post.title, footer: siteConfig.name });
}
