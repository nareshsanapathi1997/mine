/**
 * Photos for page banners and the home hero.
 * The site uses optimised WebP copies in public/newImages/optimized (max 1600px
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
  home: img("visakhapatnam-software-automation", 1280, 720, "A professional in a glass office overlooking a city skyline at dusk, holding a tablet"),
  about: img("varasena-team-office", 1280, 720, "A small team collaborating around laptops in a bright modern office"),
  aboutStory: img("desk-before-software", 1280, 720, "A quiet desk with a notebook, laptop and phone, suggesting the manual work software replaces"),
  aboutTeam: img("varasena-founders", 1280, 720, "Two founders standing together in a bright modern office"),
  caseStudies: img("software-project-review", 1280, 720, "A professional reviewing project results on a large monitor"),
  blog: img("business-reading-desk", 1280, 720, "A desk with a notebook, glasses and tablet ready for reading"),
  insights: img("secure-software-office", 1280, 720, "Hands typing on a laptop in a secure, softly lit office"),
  industries: img("business-industries-lobby", 1280, 720, "A modern business lobby with professionals walking through"),
  contact: img("customer-support-desk", 1280, 720, "A support executive wearing a headset, smiling while working on a laptop"),
  "ai-agents": img("ai-assistant-support", 1280, 720, "A support specialist at a desk with a laptop and phone showing a customer chat"),
  "voice-ai": img("voice-ai-phone-assistant", 1280, 720, "A professional on a headset call in a modern office"),
  "whatsapp-automation": img("whatsapp-business-automation", 1280, 720, "A smartphone showing a business chat beside a laptop on a desk"),
  "business-automation": img("business-workflow-automation", 1280, 720, "An operations manager reviewing a workflow board on a laptop"),
  "web-development": img("website-development-desk", 1280, 720, "A desk with desktop, laptop and phone showing the same website layout"),
  "mobile-applications": img("mobile-app-development", 1280, 720, "Two smartphones on a desk showing mobile app screens"),
  "business-software": img("business-software-dashboard", 1280, 720, "A business owner reviewing a sales dashboard on a large monitor"),
  "cloud-devops": img("cloud-hosting-servers", 1280, 720, "A modern server room corridor with soft blue lighting"),
  education: img("school-admission-whatsapp", 1280, 720, "A school counsellor at a desk with a laptop and admission forms"),
  hospitality: img("hotel-front-desk-booking", 1280, 720, "A hotel receptionist welcoming a guest at the front desk"),
  manufacturing: img("factory-order-tracking", 1280, 720, "An engineer in a safety helmet using a tablet on a factory floor"),
  "corporate-smes": img("small-business-invoicing", 1280, 720, "A shop owner using a laptop at the counter while serving customers"),
  "corporate-smes-alt": img("retail-shop-software", 1280, 720, "A retail counter with a phone stand and shelves in the background"),
  healthcare: img("clinic-appointment-desk", 1280, 720, "A clinician at a clinic reception desk with a laptop"),
  "healthcare-alt": img("clinic-waiting-area", 1280, 720, "A calm clinic waiting area with soft morning light"),
  "professional-services": img("professional-services-meeting", 1280, 720, "Two professionals reviewing documents and a laptop in a meeting room"),
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
