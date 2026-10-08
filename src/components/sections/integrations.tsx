import { Container } from "@/components/layout/container";

const sources = ["Website", "WhatsApp", "Email", "CRM", "ERP", "Payment gateway", "Google Workspace", "Microsoft 365", "Database", "REST API", "AI"];
const layers = ["Kyntriq system layer", "Business data", "Automation", "Action"];

export function Integrations() {
  return (
    <section className="section bg-surface" aria-labelledby="integrations-heading">
      <Container className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="integrations-heading" className="text-h2 text-ink">
            Connect the tools you already use.
          </h2>
          <p className="text-body mt-3 text-muted">
            Your business already has tools. We connect them into one workflow. We do not replace a system that already holds the record.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sources.map((item) => (
              <li key={item} className="rounded-xl border border-line px-3 py-2 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2 lg:col-span-6" aria-label="How a tool reaches an action">
          {layers.map((layer, index) => (
            <li key={layer} className="flow-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{layer}</strong>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
