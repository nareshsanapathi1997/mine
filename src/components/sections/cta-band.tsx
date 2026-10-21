import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getCms } from "@/lib/cms";

export async function CtaBand({
  title,
  description,
  primaryLabel,
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
  const { site, chrome, contact } = await getCms();
  const resolvedTitle = title ?? chrome.cta.defaultTitle;
  const resolvedDescription = description ?? chrome.cta.defaultDescription;
  const resolvedLabel = primaryLabel ?? chrome.cta.primaryLabel;

  return (
    <section className="section band-dark relative overflow-hidden" aria-labelledby="cta-heading">
      <Container className="relative z-[1] grid items-stretch gap-10 lg:grid-cols-12">
        <div className={showForm ? "flex flex-col lg:col-span-5" : "flex flex-col lg:col-span-7"}>
          <h2 id="cta-heading" className="text-h2 text-ink">
            {resolvedTitle}
          </h2>
          <p className="text-body mt-4 max-w-[38ch] text-muted">{resolvedDescription}</p>
          <div className={showForm ? "mt-8 flex flex-col gap-2.5 sm:flex-row lg:mt-auto lg:pt-10" : "mt-8 flex flex-col gap-2.5 sm:flex-row"}>
            <Button asChild size="lg" variant="quiet" arrow className="w-full sm:w-auto">
              <Link href={primaryHref}>{resolvedLabel}</Link>
            </Button>
            {showWhatsapp ? (
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <UiIcon name="message" className="size-4" />
                  {chrome.cta.whatsappLabel}
                </a>
              </Button>
            ) : showForm ? null : (
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <Link href="/solutions">
                  <UiIcon name="compass" className="size-4" />
                  {chrome.cta.exploreLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
        {showForm ? (
          <div className="system-board text-ink lg:col-span-7">
            <ContactForm compact copy={contact.form} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
