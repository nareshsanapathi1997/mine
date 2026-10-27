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

export default function ContactPage() {
  return <ContactSection needFromQuery />;
}
