import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { EducationDashboard } from "@/components/sections/education-dashboard";
import { Button } from "@/components/ui/button";
import { educationCapabilities } from "@/content/home";

export function Education() {
  return (
    <section id="education" className="section scroll-mt-28 bg-surface" aria-labelledby="education-heading">
      <Container className="grid-12 items-center">
        <div className="col-span-12 lg:col-span-5" data-reveal>
          <SectionHeading
            id="education-heading"
            eyebrow="Education"
            title="Transform the way your institution works."
            description="Admissions, students, fees, attendance and parent communication can live in one platform, with an assistant that answers from your own records."
          />
          <ul className="cluster-lg grid grid-cols-1 gap-2 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
            {educationCapabilities.map((item) => (
              <li key={item} className="rounded-lg border border-line bg-canvas px-3 py-2.5 text-small font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" arrow className="cluster-lg">
            <Link href="/contact?need=Education+platform">Build an Education Platform</Link>
          </Button>
        </div>
        <div className="col-span-12 lg:col-span-7" data-reveal>
          <EducationDashboard />
        </div>
      </Container>
    </section>
  );
}
