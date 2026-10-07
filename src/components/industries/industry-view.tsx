import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/ui/workflow";
import type { IndustryPage } from "@/content/industry-details";
import { industryStories } from "@/content/stories";

export function IndustryView({
  page,
  crumbs,
  jsonLd,
  related,
}: {
  page: IndustryPage;
  crumbs: Crumb[];
  jsonLd: unknown;
  related: { href: string; title: string; description: string }[];
}) {
  const story = industryStories[page.slug];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <header className="border-b border-line bg-canvas">
        <Container className="section-tight grid-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              Industries
            </p>
            <h1 className="text-h1 cluster text-balance text-ink">{story?.hero ?? page.title}</h1>
            <p className="text-body measure cluster text-muted">{page.lede}</p>
            <Button asChild size="lg" arrow className="cluster w-full sm:w-auto">
              <Link href={`/contact?need=${encodeURIComponent(page.title)}`}>Talk to an Expert</Link>
            </Button>
          </div>
        </Container>
      </header>

      {story ? (
        <>
          <section className="section bg-surface" aria-labelledby="problems-heading">
            <Container>
              <h2 id="problems-heading" className="text-h2 text-ink">
                Problems
              </h2>
              <ul className="grid-12 stack">
                {story.problems.map((item) => (
                  <li key={item.title} className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <article className="h-full border-t border-line pt-4">
                      <h3 className="text-h3 text-ink">{item.title}</h3>
                      <p className="text-small mt-2 text-muted">{item.body}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
          <section className="section bg-canvas" aria-labelledby="solutions-heading">
            <Container>
              <h2 id="solutions-heading" className="text-h2 text-ink">
                Solutions
              </h2>
              <ul className="grid-12 stack">
                {story.solutions.map((item) => (
                  <li key={item.title} className="col-span-12 md:col-span-6">
                    <article className="card h-full">
                      <h3 className="text-h3 text-ink">{item.title}</h3>
                      <p className="text-small mt-2 text-muted">{item.body}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
          <section className="section bg-surface" aria-labelledby="workflow-heading">
            <Container>
              <h2 id="workflow-heading" className="text-h2 text-ink">
                Workflow
              </h2>
              <p className="text-body mt-3 max-w-[68ch] text-muted">{story.ai}</p>
              <div className="mt-6">
                <WorkflowDiagram steps={story.workflow} />
              </div>
            </Container>
          </section>
        </>
      ) : null}

      <section className="section bg-canvas" aria-labelledby="context-heading">
        <Container className="max-w-3xl">
          <h2 id="context-heading" className="text-h2 text-ink">
            How we approach it
          </h2>
          {page.sections.map((section) => (
            <div key={section.heading} className="mt-6">
              <h3 className="text-h3 text-ink">{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-body mt-2 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>

      {page.explore && page.explore.length > 0 ? (
        <section className="section bg-surface" aria-labelledby="explore-heading">
          <Container>
            <h2 id="explore-heading" className="text-h2 text-ink">
              Explore further
            </h2>
            <ul className="grid-12 stack">
              {page.explore.map((item) => (
                <li key={item.href} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <Link href={item.href} className="card block h-full">
                    <span className="text-h3 text-ink">{item.title}</span>
                    <p className="text-small mt-2 text-muted">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section bg-canvas" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-h2 text-ink">
              Related solutions
            </h2>
            <ul className="grid-12 stack">
              {related.map((item) => (
                <li key={item.href} className="col-span-12 md:col-span-6 lg:col-span-3">
                  <Link href={item.href} className="card block h-full">
                    <span className="text-h3 text-ink">{item.title}</span>
                    <p className="text-small mt-2 text-muted">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand title={story?.cta ?? "Tell us about the workflow."} />
    </>
  );
}
