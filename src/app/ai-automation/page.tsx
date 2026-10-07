import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/ui/workflow";
import { aiExamples } from "@/content/home";
import { servicesInGroup } from "@/content/services";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { servicesJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata = createMetadata({
  title: "AI & Automation",
  description: `AI agents, voice, WhatsApp and workflow automation from ${siteConfig.name}. AI that can look up your systems and take a defined next step.`,
  path: "/ai-automation",
});

const capabilities = [
  ...servicesInGroup(["ai-agents", "voice-ai", "whatsapp-automation", "business-automation"]),
];

const booking = [
  "Customer sends WhatsApp",
  "AI Agent",
  "Check CRM",
  "Check availability",
  "Create booking",
  "Send confirmation",
];

export default function AIAutomationPage() {
  return (
    <>
      <JsonLd
        data={servicesJsonLd()}
      />
      <header className="border-b border-line bg-canvas">
        <Container className="section-tight">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            AI & Automation
          </p>
          <h1 className="text-h1 cluster max-w-[18ch] text-balance text-ink">
            AI that doesn&apos;t just answer. AI that gets work done.
          </h1>
          <p className="text-body measure cluster text-muted">
            An agent is useful when the conversation changes a record: a booking, a ticket, a status, a follow-up. If someone still retypes it, you have a chatbot.
          </p>
          <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact?need=AI%20%26%20Automation">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <a href="#workflow">See how it works</a>
            </Button>
          </div>
        </Container>
      </header>

      <section className="section bg-surface" aria-labelledby="capabilities-heading">
        <Container>
          <h2 id="capabilities-heading" className="text-h2 text-ink">
            What AI can actually do here
          </h2>
          <ul className="grid-12 stack">
            {capabilities.map((service) => (
              <li key={service.slug} className="col-span-12 md:col-span-6">
                <Link href={`/solutions/${service.slug}`} className="card flex h-full flex-col">
                  <span className="icon-tile">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <span className="text-h3 mt-4 text-ink">{service.title}</span>
                  <span className="text-small mt-2 flex-1 text-muted">{service.details}</span>
                  <span className="mt-4 text-sm font-semibold text-accent-ink">
                    Explore {service.title} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="col-span-12 md:col-span-6">
              <Link href="/solutions/business-software" className="card flex h-full flex-col">
                <span className="text-h3 text-ink">Business AI</span>
                <span className="text-small mt-2 flex-1 text-muted">
                  AI inside the system of record: status, routing and the next task, using the same rules as the people who run it.
                </span>
                <span className="mt-4 text-sm font-semibold text-accent-ink">
                  Explore Business Software <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <section id="workflow" className="section scroll-mt-28 bg-canvas" aria-labelledby="workflow-heading">
        <Container>
          <h2 id="workflow-heading" className="text-h2 text-ink">
            A booking, finished
          </h2>
          <p className="text-body mt-3 max-w-[68ch] text-muted">
            The guest writes on WhatsApp. The agent checks who they are, checks what is open, creates the booking, and sends the confirmation. A person still handles the exception.
          </p>
          <div className="mt-6">
            <WorkflowDiagram steps={booking} label="WhatsApp booking workflow" />
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="examples-heading">
        <Container>
          <h2 id="examples-heading" className="text-h2 text-ink">
            Requests with an outcome
          </h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {aiExamples.map((example) => (
              <li key={example.id} className="grid gap-2 py-4 md:grid-cols-12">
                <p className="text-base font-semibold text-ink md:col-span-5">{example.prompt}</p>
                <p className="text-sm leading-relaxed text-muted md:col-span-7">{example.result}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Have a workflow you want to automate?" />
    </>
  );
}
