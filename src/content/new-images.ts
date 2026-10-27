/**
 * Photos for page banners and the home hero.
 * Real photos (sources and licences in photos/credits.json), built by
 * `npm run photos` into public/newImages/optimized at 1600px wide with
 * 640 / 960 / 1280 responsive variants.
 */
import credits from "../../photos/credits.json";
import legacyAlts from "@/content/legacy-photo-alts.json";
import { currentPhotoSrc } from "@/lib/photos";

export type BannerImage = { src: string; alt: string; width: number; height: number };

/** Alt text lives next to each photo's source and licence in photos/credits.json. */
const altFor = (file: string) => credits.find((entry) => entry.name === file)?.alt ?? "";

/**
 * Current alt text for a built-in photo URL (legacy names included), or null
 * for any other image.
 */
export function builtInPhotoAlt(src: string) {
  const match = currentPhotoSrc(src).match(/^\/newImages\/optimized\/([a-z0-9-]+)\.webp/);
  return (match && altFor(match[1])) || null;
}

/** Descriptions the AI-generated photos had (from git history), never written by an admin. */
const OLD_DEFAULT_ALTS = new Set<string>(legacyAlts);

/**
 * Alt text to show for a stored {src, alt}. Built-in photos were replaced
 * under the same file names, so an empty or old default description is swapped
 * for the current one from photos/credits.json. Anything an admin wrote is kept.
 */
export function currentAltFor(src: string, storedAlt: string) {
  const fresh = builtInPhotoAlt(src);
  if (!fresh) return storedAlt;
  return !storedAlt.trim() || OLD_DEFAULT_ALTS.has(storedAlt.trim()) ? fresh : storedAlt;
}

const img = (file: string, width: number, height: number): BannerImage => ({
  src: `/newImages/optimized/${file}.webp`,
  alt: altFor(file),
  width,
  height,
});

export const newImages = {
  home: img("visakhapatnam-software-automation", 1280, 720),
  about: img("varasena-team-office", 1280, 720),
  aboutStory: img("desk-before-software", 1280, 720),
  aboutTeam: img("varasena-founders", 1280, 720),
  caseStudies: img("software-project-review", 1280, 720),
  blog: img("business-reading-desk", 1280, 720),
  insights: img("secure-software-office", 1280, 720),
  industries: img("business-industries-lobby", 1280, 720),
  contact: img("customer-support-desk", 1280, 720),
  "ai-agents": img("ai-assistant-support", 1280, 720),
  "voice-ai": img("voice-ai-phone-assistant", 1280, 720),
  "whatsapp-automation": img("whatsapp-business-automation", 1280, 720),
  "business-automation": img("business-workflow-automation", 1280, 720),
  "web-development": img("website-development-desk", 1280, 720),
  "mobile-applications": img("mobile-app-development", 1280, 720),
  "business-software": img("business-software-dashboard", 1280, 720),
  "cloud-devops": img("cloud-hosting-servers", 1280, 720),
  education: img("school-admission-whatsapp", 1280, 720),
  hospitality: img("hotel-front-desk-booking", 1280, 720),
  manufacturing: img("factory-order-tracking", 1280, 720),
  "corporate-smes": img("small-business-invoicing", 1280, 720),
  "corporate-smes-alt": img("retail-shop-software", 1280, 720),
  healthcare: img("clinic-appointment-desk", 1280, 720),
  "healthcare-alt": img("clinic-waiting-area", 1280, 720),
  "professional-services": img("professional-services-meeting", 1280, 720),
} satisfies Record<string, BannerImage>;

/** Industry sub-pages use their parent industry's image. */
const industryAlias: Record<string, keyof typeof newImages> = {
  schools: "education",
  colleges: "education",
  coaching: "education",
  hotels: "hospitality",
};

export function bannerFor(slug: string): BannerImage | undefined {
  const key = (industryAlias[slug] ?? slug) as keyof typeof newImages;
  return newImages[key];
}
