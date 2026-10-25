/**
 * SITE CONFIG — the only place the company name and contact details are defined.
 *
 * Change `name` and it updates the wordmark, page titles, Open Graph and
 * Twitter cards, JSON-LD, footer copyright, and every other visible use.
 *
 * `url` is the public origin. Set NEXT_PUBLIC_SITE_URL when the production domain is confirmed.
 */
export type SiteSocialLink = { label: string; href: string };

export type SiteBrand = {
  logoLight: string;
  logoDark: string;
  icon: string;
  mark: string;
  favicon: string;
};

export type SiteConfig = {
  name: string;
  email: string;
  supportEmail: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  location: string;
  hours: string;
  url: string;
  description: string;
  positioning: string;
  nameMeaning: string;
  tagline: string;
  locale: string;
  social: SiteSocialLink[];
  brand: SiteBrand;
};

export const siteConfig: SiteConfig = {
  name: "VARASENA Technologies",
  /** General enquiries — shown in footer, contact, legal and JSON-LD. */
  email: "info@varasena.com",
  /** Support inbox — shown alongside info on contact surfaces. */
  supportEmail: "support@varasena.com",
  phoneDisplay: "+91 88863 62977",
  phoneHref: "tel:+918886362977",
  whatsappHref: "https://wa.me/918886362977",
  /**
   * City-level location until a street address and pincode are confirmed.
   * Do not invent a street or pincode — local SEO needs this to match Google Business Profile.
   */
  location: "Visakhapatnam (Vizag), Andhra Pradesh, India",
  hours: "Mon–Sat 9:30 AM – 6:30 PM",
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://varasena.com"),
  description:
    "Visakhapatnam (Vizag) software company building websites, apps, WhatsApp automation and AI assistants for schools, hotels, clinics and factories.",
  positioning: "Websites · Apps · Software · AI · Automation",
  /** Brand promise shown in the about story. */
  nameMeaning: "Ideas · Innovation · Impact",
  tagline:
    "Software, WhatsApp automation and AI assistants that take routine work off your team's plate.",
  locale: "en_IN",
  /**
   * Public profiles for footer + schema.org sameAs.
   * Only real live profiles — empty hrefs are ignored.
   * Set NEXT_PUBLIC_GOOGLE_BUSINESS_URL / NEXT_PUBLIC_YOUTUBE_URL when those exist.
   */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/varasena-technologies-315798445" },
    ...(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim()
      ? [{ label: "Google Business", href: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL.trim() }]
      : []),
    ...(process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim()
      ? [{ label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL.trim() }]
      : []),
    ...(process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim()
      ? [{ label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL.trim() }]
      : []),
    ...(process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim()
      ? [{ label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL.trim() }]
      : []),
  ],
  brand: {
    logoLight: "/varasena-brand-pack/varasena-logo-light.png",
    logoDark: "/varasena-brand-pack/varasena-logo-dark.png",
    icon: "/varasena-brand-pack/varasena-v-mark.png",
    mark: "/varasena-brand-pack/varasena-v-mark.png",
    favicon: "/icon.png",
  },
};

export function copyrightYear(date = new Date()) {
  return date.getFullYear();
}
