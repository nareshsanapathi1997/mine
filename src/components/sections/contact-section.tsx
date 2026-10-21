import { Glyph } from "@/components/icons";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Photo } from "@/components/ui/photo";
import { Container } from "@/components/layout/container";
import { getCms } from "@/lib/cms";

export async function ContactSection({ defaultNeed = "" }: { defaultNeed?: string }) {
  const { site, contact } = await getCms();

  return (
    <section id="contact" className="hero-stage relative scroll-mt-28 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-glow" aria-hidden="true" />
      <Container className="section relative grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            {contact.eyebrow}
          </p>
          <h1 className="text-h1 cluster text-ink">{contact.title}</h1>
          <p className="text-body mt-3 text-muted">{contact.description}</p>
          <figure className="photo-frame page-hero-photo c-photo relative mt-5" style={{ aspectRatio: `${contact.photo.width} / ${contact.photo.height}` }}>
            <Photo src={contact.photo.src} alt={contact.photo.alt} fill priority sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
          </figure>
          <ul className="mt-6 space-y-3">
            {contact.offers.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Glyph name="check" className="size-4 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <ContactDetails site={site} />
          <p className="mt-2 text-small text-muted">{contact.replyNote}</p>
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-h3 text-ink">{contact.nextTitle}</h2>
            <ol className="c-timeline mt-5" data-reveal-stagger>
              {contact.nextSteps.map((step, index) => (
                <li key={step.title} className="c-timeline-item" data-reveal-child>
                  <span className="c-timeline-badge" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="border-t border-line pt-6">
            <ContactForm defaultNeed={defaultNeed} copy={contact.form} />
          </div>
        </div>
      </Container>
    </section>
  );
}
