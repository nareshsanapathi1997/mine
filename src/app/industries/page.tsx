import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { TextLink } from "@/components/ui/text-link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { industries } from "@/content/industries";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description: `Digital systems from ${siteConfig.name} for education, hospitality, manufacturing, healthcare, professional services and growing companies.`,
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Solutions for the industries that keep businesses moving."
        description="From a coaching institute to a multi-site operation, the work is the same: connect the tools people already use and remove the manual relay."
      />
      <section className="section bg-canvas">
        <Container>
          <ul className="grid-12" data-reveal-stagger>
          {industries.map((industry) => (
            <li key={industry.slug} data-reveal-child className="col-span-12 md:col-span-6 xl:col-span-4">
            <article id={industry.slug} className="card card-accent scroll-mt-28">
              <span className="icon-tile bg-canvas">
                <Icon name={industry.icon} className="size-5" />
              </span>
              <h2 className="text-h3 mt-4 text-ink">
                <Link href={`/industries/${industry.slug}`} className="link-underline">
                  {industry.title}
                </Link>
              </h2>
              <p className="text-small mt-1 text-muted">{industry.audience}</p>
              <p className="text-body mt-3 text-ink">{industry.summary}</p>
              <ul className="mt-4">
                {industry.solutions.map((solution) => (
                  <li key={solution} className="border-t border-line py-1.5 text-small text-muted">
                    {solution}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                <TextLink href={`/industries/${industry.slug}`}>
                  View Solutions
                  <span className="sr-only"> for {industry.title}</span>
                </TextLink>
                <TextLink href={`/contact?need=${encodeURIComponent(industry.title)}`}>
                  Talk to an Expert
                  <span className="sr-only"> about {industry.title}</span>
                </TextLink>
              </div>
            </article>
            </li>
          ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
