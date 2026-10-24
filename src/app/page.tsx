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
import { getCms } from "@/lib/cms";
import { homeSearch } from "@/content/seo";
import { createMetadata } from "@/lib/seo";
import { faqJsonLd, servicesJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  return createMetadata({
    title: homeSearch.title,
    description: homeSearch.description,
    path: "/",
  });
}

export default async function HomePage() {
  const cms = await getCms();
  const { home, site, chrome, stats, services } = cms;

  return (
    <>
      <JsonLd data={servicesJsonLd(site, services)} />
      {home.faq.items.length ? <JsonLd data={faqJsonLd(home.faq.items)} /> : null}
      <HomeHero content={home.hero} positioning={site.positioning} />
      <StatsStrip stats={stats} />
      <HomeProblems content={home.problems} fixLabel={chrome.detail.fixLabel} />
      <HomeServices content={home.services} />
      <HomeIndustries
        items={home.industries.items}
        eyebrow={home.industries.eyebrow}
        title={home.industries.title}
        intro={home.industries.intro}
      />
      <HomeSampleFlow
        flows={home.sample.flows}
        eyebrow={home.sample.eyebrow}
        title={home.sample.title}
        intro={home.sample.intro}
        moreHref={home.sample.moreHref}
      />
      <HomeSteps content={home.steps} />
      <HomeWhy content={home.why} />
      <HomeFaq items={home.faq.items} title={home.faq.title} eyebrow={home.faq.eyebrow} intro={home.faq.intro} />
      <CtaBand
        title={home.cta.title}
        description={home.cta.description}
        primaryLabel={home.cta.primaryLabel}
        showWhatsapp
        showForm
      />
    </>
  );
}
