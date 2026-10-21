import { LegalDocument } from "@/components/layout/legal-document";
import { termsSections } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms for using the ${siteConfig.name} website and engaging us for software, automation and related services — including scope, payments, support and liability.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms & Conditions"
      description={`Website use and service engagement terms for ${siteConfig.name}.`}
      sections={termsSections()}
    />
  );
}
