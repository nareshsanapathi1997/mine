import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import type { HomeContent } from "@/lib/cms/types";

export function HomeServices({ content }: { content: HomeContent["services"] }) {
  return (
    <section id="what-we-build" className="section h-section h-band-soft scroll-mt-24" aria-labelledby="build-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="build-heading" className="text-h2 mt-3 text-ink">
              {content.title}
            </h2>
          </div>
          <p className="text-body text-muted">{content.intro}</p>
        </div>
        <ul className="stack h-bento" data-reveal-stagger>
          {content.items.map((service, index) => (
            <li key={service.title} className={index === 0 ? "card h-service h-service-lead overflow-hidden p-0" : "card h-service overflow-hidden p-0"} data-reveal-child>
              <div className="h-service-media relative">
                <Photo
                  src={service.photo.src}
                  alt={service.photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="icon-chip">
                  <UiIcon name={service.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-ink">
                  {service.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2">
                      <UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />
                      {example}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="text-link mt-auto pt-5">
                  Learn more <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                  <span className="sr-only"> about {service.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="h-tools mt-6">
          <p className="text-sm font-semibold text-ink">{content.toolsTitle}</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={content.toolsTitle}>
            {content.tools.map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
