import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function CtaBand({
  title = "Have a workflow you want to improve?",
  description = "Tell us how the work happens today. We will reply with whether it is a fit and what a first version would cover.",
  primaryLabel = "Talk to an Expert",
  primaryHref = "/contact",
  showWhatsapp = false,
  showForm = false,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showWhatsapp?: boolean;
  showForm?: boolean;
}) {
  return (
    <section className="band-dark relative overflow-hidden text-white" aria-labelledby="cta-heading">
      <Container className="section relative z-[1] grid items-start gap-12 lg:grid-cols-12">
        <div className={showForm ? "lg:col-span-6" : "lg:col-span-7"}>
          <h2 id="cta-heading" className="text-h2 max-w-[16ch] uppercase text-white">
            {title}
          </h2>
          <p className="text-body mt-5 max-w-[42ch] text-mist">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="quiet" arrow className="w-full sm:w-auto">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            {showWhatsapp ? (
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            ) : showForm ? null : (
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
            )}
          </div>
        </div>
        {showForm ? (
          <div className="rounded-2xl border border-white/10 bg-canvas/80 p-5 text-ink backdrop-blur-md sm:p-7 lg:col-span-6">
            <ContactForm compact />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
