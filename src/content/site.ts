/**
 * SITE CONFIG — the only place the company name and contact details are defined.
 *
 * Change `name` and it updates the wordmark, page titles, Open Graph and
 * Twitter cards, JSON-LD, footer copyright, and every other visible use.
 *
 * `url` is the public origin. Set NEXT_PUBLIC_SITE_URL when the production domain is confirmed.
 */
export const siteConfig = {
  name: "VARASENA Technologies",
  /** General enquiries — shown in footer, contact, legal and JSON-LD. */
  email: "info@varasena.com",
  /** Support inbox — shown alongside info on contact surfaces. */
  supportEmail: "support@varasena.com",
  phoneDisplay: "+91 88863 62977",
  phoneHref: "tel:+918886362977",
  whatsappHref: "https://wa.me/918886362977",
  /** Placeholder until the public office address is confirmed. */
  location: "Visakhapatnam, India",
  hours: "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://varasena.com",
  description:
    "VARASENA Technologies builds websites, apps, business software, WhatsApp automation and AI assistants for schools, hotels, factories, clinics and small businesses in India.",
  positioning: "Websites · Apps · Software · AI · Automation",
  /** Brand promise shown in the about story. */
  nameMeaning: "Ideas · Innovation · Impact",
  tagline:
    "Software, WhatsApp automation and AI assistants that take routine work off your team's plate.",
  locale: "en_IN",
  /** Placeholder profiles. Replace with the real accounts before launch. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/varasena-technologies-315798445" },
    { label: "Instagram", href: "https://www.instagram.com/varasena.technologies" },
    { label: "X", href: "https://x.com/varasena" },
  ],
} as const;

export function copyrightYear(date = new Date()) {
  return date.getFullYear();
}
