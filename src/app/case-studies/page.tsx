import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

function List({ title, items, icon, tone }: { title: string; items: string[]; icon: "minus" | "check"; tone: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <UiIcon name={icon} className={`mt-0.5 size-3.5 shrink-0 ${tone}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateMetadata() {
  const { caseStudies } = await getCms();
  return createMetadata({
    title: caseStudies.metaTitle,
    description: caseStudies.metaDescription,
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const { caseStudies } = await getCms();
  return (
    <>
      <PageHeader
        eyebrow={caseStudies.header.eyebrow}
        title={caseStudies.header.title}
        description={caseStudies.header.description}
        photo={caseStudies.header.photo}
      />
      <section className="section h-section" aria-label="Sample projects">
        <Container>
          <ul className="grid gap-5" data-reveal-stagger suppressHydrationWarning>
            {caseStudies.items.map((study, index) => (
              <li key={study.slug} id={study.slug} className={index % 2 ? "card cs-card cs-flip" : "card cs-card"} data-reveal-child>
                <div className="cs-photo is-banner relative" style={{ "--ratio": `${study.photo.width} / ${study.photo.height}` } as React.CSSProperties}>
                  <Photo src={study.photo.src} alt={study.photo.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
                  <span className="sample-tag absolute left-3 top-3">{caseStudies.sampleTag}</span>
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">{study.industry}</p>
                  <h2 className="text-h3 mt-2 text-ink">{study.title}</h2>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <List title={caseStudies.todayLabel} items={study.before} icon="minus" tone="text-muted" />
                    <List title={caseStudies.afterLabel} items={study.after} icon="check" tone="text-accent-ink" />
                  </div>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{caseStudies.builtLabel}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {study.built.map((item) => <li key={item} className="chip">{item}</li>)}
                    </ul>
                  </div>
                  <Link href={study.industryHref as "/"} className="text-link mt-5">
                    More for {study.industry.toLowerCase()}s <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand title={caseStudies.cta.title} description={caseStudies.cta.description} primaryLabel={caseStudies.cta.primaryLabel} showWhatsapp />
    </>
  );
}
