import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { processSteps, whyPoints } from "@/content/home";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} builds websites, software, AI agents and automation around how an organization already operates.`,
  path: "/about",
});

const beliefs = [
  {
    title: "The operation comes first",
    body: "We learn how the institution or company already works, then choose the software that fits that map.",
  },
  {
    title: "AI only where the action is named",
    body: "An agent looks up your information and takes a step you have already defined. If the action cannot be named, it is not automated.",
  },
  {
    title: "One record",
    body: "Website, mobile, WhatsApp and the dashboard should not keep separate copies of the same customer, student or order.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build technology around the way businesses actually work."
        description={siteConfig.tagline}
      />

      <section className="section bg-canvas" aria-labelledby="philosophy-heading">
        <Container className="grid-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="philosophy-heading" className="text-h2 text-ink">
              Our philosophy
            </h2>
          </div>
          <div className="col-span-12 space-y-4 lg:col-span-7">
            <p className="text-body text-muted">
              {siteConfig.name} builds digital systems for schools, colleges, coaching institutes, hotels, manufacturers and growing businesses. A website, an app or an assistant should finish a step that a person currently copies between tools.
            </p>
            <p className="text-body text-muted">
              We would rather ship one workflow that writes back to the system of record than a chat window that leaves the work in a transcript.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="work-heading">
        <Container>
          <h2 id="work-heading" className="text-h2 text-ink">
            How we work
          </h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.number} className="rounded-lg border border-line bg-canvas p-4">
                <p className="font-mono text-xs font-semibold text-accent">{step.number}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-canvas" aria-labelledby="believe-heading">
        <Container>
          <h2 id="believe-heading" className="text-h2 text-ink">
            What we believe
          </h2>
          <ul className="grid-12 stack">
            {beliefs.map((item) => (
              <li key={item.title} className="col-span-12 md:col-span-4">
                <h3 className="text-h3 text-ink">{item.title}</h3>
                <p className="text-small mt-2 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="tech-heading">
        <Container className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="tech-heading" className="text-h2 text-ink">
              Technology approach
            </h2>
            <p className="text-body mt-3 text-muted">
              We use the stack that fits the workflow: web applications, mobile apps, APIs, databases, and AI where a next step can be specified. The public site and the internal tools share one description of a lead, an application or a booking.
            </p>
            <Link href="/insights" className="text-link mt-4">
              Technology insights <span className="text-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-h2 text-ink">Security</h2>
            <p className="text-body mt-3 text-muted">
              Access, deployment, backups and monitoring are part of the build. Environments stay separate, so a test does not write into live student, guest or customer data. Who can reach production is an explicit decision, not an accident of whoever set up the server.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-canvas" aria-labelledby="partner-heading">
        <Container className="max-w-3xl">
          <h2 id="partner-heading" className="text-h2 text-ink">
            Long-term partnership
          </h2>
          <p className="text-body mt-3 text-muted">
            We stay for deployment, maintenance and the next improvement — not only the first release. Later channels and products sit on the same foundation instead of a new tool for each department.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {whyPoints.slice(0, 4).map((point) => (
              <li key={point.title} className="border-t border-line pt-3">
                <h3 className="text-base font-semibold text-ink">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Tell us how your team works today." />
    </>
  );
}
