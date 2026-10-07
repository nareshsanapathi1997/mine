import Link from "next/link";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: `Notes from ${siteConfig.name} on AI that does real work, business systems, and the tools a team already uses.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on systems, AI and operations."
        description="Practical writing on agents that take action, industry operations, and connecting the tools a team already uses."
      />
      <section className="section bg-canvas">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
              <h2 className="text-h3 text-ink">Nothing published yet</h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
                When the first notes are ready, they will appear here.
              </p>
              <Button asChild arrow className="mt-6">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          ) : (
            <BlogBrowser posts={posts} />
          )}
        </Container>
      </section>
    </>
  );
}
