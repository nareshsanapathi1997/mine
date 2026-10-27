/**
 * Shared by the client <Photo> loader and server code. Keep it free of Node
 * imports so it can ship to the browser.
 */

/**
 * Bump when photos in /newImages/optimized are replaced under the same file
 * names. Files are cached for a week, so a new query string makes returning
 * visitors fetch the new versions at once.
 */
export const PHOTO_VERSION = "2";

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

export function currentPhotoSrc(src: string) {
  for (const [from, to] of LEGACY_PHOTOS) {
    if (src.includes(from)) return src.replace(from, to);
  }
  return src;
}
