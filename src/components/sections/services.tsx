import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { SectionHeading } from "@/components/layout/section-heading";
import { Icon } from "@/components/icons";
import { services, type Service } from "@/content/services";

const spans: Record<string, string> = {
  "ai-agents": "col-span-12 md:col-span-6",
  "web-development": "col-span-12 md:col-span-6",
  "mobile-applications": "col-span-12 sm:col-span-6 lg:col-span-4",
  "business-software": "col-span-12 sm:col-span-6 lg:col-span-4",
  "voice-ai": "col-span-12 sm:col-span-6 lg:col-span-4",
  "whatsapp-automation": "col-span-12 sm:col-span-6 lg:col-span-4",
  "business-automation": "col-span-12 sm:col-span-6 lg:col-span-4",
  "cloud-devops": "col-span-12 sm:col-span-6 lg:col-span-4",
};

const order = [
  "ai-agents",
  "web-development",
  "mobile-applications",
  "business-software",
  "voice-ai",
  "whatsapp-automation",
  "business-automation",
  "cloud-devops",
];

function Preview({ slug }: { slug: string }) {
  if (slug === "ai-agents") {
    return (
      <div className="ai-preview" aria-hidden="true">
        <span className="ai-preview-node">Request</span>
        <span className="ai-preview-line" />
        <span className="ai-preview-node ai-preview-node-ai">AI Agent</span>
        <span className="ai-preview-line" />
        <span className="ai-preview-node">System</span>
        <p className="ai-preview-note">“Check my application status”</p>
      </div>
    );
  }

  if (slug === "web-development") {
    return (
      <div className="mini-browser" aria-hidden="true">
        <div className="mini-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="mini-browser-body">
          <span className="mini-line w-2/3" />
          <span className="mini-line w-1/2" />
          <span className="mini-block" />
        </div>
      </div>
    );
  }

  return null;
}

function ServiceCard({ service }: { service: Service }) {
  const featured = service.slug === "ai-agents";
  return (
    <article className={featured ? "card card-ai flex flex-col" : "card card-muted card-accent flex flex-col"}>
      <span className={featured ? "icon-tile icon-tile-ai" : "icon-tile"}>
        <Icon name={service.icon} className="size-5" />
      </span>
      <h3 className="text-h3 mt-4 text-ink">{service.title}</h3>
      <p className="text-small mt-2 flex-1 text-muted">{service.description}</p>
      <Preview slug={service.slug} />
      <TextLink href={`/solutions/${service.slug}`} className="mt-3">
        Learn More
        <span className="sr-only"> about {service.title}</span>
      </TextLink>
    </article>
  );
}

export function Services() {
  const ordered = order
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));

  return (
    <section id="solutions" className="section scroll-mt-28 bg-surface" aria-labelledby="solutions-heading">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="solutions-heading"
            eyebrow="What we build"
            title="The work, then the software that carries it."
            description="Websites, mobile apps, internal systems, AI agents, and automation. Start with the piece that is blocking the team. Each one is built so it can share a record with the rest."
          />
        </div>
        <ul className="grid-12 stack" data-reveal-stagger>
          {ordered.map((service) => (
            <li key={service.slug} data-reveal-child className={spans[service.slug] ?? "col-span-12"}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
