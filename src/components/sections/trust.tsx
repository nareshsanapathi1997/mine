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
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Built for real business</p>
          <h2 id="trust-heading" className="text-h2 mt-4 uppercase text-ink">
            Your data. Your system. Your control.
          </h2>
          <p className="text-body mt-5 text-muted">
            These are the controls we design into a system. Which ones are switched on depends on the workflow and the systems it connects to.
          </p>
        </div>
        <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {controls.map((item) => (
            <li key={item} className="border-t border-line py-4 text-base text-ink">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
