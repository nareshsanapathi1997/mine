import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeFaq } from "@/content/home-page";

export function HomeFaq({
  items = homeFaq,
  title = "Common questions",
}: { items?: { q: string; a: string }[]; title?: string } = {}) {
  return (
    <section className="section h-section" aria-labelledby="faq-heading">
      <Container className="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="text-h2 mt-3 text-ink">
            {title}
          </h2>
          <p className="text-body cluster text-muted">Did not find your answer? Call or WhatsApp us, we are happy to explain.</p>
        </div>
        <div className="h-faq lg:col-span-8">
          {items.map((item) => (
            <details key={item.q} className="faq-item group border-b border-line px-5 last:border-b-0 sm:px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="icon-chip icon-chip-sm shrink-0 text-accent-ink transition-transform group-open:rotate-45">
                  <UiIcon name="plus" />
                </span>
              </summary>
              <p className="max-w-[68ch] pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
