import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionPhotoFrame } from "@/components/ui/section-photo";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { about } = await getCms();
  return createMetadata({
    title: about.metaTitle,
    description: about.metaDescription,
    path: "/about",
  });
}

export default async function AboutPage() {
  const { about, site, details } = await getCms();
  const sectors = details.filter((page) => page.kind === "industry" && !page.parent);

  return (
    <>
      <PageHeader
        eyebrow={about.header.eyebrow}
        title={about.header.title}
        description={about.header.description}
        photo={about.header.photo}
      />

      <section className="section h-section" aria-labelledby="story-heading">
        <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{about.story.eyebrow}</p>
            <h2 id="story-heading" className="text-h2 mt-3 text-ink">{about.story.title}</h2>
            <div className="text-body cluster space-y-4 text-muted">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionPhotoFrame photo={about.story.photo} />
          </div>
        </Container>
      </section>

      <section className="section h-section h-band-soft" aria-labelledby="beliefs-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">{about.beliefs.eyebrow}</p>
              <h2 id="beliefs-heading" className="text-h2 mt-3 text-ink">{about.beliefs.title}</h2>
            </div>
            <p className="text-body text-muted">{about.beliefs.intro}</p>
          </div>
          <ul className="stack grid gap-3 sm:grid-cols-2" data-reveal-stagger>
            {about.beliefs.items.map((item, index) => (
              <li key={item.title} className="card h-problem" data-reveal-child>
                <span className="h-step-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {about.team.show ? (
      <section className="section h-section" aria-labelledby="team-heading">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">{about.team.eyebrow}</p>
            <h2 id="team-heading" className="text-h2 mt-3 text-ink">{about.team.title}</h2>
            <div className="mt-5">
              <SectionPhotoFrame photo={about.team.photo} sizes="(max-width: 1024px) 100vw, 420px" />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.team.people.map((person) => (
                <li key={person.name} className="card flex items-center gap-3 p-4">
                  <span className="icon-chip icon-chip-sm"><UiIcon name="user" /></span>
                  <span>
                    <span className="block font-semibold text-ink">{person.name}</span>
                    <span className="block text-sm text-accent-ink">{person.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-h3 text-ink">{about.team.expectTitle}</h3>
            <ul className="mt-4 space-y-3" data-reveal-stagger>
              {about.team.promises.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink" data-reveal-child>
                  <UiIcon name="check" className="mt-1 size-4 shrink-0 text-accent-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body mt-6 text-muted">
              {about.team.contactLead} Call <a className="text-link" href={site.phoneHref}>{site.phoneDisplay}</a>, email{" "}
              <a className="text-link break-all" href={`mailto:${site.email}`}>{site.email}</a>
              {" "}or support at{" "}
              <a className="text-link break-all" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
            </p>
          </div>
        </Container>
      </section>
      ) : null}

      <section className="section-tight h-section border-t border-line" aria-labelledby="sectors-heading">
        <Container>
          <h2 id="sectors-heading" className="text-h3 text-ink">{about.sectorsTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sectors.map((page) => (
              <li key={page.slug}>
                <Link href={`/industries/${page.slug}` as "/"} className="chip chip-link">{page.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={about.cta.title} description={about.cta.description} primaryLabel={about.cta.primaryLabel} showWhatsapp />
    </>
  );
}
