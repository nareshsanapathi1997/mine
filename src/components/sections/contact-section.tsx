import { Check } from "lucide-react";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";

const offers = ["AI & Automation", "Business Software", "Web & Mobile", "Cloud & DevOps"];

export function ContactSection({ defaultNeed = "" }: { defaultNeed?: string }) {
  return (
    <section id="contact" className="section scroll-mt-28 bg-canvas">
      <Container className="grid-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="text-h1 text-ink">Let&apos;s build something useful.</h1>
          <p className="text-body mt-3 text-muted">Tell us about the workflow you want to improve.</p>
          <ul className="mt-6 space-y-3">
            {offers.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Check className="size-4 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ContactDetails />
          <p className="mt-2 text-small text-muted">Replies go to the work email you enter.</p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-8">
            <ContactForm defaultNeed={defaultNeed} />
          </div>
        </div>
      </Container>
    </section>
  );
}
