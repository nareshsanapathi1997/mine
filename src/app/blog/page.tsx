import Link from "next/link";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { getCms } from "@/lib/cms";
import { getPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { blog } = await getCms();
  return createMetadata({
    title: blog.metaTitle,
    description: blog.metaDescription,
    path: "/blog",
  });
}

export default async function BlogPage() {
  const { blog } = await getCms();
  const posts = getPosts();

  return (
    <>
      <PageHeader
        eyebrow={blog.header.eyebrow}
        title={blog.header.title}
        description={blog.header.description}
        photo={blog.header.photo}
      />
      <section className="section h-section">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
              <h2 className="text-h3 text-ink">{blog.emptyTitle}</h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
                {blog.emptyBody}
              </p>
              <Button asChild arrow className="mt-6">
                <Link href="/contact">{blog.ctaLabel}</Link>
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
