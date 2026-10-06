import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Icon } from "@/components/icons";
import { whyPoints } from "@/content/home";
import { siteConfig } from "@/content/site";

export function WhyUs() {
  return (
    <section id="about" className="section scroll-mt-28 bg-canvas" aria-labelledby="about-heading">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="about-heading"
            eyebrow={`Why ${siteConfig.name}`}
            title="A partner for the system, not a one-off build."
            description="The useful question is not which technology is fashionable. It is which step in the operation should no longer depend on a person moving data between tools."
          />
        </div>
        <ul className="grid-12 stack" data-reveal-stagger>
          {whyPoints.map((point) => (
            <li key={point.title} data-reveal-child className="card card-accent col-span-12 md:col-span-6 xl:col-span-4">
              <span className="icon-tile bg-canvas">
                <Icon name={point.icon} className="size-5" />
              </span>
              <h3 className="text-h3 mt-4 text-ink">{point.title}</h3>
              <p className="text-small mt-2 text-muted">{point.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
