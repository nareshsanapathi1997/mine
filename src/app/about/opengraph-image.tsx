import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Software, AI and automation built around how your organization works | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({ eyebrow: "About", title: "Software, AI and automation built around how your organization works", footer: siteConfig.name });
}
