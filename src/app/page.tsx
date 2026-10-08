import type { Metadata } from "next";
import { AiAgents } from "@/components/sections/ai-agents";
import { CaseStudies } from "@/components/sections/case-studies";
import { ConnectedSystems } from "@/components/sections/connected-systems";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Integrations } from "@/components/sections/integrations";
import { Problems } from "@/components/sections/problems";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { TechStrip } from "@/components/sections/tech-strip";
import { Trust } from "@/components/sections/trust";
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
      <TechStrip />
      <Problems />
      <ConnectedSystems />
      <Services />
      <AiAgents />
      <Industries />
      <Integrations />
      <CaseStudies
        heading="Real business problems. Systems built around them."
        intro="These are solution patterns for real operating problems. They are not verified client engagements, and they do not include invented results."
      />
      <Process />
      <WhyUs />
      <Trust />
      <Faq />
      <CtaBand
        title="What part of your business do you want to change?"
        description="Tell us the workflow that is slowing your team down."
        primaryLabel="Talk to an Expert"
        showWhatsapp
        showForm
      />
    </>
  );
}
