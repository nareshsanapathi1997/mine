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
  description: `Simple, practical articles from ${siteConfig.name} on AI assistants, WhatsApp automation and business software for Indian businesses.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Practical articles for business owners."
        description="Short, jargon-free reads on AI assistants, WhatsApp automation and software, with everyday examples from schools, hotels and small businesses."
      />
      <section className="section h-section">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
              <h2 className="text-h3 text-ink">Nothing published yet</h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
                When the first notes are ready, they will appear here.
              </p>
              <Button asChild arrow className="mt-6">
                <Link href="/contact">Talk to us</Link>
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
