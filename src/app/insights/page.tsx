import Link from "next/link";
import { HomeFaq } from "@/components/home/faq";
import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { newImages } from "@/content/new-images";
import { getPosts, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Safety and quality",
  description: "How we keep your data safe, test software before it goes live, and look after it afterwards, in plain English.",
  path: "/insights",
});

const stages: { icon: UiIconName; title: string; points: string[] }[] = [
  {
    icon: "shield",
    title: "While we build",
    points: [
      "We test on sample data, never on your live student, guest or customer records.",
      "Each person on your team gets a role, so a teacher does not see fee reports and a receptionist does not see salaries.",
      "AI assistants are given a short list of things they may do, and nothing more.",
    ],
  },
  {
    icon: "check",
    title: "Before going live",
    points: [
      "Your team tries the software with real tasks and tells us what is confusing.",
      "We test the assistant with the actual questions your customers ask.",
      "We agree on what should happen when something fails, and who gets told.",
    ],
  },
  {
    icon: "cloud",
    title: "After launch",
    points: [
      "Regular backups, with a way to restore data if something is deleted by mistake.",
      "We watch for errors and slow pages, and fix them.",
      "Security updates are applied, and changes are tracked so they can be undone.",
    ],
  },
];

const checklist = [
  "Who will own the code and the data?",
  "Where will our data be stored, and who can see it?",
  "What happens if your team is not available?",
  "How do we get our data out if we stop using the software?",
  "What will the AI do when it does not know an answer?",
  "What are the monthly costs after launch?",
];

const faqs = [
  { q: "Do you follow Indian data protection law?", a: "We design software with the Digital Personal Data Protection Act, 2023 in mind: collect only what is needed, limit who can see it, and delete it when it is no longer needed." },
  { q: "Who owns the software you build?", a: "You do. Ownership of the code and data is written into our agreement." },
  { q: "Can we see what the AI assistant said to customers?", a: "Yes. Every conversation is saved so your team can review it." },
];

export default function InsightsPage() {
  const posts = getPosts();
  return (
    <>
      <PageHeader
        eyebrow="Safety and quality"
        title="How we keep your software safe and working."
        description="You are trusting us with your students', guests' or customers' details. Here is what we do at each stage, in plain words."
        photo={newImages["cloud-devops"]}
      />

      <section className="section h-section" aria-labelledby="stages-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">Our practice</p>
              <h2 id="stages-heading" className="text-h2 mt-3 text-ink">Safety at every stage</h2>
            </div>
            <p className="text-body text-muted">From the first line of code to years after launch.</p>
          </div>
          <ol className="stack grid gap-3 lg:grid-cols-3" data-reveal-stagger>
            {stages.map((stage, index) => (
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
            <p className="eyebrow">Checklist</p>
            <h2 id="checklist-heading" className="text-h2 mt-3 text-ink">Six questions to ask any software company</h2>
            <p className="text-body mt-4 text-muted">Ask us these too. A good partner should answer each one clearly before you sign anything.</p>
          </div>
          <ol className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7" data-reveal-stagger>
            {checklist.map((item, index) => (
              <li key={item} className="panel flex items-start gap-3 rounded-xl p-4 text-sm font-medium text-ink" data-reveal-child>
                <span className="h-step-num shrink-0" aria-hidden="true">{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <HomeFaq items={faqs} title="Questions about safety" />

      {posts.length > 0 ? (
        <section className="section-tight h-section border-t border-line" aria-labelledby="notes-heading">
          <Container>
            <h2 id="notes-heading" className="text-h3 text-ink">Read more on our blog</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card d-link block h-full">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{post.tags.map(tagLabel).join(" · ")}</p>
                    <span className="mt-2 block font-semibold text-ink">{post.title}</span>
                    <span className="mt-2 line-clamp-2 block text-sm text-muted">{post.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand title="Have a question about safety?" description="Ask us anything about how your data would be handled. We are happy to explain." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
