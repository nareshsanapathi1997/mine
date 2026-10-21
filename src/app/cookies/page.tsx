import { LegalDocument } from "@/components/layout/legal-document";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { legal } = await getCms();
  return createMetadata({
    title: legal.cookies.metaTitle,
    description: legal.cookies.metaDescription,
    path: "/cookies",
  });
}

export default async function CookiesPage() {
  const { legal } = await getCms();
  return (
    <LegalDocument
      eyebrow={legal.cookies.eyebrow}
      title={legal.cookies.title}
      description={legal.cookies.description}
      sections={legal.cookies.sections}
      effectiveDate={legal.effectiveDate}
    />
  );
}
