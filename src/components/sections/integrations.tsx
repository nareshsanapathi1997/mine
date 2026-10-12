import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";

const sources: { label: string; icon: UiIconName }[] = [
  { label: "Website", icon: "globe" },
  { label: "WhatsApp", icon: "message" },
  { label: "Email", icon: "mail" },
  { label: "CRM", icon: "blocks" },
  { label: "ERP", icon: "factory" },
  { label: "Payment gateway", icon: "briefcase" },
  { label: "Google Workspace", icon: "layers" },
  { label: "Microsoft 365", icon: "building" },
  { label: "Database", icon: "database" },
  { label: "REST API", icon: "link" },
  { label: "AI", icon: "bot" },
];
const layers: { label: string; icon: UiIconName }[] = [
  { label: "Kyntriq system layer", icon: "layers" },
  { label: "Business data", icon: "database" },
  { label: "Automation", icon: "workflow" },
  { label: "Action", icon: "zap" },
];

export function Integrations() {
  return (
    <section className="section" aria-labelledby="integrations-heading">
      <Container>
        <div className="max-w-[40rem]">
          <h2 id="integrations-heading" className="text-h2 text-ink">
            Connect the tools you already use.
          </h2>
          <p className="text-body mt-4 text-muted">
            Your business already has tools. We connect them into one workflow. We do not replace a system that already holds the record.
          </p>
        </div>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:col-span-7">
            {sources.map((item) => (
              <li key={item.label} className="soft-card is-row">
                <span className="icon-chip icon-chip-sm">
                  <UiIcon name={item.icon} />
                </span>
                <span className="text-sm font-medium text-ink">{item.label}</span>
              </li>
            ))}
          </ul>
          <ol className="m-0 grid list-none gap-2 p-0 lg:col-span-5" aria-label="How a tool reaches an action">
            {layers.map((layer, index) => (
              <li key={layer.label} className="flow-card">
                <span className="flex items-center justify-between gap-2">
                  <span className="icon-chip icon-chip-sm">
                    <UiIcon name={layer.icon} />
                  </span>
                  <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                </span>
                <strong>{layer.label}</strong>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
