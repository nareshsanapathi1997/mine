import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { SectionHeading } from "@/components/layout/section-heading";
import { Icon } from "@/components/icons";
import { industries } from "@/content/industries";

export function Industries() {
  return (
    <section id="industries" className="section scroll-mt-28 bg-canvas" aria-labelledby="industries-heading">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="industries-heading"
            eyebrow="Who we serve"
            title="Organizations with a real operation to run."
            description="Schools and coaching institutes, hotels, manufacturers, clinics, professional firms, and growing companies. The pattern is the same: a request comes in, and someone should not have to copy it into the next tool."
          />
        </div>
        <ul className="grid-12 stack" data-reveal-stagger>
          {industries.map((industry) => (
            <li key={industry.slug} data-reveal-child className="col-span-12 md:col-span-6 xl:col-span-4">
              <article className="card card-accent flex flex-col">
                <span className="icon-tile bg-canvas">
                  <Icon name={industry.icon} className="size-5" />
                </span>
                <h3 className="text-h3 mt-4 text-ink">{industry.title}</h3>
                <p className="text-small mt-1 text-muted">{industry.audience}</p>
                <ul className="mt-4 flex flex-1 flex-col">
                  {industry.solutions.map((solution) => (
                    <li key={solution} className="border-t border-line py-1.5 text-small text-muted">
                      {solution}
                    </li>
                  ))}
                </ul>
                <TextLink href={`/industries/${industry.slug}`} className="mt-4">
                  View Solutions
                  <span className="sr-only"> for {industry.title}</span>
                </TextLink>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
