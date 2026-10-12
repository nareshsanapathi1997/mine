import Link from "next/link";
import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { servicesInGroup, solutionGroups } from "@/content/services";

const visuals: Record<string, string[]> = {
  ai: ["Customer request", "AI", "Business data", "Decision", "Action"],
  software: ["Website", "Mobile", "Dashboard", "CRM"],
  infrastructure: ["Code", "CI/CD", "Cloud", "Monitoring", "Production"],
};

const surfaceIcons: Record<string, UiIconName> = {
  Website: "globe",
  Mobile: "smartphone",
  Dashboard: "layers",
  CRM: "blocks",
};

const records = ["Application #10482", "Room 214", "Order #8821"];

function Links({ slugs }: { slugs: readonly string[] }) {
  return (
    <ul className="mt-6 border-t border-line">
      {servicesInGroup(slugs).map((service) => (
        <li key={service.slug} className="border-b border-line">
          <Link href={`/solutions/${service.slug}`} className="group flex min-h-11 items-center gap-3 text-base font-medium text-ink">
            <span className="text-accent-ink transition-transform group-hover:translate-x-0.5">
              <UiIcon name="arrow" />
            </span>
            {service.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function GroupCopy({
  number,
  title,
  description,
  slugs,
}: {
  number: string;
  title: string;
  description: string;
  slugs: readonly string[];
}) {
  return (
    <div className="lg:col-span-5">
      <p className="step-num">{number}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-muted">{description}</p>
      <Links slugs={slugs} />
    </div>
  );
}

export function Services() {
  const [ai, software, infrastructure] = solutionGroups;

  return (
    <section id="solutions" className="section scroll-mt-28" aria-labelledby="services-heading">
      <Container>
        <h2 id="services-heading" className="text-h2 text-ink">
          What we build
        </h2>

        {ai ? (
          <div className="mt-8 grid items-start gap-8 border-t border-line pt-8 lg:grid-cols-12">
            <GroupCopy number="01" title={ai.title} description={ai.description} slugs={ai.slugs} />
            <div className="product-window min-w-0 lg:col-span-7" aria-label="AI workflow">
              <div className="product-window-bar">
                <span className="live-pip" aria-hidden="true" />
                AI agent
              </div>
              <div className="product-window-body">
                <p className="text-sm font-medium text-ink">Customer request</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">AI checks business data, then a decision.</p>
              </div>
              <ol className="m-0 list-none border-t border-line p-0">
                {visuals.ai.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 border-t border-line px-4 py-3 text-sm text-ink first:border-t-0">
                    <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}

        {software ? (
          <div className="mt-10 grid items-start gap-8 border-t border-line pt-10 lg:grid-cols-12">
            <GroupCopy number="02" title={software.title} description={software.description} slugs={software.slugs} />
            <div className="grid min-w-0 gap-3 lg:col-span-7">
              <div className="grid grid-cols-2 gap-3">
                {visuals.software.map((step) => (
                  <div key={step} className="flow-card">
                    <span className="icon-chip icon-chip-sm">
                      <UiIcon name={surfaceIcons[step] ?? "layers"} />
                    </span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              <div className="product-window">
                <div className="product-window-bar">
                  <span className="live-pip" aria-hidden="true" />
                  CRM
                </div>
                <ul className="m-0 list-none p-0">
                  {records.map((row) => (
                    <li key={row} className="flex items-center gap-2.5 border-t border-line px-4 py-3 text-sm text-ink first:border-t-0">
                      <UiIcon name="check" className="size-3.5 text-accent-ink" />
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {infrastructure ? (
          <div className="mt-10 grid items-start gap-8 border-t border-line pt-10 lg:grid-cols-12">
            <GroupCopy number="03" title={infrastructure.title} description={infrastructure.description} slugs={infrastructure.slugs} />
            <div className="product-window min-w-0 lg:col-span-7">
              <div className="product-window-bar">
                <span className="live-pip" aria-hidden="true" />
                Release path
              </div>
              <ol className="m-0 list-none p-0" aria-label="Release path">
                {visuals.infrastructure.map((step, index) => {
                  const icons: UiIconName[] = ["blocks", "workflow", "cloud", "status", "zap"];
                  return (
                    <li key={step} className="flex items-center gap-3 border-t border-line px-4 py-3 text-sm text-ink first:border-t-0">
                      <span className="icon-chip icon-chip-sm">
                        <UiIcon name={icons[index] ?? "layers"} />
                      </span>
                      <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
