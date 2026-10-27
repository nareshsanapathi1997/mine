import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/ui/photo";
import { findProject, publishedProjects } from "@/content/projects";
import { getCms } from "@/lib/cms";
import { isHttpUrl } from "@/lib/security/urls";
import { createMetadata } from "@/lib/seo";

/** Projects published after a build render on first visit and are cached from then on. */
export async function generateStaticParams() {
  const { projects } = await getCms();
  return publishedProjects(projects.items).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getCms();
  const project = findProject(projects.items, slug);
  if (!project) return {};
  return createMetadata({
    title: project.client ? `${project.title} for ${project.client}` : project.title,
    description: project.summary || projects.metaDescription,
    path: `/projects/${project.slug}`,
  });
}

function List({ title, items, icon }: { title: string; items: string[]; icon: "check" | "minus" | "arrow" }) {
  const rows = items.filter((item) => item.trim());
  if (!rows.length) return null;
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
        {rows.map((item) => (
          <li key={item} className="flex gap-2.5">
            <UiIcon name={icon} className="mt-0.5 size-4 shrink-0 text-accent-ink" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getCms();
  const project = findProject(projects.items, slug);
  if (!project) notFound();

  const facts = [
    [projects.clientLabel, project.client],
    ["Industry", project.industry],
    ["Location", project.location],
    ["Year", project.year],
  ].filter(([, value]) => value.trim());
  const tech = project.tech.filter((item) => item.trim());
  const gallery = project.gallery.filter((photo) => photo.src);
  const others = publishedProjects(projects.items).filter((item) => item.slug !== project.slug).slice(0, 2);
  const link = isHttpUrl(project.link) ? project.link : "";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: projects.navLabel, href: "/projects" },
          { label: project.title, href: `/projects/${project.slug}` },
        ]}
      />
      <PageHeader
        eyebrow={project.industry || projects.header.eyebrow}
        title={project.title}
        description={project.summary}
        photo={{ ...project.photo, alt: project.photo.alt || project.title }}
      >
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-link mt-5">
            {projects.visitLabel} <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
          </a>
        ) : null}
      </PageHeader>

      <section className="section-tight h-section" aria-label="Project details">
        <Container className="grid gap-8">
          {facts.length ? (
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label} className="bg-surface p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</dt>
                  <dd className="mt-1 font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="grid gap-5 lg:grid-cols-3">
            <List title={projects.challengeLabel} items={project.challenge} icon="minus" />
            <List title={projects.builtLabel} items={project.built} icon="arrow" />
            <List title={projects.resultsLabel} items={project.results} icon="check" />
          </div>

          {tech.length ? (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{projects.techLabel}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tech.map((item) => <li key={item} className="chip">{item}</li>)}
              </ul>
            </div>
          ) : null}

          {gallery.length ? (
            <ul className="grid gap-4 sm:grid-cols-2" aria-label="Project photos">
              {gallery.map((photo) => (
                <li key={photo.src} className="photo-frame relative aspect-[16/10] overflow-hidden">
                  <Photo src={photo.src} alt={photo.alt || project.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </li>
              ))}
            </ul>
          ) : null}

          {others.length ? (
            <nav aria-label="More projects" className="border-t border-line pt-6">
              <h2 className="text-h3 text-ink">More projects</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/projects/${item.slug}`} className="card d-link block p-4">
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">{item.industry}</span>
                      <span className="mt-1 block font-semibold text-ink">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </Container>
      </section>

      <CtaBand title={projects.cta.title} description={projects.cta.description} primaryLabel={projects.cta.primaryLabel} showWhatsapp />
    </>
  );
}
