import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/ui/photo";
import { publishedProjects } from "@/content/projects";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { projects } = await getCms();
  return createMetadata({ title: projects.metaTitle, description: projects.metaDescription, path: "/projects" });
}

export default async function ProjectsPage() {
  const { projects } = await getCms();
  const items = publishedProjects(projects.items);
  // No page until there is real work to show; the menu link is hidden too.
  if (items.length === 0) notFound();

  return (
    <>
      <PageHeader
        eyebrow={projects.header.eyebrow}
        title={projects.header.title}
        description={projects.header.description}
        photo={projects.header.photo}
      />
      <section className="section h-section" aria-label={projects.navLabel}>
        <Container>
          <ul className="grid gap-5 md:grid-cols-2" data-reveal-stagger suppressHydrationWarning>
            {items.map((project) => (
              <li key={project.slug} data-reveal-child>
                <Link href={`/projects/${project.slug}`} className="card d-link group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Photo
                      src={project.photo.src}
                      alt={project.photo.alt || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">
                      {[project.industry, project.location, project.year].filter(Boolean).join(" · ")}
                    </p>
                    <h2 className="text-h3 mt-2 text-ink">{project.title}</h2>
                    {project.client ? (
                      <p className="mt-1 text-sm text-muted">
                        {projects.clientLabel}: <span className="font-medium text-ink">{project.client}</span>
                      </p>
                    ) : null}
                    {project.summary ? <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p> : null}
                    <span className="text-link mt-auto pt-4">
                      {projects.moreLabel} <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand title={projects.cta.title} description={projects.cta.description} primaryLabel={projects.cta.primaryLabel} showWhatsapp />
    </>
  );
}
