import { Container } from "@/components/layout/container";

const sources = ["Website", "WhatsApp", "Email", "CRM", "ERP", "Payment gateway", "Google Workspace", "Microsoft 365", "Database", "REST API", "AI"];
const layers = ["Kyntriq system layer", "Business data", "Automation", "Action"];

export function Integrations() {
  return (
    <section className="section bg-surface" aria-labelledby="integrations-heading">
      <Container className="grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="integrations-heading" className="text-h2 uppercase text-ink">
            Connect the tools you already use.
          </h2>
          <p className="text-body mt-5 text-muted">
            Your business already has tools. We connect them into one workflow. We do not replace a system that already holds the record.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {sources.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ol className="signal-rail relative m-0 list-none p-0 lg:col-span-6 lg:col-start-7" aria-label="How a tool reaches an action">
          <span className="signal-dot" aria-hidden="true" />
          {layers.map((layer, index) => (
            <li key={layer} className="relative border-b border-line py-6 pl-10">
              <span className="absolute top-8 left-0 size-2.5 rounded-full border border-accent bg-surface" aria-hidden="true" />
              <span className="font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-1 block text-2xl text-ink">{layer}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
