import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { servicesInGroup, solutionGroups } from "@/content/services";

export function Services() {
  return (
    <section id="solutions" className="section scroll-mt-28 bg-canvas" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="What we build"
          title="Software, AI and infrastructure around the same workflow."
          description="Start with the piece that is blocking the team. The rest is designed so it can share a record."
        />
        <div className="stack space-y-10">
          {solutionGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-h3 text-ink">{group.title}</h3>
              <p className="mt-2 max-w-[62ch] text-small text-muted">{group.description}</p>
              <ul className="mt-4 grid gap-[var(--gutter)] sm:grid-cols-2 xl:grid-cols-4" data-reveal-stagger>
                {servicesInGroup(group.slugs).map((service) => (
                  <li key={service.slug} data-reveal-child>
                    <Link href={`/solutions/${service.slug}`} className="card card-accent flex h-full flex-col">
                      <span className="icon-tile">
                        <Icon name={service.icon} className="size-5" />
                      </span>
                      <span className="text-h3 mt-4 block text-ink">{service.title}</span>
                      <span className="text-small mt-2 block flex-1 text-muted">{service.description}</span>
                      <span className="mt-4 text-sm font-semibold text-accent-ink">
                        Explore {service.title} <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
