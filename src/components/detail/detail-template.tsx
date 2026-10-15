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
import { detailLinks, type DetailPage } from "@/content/details";
import { siteConfig } from "@/content/site";

export function DetailTemplate({
  page,
  crumbs,
  jsonLd,
  extraLinks,
}: {
  page: DetailPage;
  crumbs: Crumb[];
  jsonLd: unknown;
  /** Extra links, such as sub-pages of an industry. */
  extraLinks?: { title: string; links: { href: string; title: string; description: string }[] };
}) {
  const related = detailLinks("solution", page.related);
  const eyebrow = page.kind === "solution" ? "Solution" : page.parent ? page.parent.name : "Industry";

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow={eyebrow} title={page.heading} description={page.intro} photo={page.photo} points={page.forWho}
        art={page.kind === "industry" && hasIndustryArt(page.slug) ? <span className="ia-badge"><IndustryArt slug={page.slug} /></span> : undefined}
      >
        <Button asChild size="lg" arrow className="w-full sm:w-auto">
          <Link href={`/contact?need=${encodeURIComponent(page.name)}` as "/contact"}>Talk to us</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
          <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
            <UiIcon name="message" className="size-4" />
            WhatsApp us
          </a>
        </Button>
      </PageHeader>

      <section className="section h-section" aria-labelledby="d-problems">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">Problems we fix</p>
              <h2 id="d-problems" className="text-h2 mt-3 text-ink">Sound familiar?</h2>
            </div>
            <p className="text-body text-muted">Three common problems we hear, and what changes once the right software is in place.</p>
          </div>
          <ul className="stack grid gap-3 md:grid-cols-3" data-reveal-stagger>
            {page.problems.map((item, index) => (
              <li key={item.problem} className="card h-problem" data-reveal-child>
                <span className="h-step-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-base font-semibold leading-snug text-ink">{item.problem}</p>
                <p className="h-fix mt-4 text-sm leading-relaxed text-muted">
                  <span className="h-fix-label">
                    <UiIcon name="arrow" className="size-3.5" />
                    What changes
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
              <p className="eyebrow">What we build</p>
              <h2 id="d-build" className="text-h2 mt-3 text-ink">What we can build for you</h2>
            </div>
            <p className="text-body text-muted">Start with the one that saves the most time. The rest can be added later.</p>
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
        eyebrow="Sample walkthrough"
        title={page.sample.title}
        intro="An example of how this could work, step by step. It is an illustration, not a client result."
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

      <HomeFaq items={page.faqs} title="Questions people ask" />

      {related.length ? (
        <section className="section-tight h-section border-t border-line" aria-labelledby="d-related">
          <Container>
            <h2 id="d-related" className="text-h3 text-ink">Often used together</h2>
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

      <CtaBand title={page.cta.title} description={page.cta.description} primaryLabel="Talk to us" primaryHref={`/contact?need=${encodeURIComponent(page.name)}`} showWhatsapp />
    </>
  );
}
