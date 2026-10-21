import { LegalDocument } from "@/components/layout/legal-document";
import { privacySections } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects and uses personal data from the contact form, analytics consent and related services.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy Policy"
      description={`How ${siteConfig.name} handles information submitted through this website.`}
      sections={privacySections()}
    />
  );
}
