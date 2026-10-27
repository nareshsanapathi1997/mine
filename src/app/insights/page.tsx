import Link from "next/link";
import { HomeFaq } from "@/components/home/faq";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getCms } from "@/lib/cms";
import { getPosts, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { insights } = await getCms();
  return createMetadata({
    title: insights.metaTitle,
    description: insights.metaDescription,
    path: "/insights",
  });
}

export default async function InsightsPage() {
  const { insights } = await getCms();
  const posts = getPosts();
  return (
    <>
      <PageHeader
        eyebrow={insights.header.eyebrow}
        title={insights.header.title}
        description={insights.header.description}
        photo={insights.header.photo}
      />

      <section className="section h-section" aria-labelledby="stages-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">{insights.stages.eyebrow}</p>
              <h2 id="stages-heading" className="text-h2 mt-3 text-ink">{insights.stages.title}</h2>
            </div>
            <p className="text-body text-muted">{insights.stages.intro}</p>
          </div>
          <ol className="stack grid gap-3 lg:grid-cols-3" data-reveal-stagger suppressHydrationWarning>
            {insights.stages.items.map((stage, index) => (
              <li key={stage.title} className="card" data-reveal-child>
                <div className="flex items-center gap-3">
                  <span className="icon-chip"><UiIcon name={stage.icon} /></span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">Stage {index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{stage.title}</h3>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
                  {stage.points.map((point) => (
                    <li key={point} className="flex gap-2"><UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section h-section band-dark" aria-labelledby="checklist-heading">
        <Container className="relative z-[1] grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{insights.checklist.eyebrow}</p>
            <h2 id="checklist-heading" className="text-h2 mt-3 text-ink">{insights.checklist.title}</h2>
            <p className="text-body mt-4 text-muted">{insights.checklist.intro}</p>
          </div>
          <ol className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7" data-reveal-stagger suppressHydrationWarning>
            {insights.checklist.items.map((item, index) => (
              <li key={item} className="panel flex items-start gap-3 rounded-xl p-4 text-sm font-medium text-ink" data-reveal-child>
                <span className="h-step-num shrink-0" aria-hidden="true">{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <HomeFaq items={insights.faqs} title={insights.faqTitle} />

      {posts.length > 0 ? (
        <section className="section-tight h-section border-t border-line" aria-labelledby="notes-heading">
          <Container>
            <h2 id="notes-heading" className="text-h3 text-ink">{insights.notesTitle}</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card d-link block h-full">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{post.tags.map(tagLabel).join(" · ")}</p>
                    <span className="mt-2 block font-semibold text-ink">{post.title}</span>
                    <span className="mt-2 line-clamp-2 block text-sm text-muted">{post.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand title={insights.cta.title} description={insights.cta.description} primaryLabel={insights.cta.primaryLabel} showWhatsapp />
    </>
  );
}
