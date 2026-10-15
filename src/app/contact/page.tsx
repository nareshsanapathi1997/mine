import { ContactSection } from "@/components/sections/contact-section";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Call, WhatsApp or write to ${siteConfig.name} in Hyderabad about a website, app, software, WhatsApp automation or AI assistant.`,
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
      <ContactSection defaultNeed={need} />
    </>
  );
}
