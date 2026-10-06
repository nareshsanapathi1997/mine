import { LegalDocument } from "@/components/layout/legal-document";
import { termsSections } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms for using the ${siteConfig.name} website. Enquiries are not a contract until work is agreed in writing.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms & Conditions"
      description={`The terms for using the ${siteConfig.name} website.`}
      sections={termsSections()}
    />
  );
}
