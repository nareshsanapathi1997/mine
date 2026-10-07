import { ContactSection } from "@/components/sections/contact-section";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Tell ${siteConfig.name} about the workflow you want to improve. AI, business software, web, mobile and cloud.`,
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
