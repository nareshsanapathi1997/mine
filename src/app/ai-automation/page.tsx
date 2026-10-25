import Link from "next/link";
import { DetailCard } from "@/components/detail/detail-card";
import { HomeFaq } from "@/components/home/faq";
import { PromoReel } from "@/components/home/promo-reel";
import { HomeSampleFlow } from "@/components/home/sample-flow";
import { ReelSection } from "@/components/reel/reel-section";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { servicesJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  const { aiAutomation } = await getCms();
  return createMetadata({
    title: aiAutomation.metaTitle,
    description: aiAutomation.metaDescription,
    path: "/ai-automation",
  });
}

export default async function AIAutomationPage() {
  const { aiAutomation, details, site, services, chrome } = await getCms();
  const pages = ["ai-agents", "voice-ai", "whatsapp-automation", "business-automation"].flatMap((slug) => {
    const page = details.find((item) => item.kind === "solution" && item.slug === slug);
    return page ? [page] : [];
  });
  const sample = aiAutomation.sample;
  return (
    <>
      <JsonLd data={servicesJsonLd(site, services)} />
      <PageHeader
        eyebrow={aiAutomation.header.eyebrow}
        title={aiAutomation.header.title}
        description={aiAutomation.header.description}
        photo={aiAutomation.header.photo}
      >
        <Button asChild size="lg" arrow className="w-full sm:w-auto">
          <Link href="/contact?need=AI%20assistant">{chrome.header.ctaLabel}</Link>
        </Button>
      </PageHeader>

      <ReelSection
        id="ai-reel"
        eyebrow="Watch in 22 seconds"
        title="One WhatsApp enquiry, answered at 9 PM"
        intro="A sample of how an AI assistant replies instantly, saves the enquiry and tells your team, while your people stay in charge."
      >
        <PromoReel className="xh-reel" variant="automation" />
      </ReelSection>

      <section className="section h-section" aria-labelledby="can-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">Honest limits</p>
              <h2 id="can-heading" className="text-h2 mt-3 text-ink">What AI can and cannot do for you</h2>
            </div>
            <p className="text-body text-muted">{aiAutomation.canIntro}</p>
          </div>
          <div className="stack grid gap-3 md:grid-cols-2" data-reveal-stagger>
            <div className="card" data-reveal-child>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink"><span className="icon-chip icon-chip-sm"><UiIcon name="check" /></span>{aiAutomation.canTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
                {aiAutomation.can.map((item) => <li key={item} className="flex gap-2"><UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />{item}</li>)}
              </ul>
            </div>
            <div className="card" data-reveal-child>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink"><span className="icon-chip icon-chip-sm"><UiIcon name="minus" /></span>{aiAutomation.cannotTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
                {aiAutomation.cannot.map((item) => <li key={item} className="flex gap-2"><UiIcon name="minus" className="mt-0.5 size-3.5 shrink-0 text-muted" />{item}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section h-section h-band-soft" aria-labelledby="tools-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">{aiAutomation.tools.eyebrow}</p>
              <h2 id="tools-heading" className="text-h2 mt-3 text-ink">{aiAutomation.tools.title}</h2>
            </div>
            <p className="text-body text-muted">{aiAutomation.tools.intro}</p>
          </div>
          <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {pages.map((page) => <DetailCard key={page.slug} page={page} photo />)}
          </ul>
        </Container>
      </section>

      <HomeSampleFlow flows={[sample]} eyebrow={aiAutomation.sampleEyebrow} title={sample.title} intro={aiAutomation.sampleIntro} />
      <HomeFaq items={aiAutomation.faqs} title={aiAutomation.faqTitle} />
      <CtaBand title={aiAutomation.cta.title} description={aiAutomation.cta.description} primaryLabel={aiAutomation.cta.primaryLabel} showWhatsapp />
    </>
  );
}
