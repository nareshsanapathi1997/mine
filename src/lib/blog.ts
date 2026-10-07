import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function asString(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDate(value: unknown) {
  const text = value instanceof Date ? asString(value) : asString(value);
  const match = text.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  if (!slugPattern.test(slug)) return null;

  const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const parsed = matter(raw);
  const title = asString(parsed.data.title);
  const description = asString(parsed.data.description);
  const date = normalizeDate(parsed.data.date);
  const author = asString(parsed.data.author);
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
        .map((tag) => asString(tag).toLowerCase())
        .filter((tag) => slugPattern.test(tag))
    : [];
  const coverValue = asString(parsed.data.cover);
  const cover = coverValue.startsWith("/") ? coverValue : undefined;

  if (!title || !description || !date || !author || tags.length === 0) {
    console.warn(`[blog] Skipping ${fileName}: frontmatter needs title, description, date, author and tags.`);
    return null;
  }

  return {
    slug,
    title,
    description,
    date,
    author,
    tags,
    cover,
    readingMinutes: readingMinutes(parsed.content),
    content: parsed.content,
  };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map(parseFile)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      tags: post.tags,
      cover: post.cover,
      readingMinutes: post.readingMinutes,
    }));
}

export function getPost(slug: string): Post | null {
  if (!slugPattern.test(slug) || !fs.existsSync(postsDirectory)) return null;
  const mdx = path.join(postsDirectory, `${slug}.mdx`);
  const md = path.join(postsDirectory, `${slug}.md`);
  const fileName = fs.existsSync(mdx) ? `${slug}.mdx` : fs.existsSync(md) ? `${slug}.md` : "";
  if (!fileName) return null;
  return parseFile(fileName);
}

export function getTags() {
  return [...new Set(getPosts().flatMap((post) => post.tags))].sort();
}

export function getPostsByTag(tag: string) {
  return getPosts().filter((post) => post.tags.includes(tag));
}

export { blogCategories, formatPostDate, postMatchesCategory, tagLabel } from "@/lib/blog-shared";
