import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `AI agents that look up the record and take the next step | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({ eyebrow: "AI & Automation", title: "AI agents that look up the record and take the next step", footer: siteConfig.name });
}
