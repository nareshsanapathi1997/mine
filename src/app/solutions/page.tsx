import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { servicesInGroup, solutionGroups } from "@/content/services";
import { sectorOfferings } from "@/content/solution-details";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Solutions",
  description: `Websites, mobile apps, business software, AI agents, voice, WhatsApp, automation and cloud from ${siteConfig.name}.`,
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Technology built around how you operate."
        description="AI, software and infrastructure — designed as one system, or delivered as the piece you need first."
      />
      <section className="section bg-canvas">
        <Container className="space-y-12">
          {solutionGroups.map((group) => (
            <div key={group.id}>
              <h2 className="text-h2 text-ink">{group.title}</h2>
              <p className="text-body mt-2 max-w-[62ch] text-muted">{group.description}</p>
              <ul className="mt-5 grid gap-[var(--gutter)] lg:grid-cols-2">
                {servicesInGroup(group.slugs).map((service) => (
                  <li key={service.slug} id={service.slug} className="scroll-mt-28">
                    <Link href={`/solutions/${service.slug}`} className="card flex h-full flex-col">
                      <span className="icon-tile">
                        <Icon name={service.icon} className="size-5" />
                      </span>
                      <span className="text-h3 mt-4 text-ink">{service.title}</span>
                      <span className="text-body mt-2 text-muted">{service.details}</span>
                      <span className="mt-4 text-sm font-semibold text-accent-ink">
                        Explore {service.title} <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
      <section className="section bg-surface" aria-labelledby="sector-offerings">
        <Container>
          <h2 id="sector-offerings" className="text-h2 text-ink">
            Built around a sector
          </h2>
          <p className="text-body measure mt-3 text-muted">
            Education, hospitality and manufacturing systems arrange the same services around the work those teams repeat.
          </p>
          <ul className="grid-12 stack">
            {sectorOfferings().map((offering) => (
              <li key={offering.slug} className="col-span-12 lg:col-span-4">
                <Link href={`/solutions/${offering.slug}`} className="card block h-full">
                  <span className="text-h3 text-ink">{offering.title}</span>
                  <p className="text-small mt-2 text-muted">{offering.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent-ink">
                    Explore {offering.title} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
