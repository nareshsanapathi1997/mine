import { Container } from "@/components/layout/container";
import { WorkflowDiagram } from "@/components/ui/workflow";

const tools = [
  "Website",
  "WhatsApp",
  "CRM",
  "ERP",
  "Email",
  "Google Workspace",
  "Microsoft 365",
  "Payment gateway",
  "Database",
  "REST APIs",
  "AI models",
];

const layer = ["Tool", "Kyntriq system layer", "Business record", "Automation", "Action"];

export function Integrations() {
  return (
    <section className="section bg-surface" aria-labelledby="integrations-heading">
      <Container className="grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Integrations
          </p>
          <h2 id="integrations-heading" className="text-h2 mt-3 text-balance text-ink">
            Connect what you already use.
          </h2>
          <p className="text-body mt-3 text-muted">
            Your business already has tools. We connect them into one workflow. We do not replace a system that already holds the record.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tools.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <WorkflowDiagram steps={layer} label="How a tool reaches an action" />
        </div>
      </Container>
    </section>
  );
}
