import Image from "next/image";
import Link from "next/link";
import { Icon, UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import type { IconName } from "@/content/types";

const studyPhotos: Record<string, { src: string; alt: string }> = {
  "education-admissions": {
    src: "/images/education-admissions.webp",
    alt: "An empty college admissions office with a laptop and folders on an oak desk",
  },
  "hotel-bookings": {
    src: "/images/hospitality-booking.webp",
    alt: "Hotel staff at a lit reception desk in a modern lobby",
  },
  "factory-orders": {
    src: "/images/manufacturing-orders.webp",
    alt: "A worker tending thread spools on a textile factory line",
  },
};

const records = ["Application #10482 · Documents verified", "Room 214 · Confirmation queued", "Order #8821 · In production"];

const industryIcons: Record<string, IconName> = {
  Education: "graduation",
  Hospitality: "hotel",
  Manufacturing: "factory",
};

function techIcon(item: string): UiIconName {
  const key = item.toLowerCase();
  if (key.includes("whatsapp")) return "message";
  if (key.includes("ai")) return "bot";
  if (key.includes("web")) return "globe";
  if (key.includes("crm") || key.includes("software")) return "blocks";
  if (key.includes("dashboard")) return "layers";
  if (key.includes("workflow") || key.includes("automation")) return "workflow";
  return "link";
}

function PatternWindow({ title, record, steps }: { title: string; record: string; steps: string[] }) {
  return (
    <div className="product-window h-fit min-w-0 self-start">
      <div className="product-window-bar">
        <span className="live-pip" aria-hidden="true" />
        {title}
      </div>
      <div className="product-window-body">
        <p className="text-sm font-medium text-ink">{record}</p>
        <ol className="m-0 mt-4 list-none space-y-2 p-0">
          {steps.map((step, index) => (
            <li key={step} className="flex min-w-0 items-center gap-2.5 text-sm text-ink">
              <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function PatternLink({ study, detailed }: { study: CaseStudy; detailed: boolean }) {
  return (
    <Link href={detailed ? "/contact" : `/case-studies#${study.slug}`} className="text-link mt-4">
      {detailed ? "Talk to an Expert" : "View pattern"}
      <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
      <span className="sr-only"> {study.title}</span>
    </Link>
  );
}

function Detail({ study, detailed }: { study: CaseStudy; detailed: boolean }) {
  if (!detailed) return null;
  return (
    <>
      <p className="mt-3 text-sm leading-relaxed text-muted">{study.existingWorkflow}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{study.solution}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
        {study.technology.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <UiIcon name={techIcon(item)} className="size-3.5 text-accent-ink" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export function CaseStudies({
  heading = "Real business problems. Systems built around them.",
  intro = "These are solution patterns for real operating problems. They are not verified client engagements, and they do not include invented results.",
  detailed = false,
}: {
  heading?: string;
  intro?: string;
  detailed?: boolean;
}) {
  return (
    <section id="case-studies" className="section scroll-mt-28" aria-labelledby="cases-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Solution patterns</p>
            <h2 id="cases-heading" className="text-h2 mt-3 text-ink">
              {heading}
            </h2>
          </div>
          <p className="text-body text-muted">{intro}</p>
        </div>
        <div className="mt-8 grid gap-4">
          {caseStudies.map((study, index) => {
            const photo = studyPhotos[study.slug];
            const flipped = index % 2 === 1;
            return (
            <article key={study.slug} id={study.slug} className="scroll-mt-28 grid items-start gap-6 rounded-3xl border border-line p-4 sm:p-6 lg:grid-cols-12 lg:gap-8">
              <div className={flipped ? "flex min-w-0 flex-col lg:order-2 lg:col-span-7" : "flex min-w-0 flex-col lg:col-span-7"}>
                {photo ? (
                  <figure className="photo-frame photo-story mb-4">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </figure>
                ) : null}
                <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
                  <span className="icon-chip icon-chip-sm">
                    <Icon name={industryIcons[study.industry] ?? "layers"} />
                  </span>
                  {study.industry} · Solution pattern
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{study.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{study.problem}</p>
                <Detail study={study} detailed={detailed} />
                <PatternLink study={study} detailed={detailed} />
              </div>
              <div className={flipped ? "min-w-0 lg:order-1 lg:col-span-5" : "min-w-0 lg:col-span-5"}>
                <PatternWindow
                  title={study.title}
                  record={records[index] ?? "Example record"}
                  steps={study.architecture}
                />
              </div>
            </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
