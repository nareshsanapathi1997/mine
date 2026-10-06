import { LegalDocument } from "@/components/layout/legal-document";
import { cookieSections } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: `Cookie notice for the ${siteConfig.name} website. This template does not set advertising cookies.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalDocument
      eyebrow="Cookies"
      title="Cookie Policy"
      description="What this website stores in the browser, and what it does not."
      sections={cookieSections()}
    />
  );
}
