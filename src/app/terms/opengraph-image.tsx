import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Terms & Conditions | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: "Legal",
    title: "Terms & Conditions",
    footer: siteConfig.name,
  });
}
