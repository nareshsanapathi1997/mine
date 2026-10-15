import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Practical notes on AI agents, automation and connected systems | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({ eyebrow: "Insights", title: "Practical notes on AI agents, automation and connected systems", footer: siteConfig.name });
}
