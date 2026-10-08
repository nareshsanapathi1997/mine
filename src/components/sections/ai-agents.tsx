import Link from "next/link";
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

const steps = [
  "Identify user",
  "Find record",
  "Check status",
  "Respond",
  "Trigger action",
  "Human handoff when required",
];

export function AiAgents() {
  return (
    <section className="section bg-canvas" aria-labelledby="ai-heading">
      <Container className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">AI Agents</p>
          <h2 id="ai-heading" className="text-h2 mt-2 text-ink">
            AI that doesn&apos;t just chat. It takes the next step.
          </h2>
          <p className="text-body mt-3 text-muted">
            An AI agent can identify a customer, look up the correct record, follow business rules and trigger an approved action.
          </p>
          <ol className="m-0 mt-4 list-none space-y-0 p-0">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 border-t border-line py-3">
                <span className="font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <Link href="/ai-automation" className="text-link mt-2">
            Explore AI Agents <span className="text-link-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="product-window min-w-0 lg:col-span-7">
          <div className="product-window-bar">
            <span className="live-pip" aria-hidden="true" />
            Agent
          </div>
          <div className="product-window-body space-y-3" aria-label="Example conversation">
            {demo.map((line) => (
              <p key={line.text} className={line.label === "User" ? "chat-user demo-line" : "chat-agent demo-line"}>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">{line.label}</span>
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
