import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { TextLink } from "@/components/ui/text-link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { services } from "@/content/services";
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
        title="Technology solutions built around your business."
        description="Web, mobile, business software, AI and automation — designed as one system, or delivered as the piece you need first."
      />
      <section className="section bg-canvas">
        <Container>
          <ul className="grid-12" data-reveal-stagger>
          {services.map((service) => (
            <li key={service.slug} data-reveal-child className="col-span-12 lg:col-span-6">
            <article
              id={service.slug}
              className="card card-accent scroll-mt-28"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="icon-tile">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <div>
                  <h2 className="text-h3 text-ink">
                    <Link href={`/solutions/${service.slug}`} className="link-underline">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="text-body mt-2 text-muted">{service.description}</p>
                  <p className="text-body mt-3 text-ink">{service.details}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    <TextLink href={`/solutions/${service.slug}`}>Learn More</TextLink>
                    <TextLink href={`/contact?need=${encodeURIComponent(service.title)}`}>
                      Talk to an Expert
                    </TextLink>
                  </div>
                </div>
              </div>
            </article>
            </li>
          ))}
          </ul>
        </Container>
      </section>
      <section className="section bg-surface" aria-labelledby="sector-offerings">
        <Container>
          <h2 id="sector-offerings" className="text-h2 text-ink">
            Built around a sector
          </h2>
          <p className="text-body measure mt-3 text-muted">
            Education, hospitality and manufacturing systems are the same services, arranged around the work those teams repeat.
          </p>
          <ul className="grid-12 stack" data-reveal-stagger>
            {sectorOfferings().map((offering) => (
              <li key={offering.slug} data-reveal-child className="col-span-12 lg:col-span-4">
                <Link href={`/solutions/${offering.slug}`} className="card card-muted card-accent block">
                  <span className="text-h3 text-ink">{offering.title}</span>
                  <p className="text-small mt-2 text-muted">{offering.description}</p>
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
