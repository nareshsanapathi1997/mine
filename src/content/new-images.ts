/**
 * Photos supplied by the client. Originals live in public/newImages; the site
 * uses optimised WebP copies in public/newImages/optimized (max 1600px wide,
 * under 250KB). Most include illustrative app screens drawn into the picture,
 * so they are shown at their own aspect ratio and not cropped.
 */
export type BannerImage = { src: string; alt: string; width: number; height: number };

const img = (file: string, width: number, height: number, alt: string): BannerImage => ({
  src: `/newImages/optimized/${file}.webp`,
  alt,
  width,
  height,
});

export const newImages = {
  home: img("kyntriq-hero-automation", 1600, 900, "A smiling professional holding a tablet, with connected app icons and a city skyline behind her"),
  about: img("kyntriq-about-team", 1600, 1067, "A small team gathered around laptops in an office, discussing their work"),
  caseStudies: img("kyntriq-case-studies1", 1536, 1024, "A man at his desk reviewing a project dashboard on two monitors and a laptop"),
  contact: img("kyntriq-contact", 1344, 768, "A support executive wearing a headset, smiling while she works on a laptop"),
  "ai-agents": img("kyntriq-ai-agents", 1024, 576, "Illustration of a friendly AI assistant robot next to a sample chat that books an appointment"),
  "voice-ai": img("kyntriq-voice-ai", 1600, 900, "A woman on a phone call next to a phone screen showing an AI voice assistant"),
  "whatsapp-automation": img("kyntriq-whatsapp-automation", 1600, 900, "A phone showing a sample WhatsApp Business chat, with labels for auto replies, notifications, follow-ups and CRM"),
  "business-automation": img("kyntriq-business-automation", 1600, 900, "A workflow diagram: trigger, condition, action and notification, linked to email, CRM, database and reports"),
  "web-development": img("kyntriq-web-development", 1600, 900, "A sample business website shown on a desktop, laptop, tablet and phone"),
  "mobile-applications": img("kyntriq-mobile-applications", 1600, 900, "Three phones showing sample screens of a school mobile app"),
  "business-software": img("kyntriq-business-software", 1600, 900, "A monitor on an office desk showing a sample sales and orders dashboard"),
  "cloud-devops": img("kyntriq-cloud-devops", 1600, 900, "A glowing cloud above rows of servers in a data centre"),
  education: img("kyntriq-education-solution", 1600, 900, "A teacher holding a tablet in a classroom, in front of a screen showing a sample student management dashboard"),
  hospitality: img("kyntriq-hospitality", 1600, 900, "A hotel receptionist welcoming a guest, with a screen showing a sample hotel management app"),
  manufacturing: img("kyntriq-manufacturing", 1600, 900, "An engineer in a safety helmet using a tablet beside robotic arms on a factory floor"),
  "corporate-smes": img("kyntriq-small-businesses", 1600, 900, "A shop owner working on a laptop in his store, with a sales dashboard on a screen"),
  "corporate-smes-alt": img("kyntriq-small-businesses1", 1600, 873, "A café owner serving a customer at the counter, with a laptop showing a simple sales dashboard"),
  healthcare: img("kyntriq-healthcare", 1600, 900, "A doctor working on a laptop next to a sample clinic dashboard"),
  "healthcare-alt": img("kyntriq-healthcare1", 1315, 903, "A doctor at her desk, with sample appointment and patient app screens beside her"),
  "professional-services": img("kyntriq-professional-services", 1600, 900, "Two professionals reviewing a project overview dashboard together"),
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
