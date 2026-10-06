/**
 * SITE CONFIG — the only place the company name and contact details are defined.
 *
 * Change `name` and it updates the wordmark, page titles, Open Graph and
 * Twitter cards, JSON-LD, footer copyright, and every other visible use.
 *
 * Contact details are placeholders. Replace them before launch.
 * `email` uses the placeholder domain kyntriq.com and is not a monitored
 * inbox until you connect it. `url` is a placeholder public origin; set
 * NEXT_PUBLIC_SITE_URL when the production domain is confirmed.
 */
export const siteConfig = {
  name: "Kyntriq",
  email: "hello@kyntriq.com",
  phoneDisplay: "+91 XXXXX XXXXX",
  /** Placeholder dial link. Not a live number. */
  phoneHref: "tel:+91XXXXXXXXXX",
  location: "City, India",
  hours: "[Business hours]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyntriq.com",
  description:
    "Kyntriq designs websites, business software, and AI agents for schools, hotels, manufacturers, and growing companies — connected to the records your team already trusts.",
  tagline:
    "Business systems for organizations that have outgrown a stack of separate tools.",
  locale: "en_IN",
} as const;

export function copyrightYear(date = new Date()) {
  return date.getFullYear();
}
