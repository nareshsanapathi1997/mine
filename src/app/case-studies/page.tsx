import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { newImages } from "@/content/new-images";
import { caseStudies } from "@/content/case-studies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Examples",
  description: "Sample scenarios for a school, a hotel, a factory and a clinic: the problem, what we would build, and what changes. Illustrations, not client results.",
  path: "/case-studies",
});

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

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Examples"
        title="Sample projects: the problem, what we build, what changes."
        description="Four everyday situations we hear about often. These are samples to show how we think, not real client projects, and they make no claims about results."
        photo={newImages.caseStudies}
      />
      <section className="section h-section" aria-label="Sample projects">
        <Container>
          <ul className="grid gap-5" data-reveal-stagger>
            {caseStudies.map((study, index) => (
              <li key={study.slug} id={study.slug} className={index % 2 ? "card cs-card cs-flip" : "card cs-card"} data-reveal-child>
                <div className="cs-photo is-banner relative" style={{ "--ratio": `${study.photo.width} / ${study.photo.height}` } as React.CSSProperties}>
                  <Photo src={study.photo.src} alt={study.photo.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
                  <span className="sample-tag absolute left-3 top-3">Sample</span>
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">{study.industry}</p>
                  <h2 className="text-h3 mt-2 text-ink">{study.title}</h2>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <List title="Today" items={study.before} icon="minus" tone="text-muted" />
                    <List title="After" items={study.after} icon="check" tone="text-accent-ink" />
                  </div>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">What we would build</p>
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
      <CtaBand title="Does one of these sound like you?" description="Tell us what your version looks like. Every business is a little different." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
