"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/*
 * Photos in /newImages/optimized are pre-encoded once from the client's
 * originals at WebP q90 in four widths (640, 960, 1280, full). This loader
 * points next/image's srcset at those files directly, so a photo is encoded
 * only once instead of being re-compressed by the image optimiser (which was
 * softening them). Anything else falls back to the normal optimiser.
 */
const STEPS = [640, 960, 1280];

/** Older CMS rows still store the previous brand filenames. Longest names first. */
const LEGACY_PHOTOS: [string, string][] = [
  ["kyntriq-small-businesses1", "retail-shop-software"],
  ["kyntriq-healthcare1", "clinic-waiting-area"],
  ["kyntriq-hero-automation", "visakhapatnam-software-automation"],
  ["kyntriq-about-founders", "varasena-founders"],
  ["kyntriq-about-story", "desk-before-software"],
  ["kyntriq-about-team", "varasena-team-office"],
  ["kyntriq-case-studies1", "software-project-review"],
  ["kyntriq-blog-header", "business-reading-desk"],
  ["kyntriq-insights-safety", "secure-software-office"],
  ["kyntriq-industries-overview", "business-industries-lobby"],
  ["kyntriq-professional-services", "professional-services-meeting"],
  ["kyntriq-whatsapp-automation", "whatsapp-business-automation"],
  ["kyntriq-business-automation", "business-workflow-automation"],
  ["kyntriq-business-software", "business-software-dashboard"],
  ["kyntriq-mobile-applications", "mobile-app-development"],
  ["kyntriq-web-development", "website-development-desk"],
  ["kyntriq-education-solution", "school-admission-whatsapp"],
  ["kyntriq-cloud-devops", "cloud-hosting-servers"],
  ["kyntriq-small-businesses", "small-business-invoicing"],
  ["kyntriq-manufacturing", "factory-order-tracking"],
  ["kyntriq-hospitality", "hotel-front-desk-booking"],
  ["kyntriq-healthcare", "clinic-appointment-desk"],
  ["kyntriq-ai-agents", "ai-assistant-support"],
  ["kyntriq-voice-ai", "voice-ai-phone-assistant"],
  ["kyntriq-contact", "customer-support-desk"],
];

function currentPhotoSrc(src: string) {
  for (const [from, to] of LEGACY_PHOTOS) {
    if (src.includes(from)) return src.replace(from, to);
  }
  return src;
}

function photoLoader({ src, width, quality }: ImageLoaderProps) {
  src = currentPhotoSrc(src);
  if (src.startsWith("/newImages/optimized/") && src.endsWith(".webp")) {
    const step = STEPS.find((w) => w >= width);
    const file = step ? src.replace(/\.webp$/, `-${step}.webp`) : src;
    return `${file}?w=${width}`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

export function Photo(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image loader={photoLoader} {...props} />;
}
