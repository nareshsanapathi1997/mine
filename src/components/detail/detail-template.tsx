import Link from "next/link";
import { IndustryArt, hasIndustryArt } from "@/components/art/industry-art";
import { HomeFaq } from "@/components/home/faq";
import { HomeSampleFlow } from "@/components/home/sample-flow";
import { UiIcon } from "@/components/icons";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { DetailPage } from "@/content/details";
import { getCms, relatedDetailLinks } from "@/lib/cms";
import { faqJsonLd } from "@/lib/structured-data";

export async function DetailTemplate({
  page,
  crumbs,
  jsonLd,
  extraLinks,
}: {
  page: DetailPage;
  crumbs: Crumb[];
  jsonLd: unknown;
  extraLinks?: { title: string; links: { href: string; title: string; description: string }[] };
}) {
  const { site, chrome, details } = await getCms();
  const related = relatedDetailLinks(details, page.related);
  const ui = chrome.detail;
  const eyebrow = page.kind === "solution" ? "Solution" : page.parent ? page.parent.name : "Industry";

  return (
    <>
      <JsonLd data={jsonLd} />
      {page.faqs.length ? <JsonLd data={faqJsonLd(page.faqs)} /> : null}
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow={eyebrow} title={page.heading} description={page.intro} photo={page.photo} points={page.forWho}
        art={page.kind === "industry" && hasIndustryArt(page.slug) ? <span className="ia-badge"><IndustryArt slug={page.slug} /></span> : undefined}
      >
        <Button asChild size="lg" arrow className="w-full sm:w-auto">
          <Link href={`/contact?need=${encodeURIComponent(page.name)}` as "/contact"}>{ui.talkLabel}</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
            <UiIcon name="message" className="size-4" />
            {ui.whatsappLabel}
          </a>
        </Button>
      </PageHeader>

      <section className="section h-section" aria-labelledby="d-problems">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">{ui.problems.eyebrow}</p>
              <h2 id="d-problems" className="text-h2 mt-3 text-ink">{ui.problems.title}</h2>
            </div>
            <p className="text-body text-muted">{ui.problems.intro}</p>
          </div>
          <ul className="stack grid gap-3 md:grid-cols-3" data-reveal-stagger>
            {page.problems.map((item, index) => (
              <li key={item.problem} className="card h-problem" data-reveal-child>
                <span className="h-step-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-base font-semibold leading-snug text-ink">{item.problem}</p>
                <p className="h-fix mt-4 text-sm leading-relaxed text-muted">
                  <span className="h-fix-label">
                    <UiIcon name="arrow" className="size-3.5" />
                    {ui.fixLabel}
                  </span>
                  {item.fix}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section h-section h-band-soft" aria-labelledby="d-build">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">{ui.builds.eyebrow}</p>
              <h2 id="d-build" className="text-h2 mt-3 text-ink">{ui.builds.title}</h2>
            </div>
            <p className="text-body text-muted">{ui.builds.intro}</p>
          </div>
          <ul className="stack grid gap-3 sm:grid-cols-2" data-reveal-stagger>
            {page.builds.map((item) => (
              <li key={item.title} className="card d-build" data-reveal-child>
                <span className="icon-chip icon-chip-sm shrink-0">
                  <UiIcon name="check" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <HomeSampleFlow
        flows={[{ id: page.slug, label: page.name, ...page.sample }]}
        eyebrow={ui.sampleEyebrow}
        title={page.sample.title}
        intro={ui.sampleIntro}
        moreHref="/case-studies"
      />

      {extraLinks?.links.length ? (
        <section className="section-tight h-section" aria-labelledby="d-more">
          <Container>
            <h2 id="d-more" className="text-h3 text-ink">{extraLinks.title}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extraLinks.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href as "/"} className="card d-link group flex h-full flex-col">
                    <span className="font-semibold text-ink">{link.title}</span>
                    <span className="mt-1.5 line-clamp-2 text-sm text-muted">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <HomeFaq items={page.faqs} title={ui.faqTitle} />

      {related.length ? (
        <section className="section-tight h-section border-t border-line" aria-labelledby="d-related">
          <Container>
            <h2 id="d-related" className="text-h3 text-ink">{ui.relatedTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href as "/"} className="card d-link group flex h-full flex-col">
                    <span className="flex items-center gap-2.5 font-semibold text-ink">
                      <span className="icon-chip icon-chip-sm"><UiIcon name={link.icon} /></span>
                      {link.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-sm text-muted">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand title={page.cta.title} description={page.cta.description} primaryLabel={ui.talkLabel} primaryHref={`/contact?need=${encodeURIComponent(page.name)}`} showWhatsapp />
    </>
  );
}
