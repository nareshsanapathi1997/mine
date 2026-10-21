import { ContactSection } from "@/components/sections/contact-section";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { contact } = await getCms();
  return createMetadata({
    title: contact.metaTitle,
    description: contact.metaDescription,
    path: "/contact",
  });
}

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
