import Link from "next/link";
import { Container } from "@/components/layout/container";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

const records = ["Application #10482 · Documents verified", "Room 214 · Confirmation queued", "Order #8821 · In production"];

function PatternWindow({ title, record, steps }: { title: string; record: string; steps: string[] }) {
  return (
    <div className="product-window min-w-0">
      <div className="product-window-bar">
        <span className="live-pip" aria-hidden="true" />
        {title}
      </div>
      <div className="product-window-body">
        <p className="text-sm font-medium text-ink">{record}</p>
        <ol className="m-0 mt-4 list-none space-y-2 p-0">
          {steps.map((step, index) => (
            <li key={step} className="flex min-w-0 items-center gap-3 text-sm text-ink">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-[11px] text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
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
    <Link href={detailed ? "/contact" : `/case-studies#${study.slug}`} className="text-link mt-auto pt-4">
      {detailed ? "Talk to an Expert" : "View pattern"}
      <span className="text-link-arrow" aria-hidden="true">→</span>
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
          <li key={item}>{item}</li>
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
    <section id="case-studies" className="section scroll-mt-28 bg-canvas" aria-labelledby="cases-heading">
      <Container>
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Solution patterns</p>
            <h2 id="cases-heading" className="text-h2 mt-2 text-ink">
              {heading}
            </h2>
          </div>
          <p className="text-body text-muted lg:col-span-5">{intro}</p>
        </div>
        <div className="mt-5 space-y-4">
          {caseStudies.map((study, index) => (
            <article key={study.slug} id={study.slug} className="scroll-mt-28 grid items-stretch gap-5 rounded-2xl border border-line p-4 sm:p-5 lg:grid-cols-2">
              <div className={index % 2 === 1 ? "flex h-full flex-col lg:order-2" : "flex h-full flex-col"}>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">{study.industry} · Solution pattern</p>
                <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{study.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{study.problem}</p>
                <Detail study={study} detailed={detailed} />
                <PatternLink study={study} detailed={detailed} />
              </div>
              <PatternWindow
                title={study.title}
                record={records[index] ?? "Example record"}
                steps={study.architecture}
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
