import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Practical articles on AI, WhatsApp automation and business software | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: "Blog",
    title: "Practical articles for Indian business owners",
    footer: `${siteConfig.name} · Visakhapatnam`,
  });
}
