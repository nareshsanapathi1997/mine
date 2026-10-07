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
  location: "",
  hours: "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyntriq.com",
  description:
    "Kyntriq Solutions builds connected software, AI and automation systems around the way a business operates.",
  positioning: "AI · Software · Automation · Business Systems",
  tagline:
    "Business systems for organizations that have outgrown separate tools.",
  locale: "en_IN",
} as const;

export function copyrightYear(date = new Date()) {
  return date.getFullYear();
}
