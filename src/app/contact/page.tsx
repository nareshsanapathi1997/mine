import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Tell ${siteConfig.name} what you want to improve. Share your industry, a budget range and the workflow you want to change.`,
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.need;
  const need = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to an expert."
        description="Tell us what you are trying to improve. Share the industry, a budget range and the workflow you want to change."
      />
      <ContactSection showHeading={false} defaultNeed={need} />
    </>
  );
}
