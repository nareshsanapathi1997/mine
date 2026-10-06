import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const steps = [
  {
    number: "01",
    title: "We review the brief",
    body: "Industry, budget and the workflow you want to change.",
  },
  {
    number: "02",
    title: "We reply in writing",
    body: "A fit, a question, or a suggested next conversation.",
  },
  {
    number: "03",
    title: "We scope before we build",
    body: "The first version is defined before any delivery starts.",
  },
];

const value =
  "Tell us the operation you want to change, the industry, and a budget range. We reply in writing with whether it is a fit and what a first version would cover.";

export function ContactSection({
  defaultNeed = "",
  showHeading = true,
}: {
  defaultNeed?: string;
  showHeading?: boolean;
}) {
  return (
    <section id="contact" className="section scroll-mt-28 bg-canvas" aria-labelledby={showHeading ? "contact-heading" : "contact-next"}>
      <Container className="grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          {showHeading ? (
            <SectionHeading id="contact-heading" eyebrow="Contact" title="Talk to an expert." description={value} />
          ) : (
            <p className="text-body measure text-ink">{value}</p>
          )}

          <h2 id="contact-next" className="text-h3 cluster-lg text-ink">
            What happens next
          </h2>
          <ol className="mt-4">
            {steps.map((step) => (
              <li key={step.number} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-t border-line py-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent-ink">
                  {step.number}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{step.title}</span>
                  <span className="mt-1 block text-small text-muted">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="text-h3 cluster-lg text-ink">Direct contact</h2>
          <ContactDetails />
          <p className="mt-4 text-small text-muted">
            Replies go to the email address you enter. There is no published response window.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="lift-card spot p-5 sm:p-8">
            <ContactForm defaultNeed={defaultNeed} />
          </div>
        </div>
      </Container>
    </section>
  );
}
