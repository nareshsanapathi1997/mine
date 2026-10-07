/**
 * SITE CONFIG — the only place the company name and contact details are defined.
 *
 * Change `name` and it updates the wordmark, page titles, Open Graph and
 * Twitter cards, JSON-LD, footer copyright, and every other visible use.
 *
 * `url` is the public origin. Set NEXT_PUBLIC_SITE_URL when the production domain is confirmed.
 */
export const siteConfig = {
  name: "Kyntriq Solutions",
  email: "nareshsanapathi1997@gmail.com",
  phoneDisplay: "+91 88863 62977",
  phoneHref: "tel:+918886362977",
  whatsappHref: "https://wa.me/918886362977",
  /** Placeholder until the public office address is confirmed. */
  location: "Hyderabad, India",
  hours: "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyntriq.com",
  description:
    "Kyntriq Solutions builds AI agents, custom software and business automation systems that connect people, processes and data.",
  positioning: "AI · Software · Automation · Business Systems",
  tagline:
    "Kyntriq Solutions builds connected software, AI and automation systems for organizations that have outgrown separate tools.",
  locale: "en_IN",
  /** Placeholder profiles. Replace with the real accounts before launch. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/kyntriq-solutions" },
    { label: "Instagram", href: "https://www.instagram.com/kyntriq.solutions" },
    { label: "X", href: "https://x.com/kyntriq" },
  ],
} as const;

export function copyrightYear(date = new Date()) {
  return date.getFullYear();
}
