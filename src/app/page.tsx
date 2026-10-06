import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Hero />
      <Services />
      <Industries />
      <Process />
      <WhyUs />
      <ContactSection />
    </>
  );
}
