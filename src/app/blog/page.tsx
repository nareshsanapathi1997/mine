import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { formatPostDate, getPosts, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: `Notes from ${siteConfig.name} on AI that does real work, education operations and connecting the tools a business already uses.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on technology, AI and operations."
        description="Practical writing on agents that take action, education operations, and connecting the tools a team already uses. No invented results."
      />
      <section className="section bg-canvas">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
              <h2 className="text-h3 text-ink">Nothing published yet</h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
                When the first notes are ready, they will appear here. Until then, tell us what you are trying to improve.
              </p>
              <Button asChild arrow className="mt-6">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          ) : (
            <ul className="post-list grid gap-[var(--gutter)]" data-reveal-stagger>
              {posts.map((post) => (
                <li key={post.slug} data-reveal-child>
                  <article className="card card-accent">
                    <p className="text-small text-muted">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden="true"> · </span>
                      {post.readingMinutes} min read
                    </p>
                    <h2 className="text-h3 mt-2 text-ink">
                      <Link href={`/blog/${post.slug}`} className="link-underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-body mt-3 max-w-[68ch] text-muted">{post.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <Link href={`/blog/tag/${tag}`} className="chip chip-link">
                            {tagLabel(tag)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
