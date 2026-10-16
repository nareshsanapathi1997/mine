/**
 * Photos for page banners and the home hero. Originals live in public/newImages;
 * the site uses optimised WebP copies in public/newImages/optimized (max 1600px
 * wide) with 640 / 960 / 1280 responsive variants.
 */
export type BannerImage = { src: string; alt: string; width: number; height: number };

const img = (file: string, width: number, height: number, alt: string): BannerImage => ({
  src: `/newImages/optimized/${file}.webp`,
  alt,
  width,
  height,
});

export const newImages = {
  home: img("kyntriq-hero-automation", 1280, 720, "A professional in a glass office overlooking a city skyline at dusk, holding a tablet"),
  about: img("kyntriq-about-team", 1280, 720, "A small team collaborating around laptops in a bright modern office"),
  caseStudies: img("kyntriq-case-studies1", 1280, 720, "A professional reviewing project results on a large monitor"),
  contact: img("kyntriq-contact", 1280, 720, "A support executive wearing a headset, smiling while working on a laptop"),
  "ai-agents": img("kyntriq-ai-agents", 1280, 720, "A support specialist at a desk with a laptop and phone showing a customer chat"),
  "voice-ai": img("kyntriq-voice-ai", 1280, 720, "A professional on a headset call in a modern office"),
  "whatsapp-automation": img("kyntriq-whatsapp-automation", 1280, 720, "A smartphone showing a business chat beside a laptop on a desk"),
  "business-automation": img("kyntriq-business-automation", 1280, 720, "An operations manager reviewing a workflow board on a laptop"),
  "web-development": img("kyntriq-web-development", 1280, 720, "A desk with desktop, laptop and phone showing the same website layout"),
  "mobile-applications": img("kyntriq-mobile-applications", 1280, 720, "Two smartphones on a desk showing mobile app screens"),
  "business-software": img("kyntriq-business-software", 1280, 720, "A business owner reviewing a sales dashboard on a large monitor"),
  "cloud-devops": img("kyntriq-cloud-devops", 1280, 720, "A modern server room corridor with soft blue lighting"),
  education: img("kyntriq-education-solution", 1280, 720, "A school counsellor at a desk with a laptop and admission forms"),
  hospitality: img("kyntriq-hospitality", 1280, 720, "A hotel receptionist welcoming a guest at the front desk"),
  manufacturing: img("kyntriq-manufacturing", 1280, 720, "An engineer in a safety helmet using a tablet on a factory floor"),
  "corporate-smes": img("kyntriq-small-businesses", 1280, 720, "A shop owner using a laptop at the counter while serving customers"),
  "corporate-smes-alt": img("kyntriq-small-businesses1", 1280, 720, "A small business owner managing daily work from a laptop at the counter"),
  healthcare: img("kyntriq-healthcare", 1280, 720, "A clinician at a clinic reception desk with a laptop"),
  "healthcare-alt": img("kyntriq-healthcare1", 1280, 720, "A doctor working at a calm clinic reception desk"),
  "professional-services": img("kyntriq-professional-services", 1280, 720, "Two professionals reviewing documents and a laptop in a meeting room"),
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
