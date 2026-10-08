import { Container } from "@/components/layout/container";

const controls = [
  "Role-based access",
  "Secure APIs",
  "Authentication",
  "Database controls",
  "Audit trails",
  "Human approval",
  "Controlled AI actions",
  "Cloud deployment",
];

export function Trust() {
  return (
    <section className="section bg-surface" aria-labelledby="trust-heading">
      <Container className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Built for real business</p>
          <h2 id="trust-heading" className="text-h2 mt-2 text-ink">
            Your data. Your system. Your control.
          </h2>
          <p className="text-body mt-3 text-muted">
            These are the controls we design into a system. Which ones are switched on depends on the workflow and the systems it connects to.
          </p>
        </div>
        <ul className="grid content-start gap-2 sm:grid-cols-2 lg:col-span-7">
          {controls.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-ink">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
