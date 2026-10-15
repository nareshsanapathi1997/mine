import { DetailCard } from "@/components/detail/detail-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getDetail } from "@/content/details";
import { solutionGroups } from "@/content/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Solutions",
  description: "Websites, mobile apps, business software, AI assistants, WhatsApp automation and hosting, explained in plain English.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="What we build, in plain words."
        description="Pick the problem you want to solve. Each page explains what we build, shows a sample of how it works and answers common questions."
        photo={{ src: "/images/solution-business-software.webp", alt: "An operations desk facing a monitor of bar charts" }}
      />
      {solutionGroups.map((group, index) => (
        <section key={group.id} className={index % 2 ? "section h-section h-band-soft" : "section h-section"} aria-labelledby={`g-${group.id}`}>
          <Container>
            <div className="home-head">
              <div>
                <p className="eyebrow">Group {index + 1}</p>
                <h2 id={`g-${group.id}`} className="text-h2 mt-3 text-ink">{group.title}</h2>
              </div>
              <p className="text-body text-muted">{group.description}</p>
            </div>
            <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
              {group.slugs.map((slug) => {
                const page = getDetail("solution", slug);
                return page ? <DetailCard key={slug} page={page} /> : null;
              })}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand title="Not sure which one you need?" description="Tell us the problem in your own words. We will tell you what fits, even if it is something small." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
