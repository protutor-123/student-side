import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  tags: string[];
};

export type Post = PostMeta & { html: string };

function readPostFile(file: string): (PostMeta & { body: string; status: string }) | null {
  const slug = file.replace(/\.md$/, '');
  if (!SLUG_RE.test(slug)) return null;
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    if (typeof data.title !== 'string' || !data.title.trim()) throw new Error('missing title');
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('invalid date');
    return {
      slug,
      title: data.title.trim(),
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
      date,
      cover: typeof data.cover === 'string' ? data.cover : '',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      status: String(data.status ?? 'draft'),
      body: content,
    };
  } catch (err) {
    console.warn(`[blog] skipping ${file}: ${(err as Error).message}`);
    return null;
  }
}

function publishedRaw() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readPostFile)
    .filter((p): p is NonNullable<typeof p> => p !== null && p.status === 'published')
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPublishedPosts(): PostMeta[] {
  return publishedRaw().map(({ slug, title, excerpt, date, cover, tags }) => ({ slug, title, excerpt, date, cover, tags }));
}

export function getPost(slug: string): Post | null {
  const p = publishedRaw().find((x) => x.slug === slug);
  if (!p) return null;
  const { slug: s, title, excerpt, date, cover, tags, body } = p;
  return { slug: s, title, excerpt, date, cover, tags, html: marked.parse(body, { async: false }) };
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
