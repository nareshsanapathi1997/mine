import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/content/site";
import { formatPostDate, getPostsByTag, getTags, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = tagLabel(tag);
  return createMetadata({
    title: `${label} articles`,
    description: `Notes from ${siteConfig.name} tagged ${label}.`,
    path: `/blog/tag/${tag}`,
  });
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  if (!getTags().includes(tag)) notFound();
  const posts = getPostsByTag(tag);
  const label = tagLabel(tag);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={`${label} articles`}
        description={`Notes tagged ${label}. Each one is a working description of a problem, not a claim about a measured result.`}
      />
      <section className="section bg-canvas">
        <Container>
          <ul className="grid gap-[var(--gutter)]" data-reveal-stagger>
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
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
