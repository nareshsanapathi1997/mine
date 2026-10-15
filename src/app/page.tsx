import type { Metadata } from "next";
import { HomeFaq } from "@/components/home/faq";
import { HomeHero } from "@/components/home/hero";
import { HomeIndustries } from "@/components/home/industries";
import { HomeProblems } from "@/components/home/problems";
import { HomeSampleFlow } from "@/components/home/sample-flow";
import { StatsStrip } from "@/components/home/stats-strip";
import { HomeServices } from "@/components/home/services";
import { HomeSteps, HomeWhy } from "@/components/home/why";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <HomeHero />
      {/* Appears automatically once figures are added in src/content/stats.ts */}
      <StatsStrip />
      <HomeProblems />
      <HomeServices />
      <HomeIndustries />
      <HomeSampleFlow />
      <HomeSteps />
      <HomeWhy />
      <HomeFaq />
      <CtaBand
        title="Tell us one job you want off your team's plate."
        description="A short call with no obligation. We listen, suggest a simple first step, and send you a written plan with cost and timeline."
        primaryLabel="Talk to us"
        showWhatsapp
        showForm
      />
    </>
  );
}
