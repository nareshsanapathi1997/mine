import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { processSteps, whyPoints } from "@/content/home";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} designs websites, software, AI agents and automation around how an organization already operates.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Software shaped around the work, then connected so it can run."
        description={siteConfig.tagline}
      />

      <section className="section bg-canvas" aria-labelledby="mission-heading">
        <Container className="grid-12">
          <div className="card card-accent col-span-12 lg:col-span-6" data-reveal>
            <h2 id="mission-heading" className="text-h2 text-ink">
              Mission
            </h2>
            <p className="text-body cluster text-muted">
              {siteConfig.name} builds digital systems for schools, colleges, coaching institutes, hotels, manufacturers and growing businesses. The aim is practical: a website, an app or an assistant should finish a step that a person currently copies between tools.
            </p>
            <p className="text-body mt-3 text-muted">
              We would rather ship one workflow that writes back to the system of record than a chat window that leaves the work in a transcript.
            </p>
          </div>
          <div className="card card-accent col-span-12 lg:col-span-6" data-reveal>
            <h2 className="text-h2 text-ink">Approach</h2>
            <p className="text-body cluster text-muted">
              We start from the operation. Who receives the enquiry, what status the team trusts, which step is repeated, and which decision must stay with a person. Technology follows that map.
            </p>
            <p className="text-body mt-3 text-muted">
              AI is added where an action can be named in advance: look up a status, create a task, send a confirmation you already send. If the action cannot be named, it is not automated.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="build-heading">
        <Container>
          <div data-reveal>
            <h2 id="build-heading" className="text-h2 text-ink">
              What we build
            </h2>
            <p className="text-body measure mt-3 text-muted">
              Web, mobile, business software, AI agents, voice, WhatsApp, automation and cloud. Each one can stand alone. They are designed so they can share a record.
            </p>
          </div>
          <ul className="grid-12 stack" data-reveal-stagger>
            {services.map((service) => (
              <li key={service.slug} data-reveal-child className="col-span-12 sm:col-span-6 min-[1440px]:col-span-3">
                <Link href={`/solutions/${service.slug}`} className="card card-muted card-accent block">
                  <span className="icon-tile">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <span className="text-h3 mt-4 block text-ink">{service.title}</span>
                  <span className="text-small mt-2 block text-muted">{service.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-canvas" aria-labelledby="values-heading">
        <Container>
          <h2 id="values-heading" className="text-h2 text-ink" data-reveal>
            How we choose the work
          </h2>
          <ul className="grid-12 stack" data-reveal-stagger>
            {whyPoints.map((point) => (
              <li key={point.title} data-reveal-child className="card card-accent col-span-12 md:col-span-6 xl:col-span-4">
                <span className="icon-tile bg-canvas">
                  <Icon name={point.icon} className="size-5" />
                </span>
                <h3 className="text-h3 mt-4 text-ink">{point.title}</h3>
                <p className="text-small mt-2 text-muted">{point.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="work-heading">
        <Container>
          <h2 id="work-heading" className="text-h2 text-ink" data-reveal>
            How we work
          </h2>
          <ol
            className="stack grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-6 lg:[&>li]:col-span-2 lg:[&>li:nth-child(4)]:col-start-2 min-[1600px]:grid-cols-5 min-[1600px]:[&>li]:col-span-1 min-[1600px]:[&>li:nth-child(4)]:col-start-auto"
            data-reveal-stagger
          >
            {processSteps.map((step) => (
              <li key={step.number} data-reveal-child className="card card-muted card-accent">
                <p className="text-xs font-semibold tracking-[0.16em] text-accent">{step.number}</p>
                <h3 className="text-h3 mt-3 text-ink">{step.title}</h3>
                <p className="text-small mt-2 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
