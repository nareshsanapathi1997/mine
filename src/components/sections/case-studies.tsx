import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { SectionHeading } from "@/components/layout/section-heading";
import { caseStudies } from "@/content/case-studies";

export function CaseStudies({
  heading = "Built for real business problems.",
  intro = "Illustrative engagements, not verified client results.",
  withAnchors = false,
  surface = "canvas",
}: {
  heading?: string;
  intro?: string;
  withAnchors?: boolean;
  surface?: "canvas" | "white";
}) {
  return (
    <section
      id="case-studies"
      className={`section scroll-mt-28 ${surface === "white" ? "bg-surface" : "bg-canvas"}`}
      aria-labelledby="cases-heading"
    >
      <Container>
        <div data-reveal>
          <SectionHeading id="cases-heading" eyebrow="Case studies" title={heading} description={intro} />
        </div>
        <ul className="grid-12 stack" data-reveal-stagger>
          {caseStudies.map((study) => (
            <li
              key={study.slug}
              id={withAnchors ? study.slug : undefined}
              data-reveal-child
              className="col-span-12 scroll-mt-28 lg:col-span-4"
            >
              <article className="card card-accent flex flex-col">
                <p className="font-mono text-sm font-medium text-accent-ink">
                  {String(caseStudies.indexOf(study) + 1).padStart(2, "0")}
                </p>
                {study.placeholder ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Placeholder
                  </p>
                ) : null}
                <h3 className="text-h3 mt-3 text-ink">{study.title}</h3>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-ink">Challenge</dt>
                    <dd className="mt-1 text-muted">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Solution</dt>
                    <dd className="mt-1 text-muted">{study.solution}</dd>
                  </div>
                  {study.result ? (
                    <div>
                      <dt className="font-semibold text-ink">Result</dt>
                      <dd className="mt-1 text-muted">{study.result}</dd>
                    </div>
                  ) : null}
                </dl>
                <TextLink href={`/case-studies#${study.slug}`} className="mt-4">
                  View case study
                  <span className="sr-only"> {study.title}</span>
                </TextLink>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
