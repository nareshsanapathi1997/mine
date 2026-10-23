import { siteConfig } from "@/content/site";
import { socialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = `Industry software for schools, hotels, factories and clinics | ${siteConfig.name}`;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: "Industries",
    title: "Software for schools, hotels, factories, clinics and SMEs",
    footer: `${siteConfig.name} · Visakhapatnam`,
  });
}
