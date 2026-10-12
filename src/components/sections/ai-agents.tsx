import Image from "next/image";
import Link from "next/link";
import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";

const demo = [
  { label: "User", text: "“Check my application status”" },
  { label: "AI Agent", text: "Identifying customer…" },
  { label: "Record", text: "✓ Customer found" },
  { label: "Record", text: "✓ Application #10482" },
  { label: "Status", text: "✓ Documents verified" },
  { label: "Result", text: "Interview scheduled" },
  { label: "Action", text: "Send confirmation to customer" },
];

const steps: { label: string; icon: UiIconName }[] = [
  { label: "Identify user", icon: "user" },
  { label: "Find record", icon: "search" },
  { label: "Check status", icon: "status" },
  { label: "Respond", icon: "message" },
  { label: "Trigger action", icon: "zap" },
  { label: "Human handoff when required", icon: "users" },
];

export function AiAgents() {
  return (
    <section className="section" aria-labelledby="ai-heading">
      <Container className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">AI Agents</p>
          <h2 id="ai-heading" className="text-h2 mt-3 text-ink">
            AI that doesn&apos;t just chat. It takes the next step.
          </h2>
          <p className="text-body mt-4 text-muted">
            An AI agent can identify a customer, look up the correct record, follow business rules and trigger an approved action.
          </p>
          <ol className="m-0 mt-6 list-none border-t border-line p-0">
            {steps.map((step, index) => (
              <li key={step.label} className="flex items-center gap-3 border-b border-line py-3">
                <span className="icon-chip icon-chip-sm">
                  <UiIcon name={step.icon} />
                </span>
                <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base text-ink">{step.label}</span>
              </li>
            ))}
          </ol>
          <Link href="/ai-automation" className="text-link mt-5">
            Explore AI Agents <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
          </Link>
        </div>
        <div className="grid min-w-0 content-start gap-4 lg:col-span-7">
          <figure className="photo-frame photo-wide">
            <Image
              src="/images/ai-agent-workspace.jpg"
              alt="A dark desk with a monitor showing abstract teal lines"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </figure>
          <div className="product-window min-w-0">
            <div className="product-window-bar">
              <span className="live-pip" aria-hidden="true" />
              Agent
            </div>
            <ol className="m-0 list-none p-0" aria-label="Example conversation">
              {demo.map((line) => (
                <li key={line.text} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3 border-t border-line px-4 py-3 text-sm text-ink first:border-t-0">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-ink">{line.label}</span>
                  <span>{line.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
