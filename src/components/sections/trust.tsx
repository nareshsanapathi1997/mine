import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";

const controls: { label: string; icon: UiIconName }[] = [
  { label: "Role-based access", icon: "users" },
  { label: "Secure APIs", icon: "link" },
  { label: "Authentication", icon: "shield" },
  { label: "Database controls", icon: "database" },
  { label: "Audit trails", icon: "clipboard" },
  { label: "Human approval", icon: "user" },
  { label: "Controlled AI actions", icon: "bot" },
  { label: "Cloud deployment", icon: "cloud" },
];

export function Trust() {
  return (
    <section className="section" aria-labelledby="trust-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Built for real business</p>
            <h2 id="trust-heading" className="text-h2 mt-3 text-ink">
              Your data. Your system. Your control.
            </h2>
          </div>
          <p className="text-body text-muted">
            These are the controls we design into a system. Which ones are switched on depends on the workflow and the systems it connects to.
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {controls.map((item) => (
            <li key={item.label} className="soft-card is-row">
              <span className="icon-chip icon-chip-sm">
                <UiIcon name={item.icon} />
              </span>
              <span className="text-sm font-semibold text-ink">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
