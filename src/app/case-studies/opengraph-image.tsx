import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Sample software projects and automation examples | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: "Examples",
    title: "Sample projects: problem, build and what changes",
    footer: `${siteConfig.name} · Visakhapatnam`,
  });
}
