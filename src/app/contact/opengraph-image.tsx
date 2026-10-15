import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Tell us the workflow that is slowing your team down | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({ eyebrow: "Contact", title: "Tell us the workflow that is slowing your team down", footer: siteConfig.name });
}
