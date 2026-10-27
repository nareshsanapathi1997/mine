import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionPhotoFrame } from "@/components/ui/section-photo";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { hasLocalPhoto } from "@/lib/photo-files";
import { Photo } from "@/components/ui/photo";
import { isHttpUrl } from "@/lib/security/urls";

/** "Naresh Sanapathi" -> "NS", shown until a team photo is uploaded. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

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
          <ul className="stack grid gap-3 sm:grid-cols-2" data-reveal-stagger suppressHydrationWarning>
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
            {/* Shown only once a real team photo file exists (see photos/README.md). */}
            {hasLocalPhoto(about.team.photo?.src) ? (
              <div className="mt-5">
                <SectionPhotoFrame photo={about.team.photo} sizes="(max-width: 1024px) 100vw, 420px" />
              </div>
            ) : null}
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.team.people.filter((person) => person.name.trim()).map((person) => (
                <li key={person.name} className="card flex items-start gap-4 p-4">
                  {person.photo.src && hasLocalPhoto(person.photo.src) ? (
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line">
                      <Photo src={person.photo.src} alt={person.photo.alt || person.name} fill sizes="64px" className="object-cover" />
                    </span>
                  ) : (
                    <span
                      className="grid size-16 shrink-0 place-items-center rounded-full bg-accent-soft text-lg font-semibold text-accent-ink"
                      aria-hidden="true"
                    >
                      {initials(person.name)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{person.name}</span>
                    {person.role ? <span className="block text-sm text-accent-ink">{person.role}</span> : null}
                    {person.bio ? <span className="mt-2 block text-sm leading-relaxed text-muted">{person.bio}</span> : null}
                    {isHttpUrl(person.linkedin) ? (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-link mt-2 text-sm">
                        LinkedIn <span className="sr-only">profile of {person.name}</span>
                      </a>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-h3 text-ink">{about.team.expectTitle}</h3>
            <ul className="mt-4 space-y-3" data-reveal-stagger suppressHydrationWarning>
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
