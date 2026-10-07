import type { Metadata } from "next";
import { CaseStudies } from "@/components/sections/case-studies";
import { ConnectedSystems } from "@/components/sections/connected-systems";
import { CtaBand } from "@/components/sections/cta-band";
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
      <ConnectedSystems />
      <Services />
      <Industries />
      <Process />
      <WhyUs />
      <CaseStudies />
      <CtaBand
        title="Tell us which operation you want to change."
        description="We build connected software, AI and automation around the way a business already works."
      />
    </>
  );
}
