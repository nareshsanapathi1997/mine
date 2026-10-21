import { LegalDocument } from "@/components/layout/legal-document";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { legal } = await getCms();
  return createMetadata({
    title: legal.terms.metaTitle,
    description: legal.terms.metaDescription,
    path: "/terms",
  });
}

export default async function TermsPage() {
  const { legal } = await getCms();
  return (
    <LegalDocument
      eyebrow={legal.terms.eyebrow}
      title={legal.terms.title}
      description={legal.terms.description}
      sections={legal.terms.sections}
      effectiveDate={legal.effectiveDate}
    />
  );
}
