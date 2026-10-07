import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { WorkflowDiagram } from "@/components/ui/workflow";
import { siteConfig } from "@/content/site";
import { getPosts, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Technology Insights",
  description: `How ${siteConfig.name} thinks about React, Python, AI, APIs, cloud, databases, automation and DevOps when building business systems.`,
  path: "/insights",
});

const topics = [
  {
    title: "React",
    body: "Interfaces for staff and customers. Server-rendered pages for marketing and portals, client components only where a person filters, selects or submits.",
  },
  {
    title: "Python",
    body: "A practical place for workflow services, data jobs and model calls that should not live inside the web request.",
  },
  {
    title: "AI",
    body: "A model proposes. Your system decides. The agent is allowed a short list of actions and must write the outcome back to a record.",
  },
  {
    title: "APIs",
    body: "Each integration has an owner, a failure you can see, and a payload that matches the record — not a one-off script on someone’s laptop.",
  },
  {
    title: "Cloud",
    body: "Separate environments. A test must not write into live student, guest or customer data.",
  },
  {
    title: "Databases",
    body: "One description of a lead, booking or order. Views for each team. Reports read that record instead of last week’s export.",
  },
  {
    title: "Automation",
    body: "Start with a path you can draw. Exceptions stay visible. Hidden branches become a second inbox.",
  },
  {
    title: "DevOps",
    body: "A repeatable release, monitoring, backups and an explicit list of who can reach production.",
  },
];

const sample = `type BookingRequest = {
  guest: string;
  channel: "whatsapp" | "web" | "voice";
  partySize: number;
};

async function holdStay(input: BookingRequest, availability: string[]) {
  if (!availability.length) return { status: "handoff", reason: "nothing open" };
  return { status: "held", room: availability[0], notify: input.channel };
}`;

export default function InsightsPage() {
  const posts = getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Technology insights"
        title="How the systems are put together."
        description="Notes for people who will live with the software: where AI is allowed to act, how records stay shared, and what a release has to include."
      />
      <section className="section bg-canvas" aria-labelledby="architecture-heading">
        <Container>
          <h2 id="architecture-heading" className="text-h2 text-ink">
            A request, then a record
          </h2>
          <p className="text-body mt-3 max-w-[68ch] text-muted">
            Channels change. The record should not. A website form, a WhatsApp message and a phone call can all start the same booking, ticket or application.
          </p>
          <div className="mt-6">
            <WorkflowDiagram steps={["Channel", "API", "Business rules", "Database", "Notification"]} label="Request architecture" />
          </div>
        </Container>
      </section>
      <section className="section bg-surface" aria-labelledby="topics-heading">
        <Container>
          <h2 id="topics-heading" className="text-h2 text-ink">
            Topics
          </h2>
          <ul className="grid-12 stack">
            {topics.map((topic) => (
              <li key={topic.title} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <article className="h-full border-t border-navy pt-4">
                  <h3 className="text-h3 text-ink">{topic.title}</h3>
                  <p className="text-small mt-2 text-muted">{topic.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="section bg-canvas" aria-labelledby="practice-heading">
        <Container className="grid-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="practice-heading" className="text-h2 text-ink">
              An action with a limit
            </h2>
            <p className="text-body mt-3 text-muted">
              This is the shape of a booking step, not a product you can copy into production. If nothing is open, the path hands the request to a person instead of inventing a room.
            </p>
          </div>
          <pre className="col-span-12 overflow-x-auto rounded-xl border border-white/10 bg-navy p-4 text-sm leading-relaxed text-white lg:col-span-7">
            <code>{sample}</code>
          </pre>
        </Container>
      </section>
      {posts.length > 0 ? (
        <section className="section bg-surface" aria-labelledby="notes-heading">
          <Container>
            <h2 id="notes-heading" className="text-h2 text-ink">
              From the journal
            </h2>
            <ul className="mt-6 grid gap-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card block">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {post.tags.map(tagLabel).join(" · ")}
                    </p>
                    <span className="text-h3 mt-2 block text-ink">{post.title}</span>
                    <span className="text-small mt-2 block text-muted">{post.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
