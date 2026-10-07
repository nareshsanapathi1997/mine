import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function CtaBand({
  title = "Have a workflow you want to improve?",
  description = "Tell us how the work happens today. We will reply with whether it is a fit and what a first version would cover.",
  primaryLabel = "Talk to an Expert",
  primaryHref = "/contact",
  showWhatsapp = false,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showWhatsapp?: boolean;
}) {
  return (
    <section className="band-dark relative text-white" aria-labelledby="cta-heading">
      <Container className="section relative z-[1] lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent-glow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Start a project
          </p>
          <h2 id="cta-heading" className="text-h2 cluster max-w-[18ch] text-balance text-white">
            {title}
          </h2>
          <p className="text-body cluster max-w-[62ch] text-mist">{description}</p>
        </div>
        <div className="cluster-lg flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:mt-0 lg:justify-end">
          <Button asChild size="lg" variant="quiet" arrow className="w-full sm:w-auto">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {showWhatsapp ? (
            <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
              <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
              <Link href="/solutions">Explore Solutions</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
