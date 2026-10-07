"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategories, formatPostDate, postMatchesCategory, tagLabel } from "@/lib/blog-shared";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};
import { cn } from "@/lib/cn";

export function BlogBrowser({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (!postMatchesCategory(post.tags, category)) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tagLabel(tag).toLowerCase().includes(needle))
      );
    });
  }, [posts, query, category]);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="block w-full max-w-md">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="field h-11 px-3 outline-none"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Categories">
          <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterButton>
          {blogCategories.map((item) => (
            <FilterButton key={item.id} active={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {featured ? (
        <article className="mt-8 rounded-xl border border-line bg-surface p-5 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">Featured</p>
          <p className="mt-3 text-small text-muted">
            {featured.tags.map(tagLabel).join(" · ")}
            <span aria-hidden="true"> · </span>
            <time dateTime={featured.date}>{formatPostDate(featured.date)}</time>
            <span aria-hidden="true"> · </span>
            {featured.readingMinutes} min read
          </p>
          <h2 className="text-h2 mt-2 text-balance text-ink">
            <Link href={`/blog/${featured.slug}`} className="link-underline">
              {featured.title}
            </Link>
          </h2>
          <p className="text-body mt-3 max-w-[68ch] text-muted">{featured.description}</p>
          <Link href={`/blog/${featured.slug}`} className="text-link mt-2">
            Read article <span className="text-link-arrow" aria-hidden="true">→</span>
          </Link>
        </article>
      ) : (
        <p className="mt-8 text-body text-muted">No articles match that search.</p>
      )}

      {rest.length > 0 ? (
        <ul className="mt-6 grid gap-[var(--gutter)] md:grid-cols-2">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="card h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
                  {post.tags.map(tagLabel).join(" · ")}
                </p>
                <h2 className="text-h3 mt-2 text-ink">
                  <Link href={`/blog/${post.slug}`} className="link-underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-small mt-2 text-muted">{post.description}</p>
                <p className="mt-3 text-small text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingMinutes} min read
                </p>
                <Link href={`/blog/${post.slug}`} className="text-link mt-1">
                  Read article <span className="text-link-arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 shrink-0 rounded-full border px-3 text-sm font-semibold",
        active ? "border-navy bg-navy text-white" : "border-line bg-surface text-ink",
      )}
    >
      {children}
    </button>
  );
}
