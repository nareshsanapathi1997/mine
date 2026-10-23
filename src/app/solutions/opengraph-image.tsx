import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Software solutions — websites, apps, WhatsApp automation and AI | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: "Solutions",
    title: "Websites, apps, WhatsApp automation and AI for your business",
    footer: `${siteConfig.name} · Visakhapatnam`,
  });
}
