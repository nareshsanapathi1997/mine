import { LegalDocument } from "@/components/layout/legal-document";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { legal } = await getCms();
  return createMetadata({
    title: legal.privacy.metaTitle,
    description: legal.privacy.metaDescription,
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const { legal } = await getCms();
  return (
    <LegalDocument
      eyebrow={legal.privacy.eyebrow}
      title={legal.privacy.title}
      description={legal.privacy.description}
      sections={legal.privacy.sections}
      effectiveDate={legal.effectiveDate}
    />
  );
}
