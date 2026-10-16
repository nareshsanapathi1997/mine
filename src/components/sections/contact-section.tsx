import { Glyph } from "@/components/icons";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Photo } from "@/components/ui/photo";
import { Container } from "@/components/layout/container";
import { newImages } from "@/content/new-images";

const offers = ["Websites and apps", "Business software", "WhatsApp and AI", "Hosting and support"];

const nextSteps = [
  {
    title: "We read your message",
    body: "We read every message ourselves. If something is unclear, we ask a question or two by email or WhatsApp.",
  },
  {
    title: "A short call",
    body: "You tell us how the work happens today and where it gets stuck. We listen and ask simple questions.",
  },
  {
    title: "A simple written plan",
    body: "You get a plain-English plan for the first version and a cost estimate. No obligation to go ahead.",
  },
];

export function ContactSection({ defaultNeed = "" }: { defaultNeed?: string }) {
  return (
    <section id="contact" className="hero-stage relative scroll-mt-28 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-glow" aria-hidden="true" />
      <Container className="section relative grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Contact
          </p>
          <h1 className="text-h1 cluster text-ink">Tell us what you need.</h1>
          <p className="text-body mt-3 text-muted">
            For example: admission enquiries, hotel bookings, an order sheet or a busy reception phone. Only your name, email, need and a short note are required.
          </p>
          <figure className="photo-frame relative mt-6" style={{ aspectRatio: `${newImages.contact.width} / ${newImages.contact.height}` }}>
            <Photo src={newImages.contact.src} alt={newImages.contact.alt} fill priority sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
          </figure>
          <ul className="mt-6 space-y-3">
            {offers.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Glyph name="check" className="size-4 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <ContactDetails />
          <p className="mt-2 text-small text-muted">We reply to the email you enter.</p>
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-h3 text-ink">What happens next</h2>
            <ol className="c-timeline mt-5" data-reveal-stagger>
              {nextSteps.map((step, index) => (
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
            <ContactForm defaultNeed={defaultNeed} />
          </div>
        </div>
      </Container>
    </section>
  );
}
