import { CtaBand } from "@/components/sections/cta-band";
import { CaseStudies } from "@/components/sections/case-studies";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Case Studies",
  description: `Placeholder examples of education, hospitality and manufacturing systems from ${siteConfig.name}. Replace them with verified engagements.`,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Built for real business problems."
        description="These placeholders show the shape of a future case study. They are not verified client engagements, and they do not include invented performance figures."
      />
      <CaseStudies
        withAnchors
        heading="Replace these with verified work."
        intro="Each card is marked as a placeholder so it can be swapped for a real engagement without changing the layout."
      />
      <CtaBand />
    </>
  );
}
