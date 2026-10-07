import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/ui/workflow";

const flow = [
  "Customer request",
  "AI Agent",
  "Business records",
  "Decision",
  "Action",
  "Human handoff if necessary",
];

const checks = [
  "Identify the user",
  "Find the record",
  "Check the status",
  "Respond",
  "Trigger the next action if it is already allowed",
];

export function AiAgents() {
  return (
    <section className="section bg-surface" aria-labelledby="agents-heading">
      <Container className="grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            AI Agents
          </p>
          <h2 id="agents-heading" className="text-h2 cluster text-balance text-ink">
            AI that looks up the record, then takes the next step.
          </h2>
          <p className="text-body cluster text-muted">
            “Check my application status” is a piece of work, not a chat. The agent identifies the person, reads the record you already keep, and either answers or hands the case to someone who can decide.
          </p>
          <Button asChild arrow className="cluster">
            <Link href="/ai-automation">Explore AI Agents</Link>
          </Button>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <WorkflowDiagram steps={flow} label="How an AI agent handles a request" />
          <ol className="mt-6 space-y-2">
            {checks.map((item, index) => (
              <li key={item} className="flex min-h-11 items-center gap-3 text-sm text-ink">
                <span className="font-mono text-xs font-semibold text-accent-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
