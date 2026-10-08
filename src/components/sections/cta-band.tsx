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
      <Container className="relative z-[1] grid items-start gap-8 px-5 py-10 lg:grid-cols-12 lg:py-12">
        <div className={showForm ? "lg:col-span-6" : "lg:col-span-7"}>
          <h2 id="cta-heading" className="text-h2 text-white">
            {title}
          </h2>
          <p className="text-body mt-3 text-mist">{description}</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
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
          <div className="system-board text-ink lg:col-span-6">
            <ContactForm compact />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
