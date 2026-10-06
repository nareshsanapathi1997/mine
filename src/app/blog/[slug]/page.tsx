import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { TextLink } from "@/components/ui/text-link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, getPost, getPosts, tagLabel } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getPosts().filter((item) => item.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <header className="band-dark relative overflow-hidden text-white">
        <div className="band-grid" aria-hidden="true" />
        <Container className="section-tight relative z-[1] max-w-3xl">
          <p className="text-small text-mist">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
            <span aria-hidden="true"> · </span>
            {post.author}
          </p>
          <h1 className="text-h1 cluster text-balance text-white">{post.title}</h1>
          <p className="text-body cluster text-mist">{post.description}</p>
          <ul className="cluster flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog/tag/${tag}`} className="chip chip-on-dark chip-link">
                  {tagLabel(tag)}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </header>
      <article className="section bg-surface">
        <Container className="max-w-3xl">
          <div className="card card-accent">
            <ArticleBody source={post.content} />
          </div>
        </Container>
      </article>
      {others.length > 0 ? (
        <section className="section border-t border-line bg-surface" aria-labelledby="more-notes">
          <Container className="max-w-3xl">
            <h2 id="more-notes" className="text-h2 text-ink">
              More notes
            </h2>
            <ul className="mt-5 grid gap-4" data-reveal-stagger>
              {others.map((item) => (
                <li key={item.slug} data-reveal-child className="card card-accent">
                  <TextLink href={`/blog/${item.slug}`}>{item.title}</TextLink>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
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
