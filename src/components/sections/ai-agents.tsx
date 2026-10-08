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
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">AI Agents</p>
          <h2 id="ai-heading" className="text-h2 mt-4 max-w-[14ch] uppercase text-ink">
            AI that doesn&apos;t just chat. It takes the next step.
          </h2>
          <p className="text-body mt-5 max-w-[46ch] text-muted">
            An AI agent can identify a customer, look up the correct record, follow business rules and trigger an approved action.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-[#0c1220]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2 rounded-full bg-sky-400" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#cbd5e1]">Agent</span>
            </div>
            <div className="space-y-3 px-5 py-6" aria-label="Example conversation">
              {demo.map((line) => (
                <p key={line.text} className="demo-line text-sm text-[#e2e8f0]">
                  <span className="mr-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7dd3fc]">{line.label}</span>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <ol className="m-0 list-none space-y-5 p-0 lg:col-span-4 lg:col-start-9">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 border-t border-line pt-4">
              <span className="font-mono text-sm text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-lg text-ink">{step}</span>
            </li>
          ))}
          <li>
            <Link href="/ai-automation" className="text-link">
              Explore AI Agents <span className="text-link-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        </ol>
      </Container>
    </section>
  );
}
