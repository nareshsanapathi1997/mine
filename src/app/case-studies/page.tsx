import { CtaBand } from "@/components/sections/cta-band";
import { CaseStudies } from "@/components/sections/case-studies";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Case Studies",
  description: `Solution patterns from ${siteConfig.name} for education, hospitality and manufacturing. These are not verified client results.`,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Solution in practice."
        description="Each example shows a problem, the existing workflow, and the system we would build. They are not verified client engagements and they do not include invented statistics."
      />
      <CaseStudies heading="Patterns, not claimed results." intro="Replace these with verified engagements when a client agrees to be named." detailed />
      <CtaBand title="Have a workflow like one of these?" />
    </>
  );
}
