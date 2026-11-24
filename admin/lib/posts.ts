import 'server-only';
import matter from 'gray-matter';
import { deleteFile, getFile, listDir, putFile } from './github';
import { isValidSlug } from './slug';

const POSTS_DIR = 'content/blog';

export type PostStatus = 'draft' | 'published';

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  tags: string[];
  status: PostStatus;
  body: string;
};

export type Post = PostInput & { sha: string };

export type PostSummary = Pick<Post, 'slug' | 'title' | 'date' | 'status'>;

const postPath = (slug: string) => `${POSTS_DIR}/${slug}.md`;

function parse(slug: string, text: string, sha: string): Post {
  const { data, content } = matter(text);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
  return {
    slug,
    sha,
    title: String(data.title ?? ''),
    excerpt: String(data.excerpt ?? ''),
    date,
    cover: String(data.cover ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.status === 'published' ? 'published' : 'draft',
    body: content.replace(/^\n/, ''),
  };
}

function serialize(p: PostInput): string {
  return matter.stringify(`\n${p.body.trim()}\n`, {
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    cover: p.cover,
    tags: p.tags,
    status: p.status,
  });
}

export async function listPosts(): Promise<PostSummary[]> {
  const files = (await listDir(POSTS_DIR)).filter((f) => f.name.endsWith('.md'));
  const posts = await Promise.all(
    files.map(async (f) => {
      const slug = f.name.replace(/\.md$/, '');
      const file = await getFile(f.path);
      if (!file) return null;
      const { title, date, status } = parse(slug, file.text, file.sha);
      return { slug, title: title || slug, date, status };
    }),
  );
  return posts
    .filter((p): p is PostSummary => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isValidSlug(slug)) return null;
  const file = await getFile(postPath(slug));
  return file ? parse(slug, file.text, file.sha) : null;
}

/** Creates the post when sha is undefined, otherwise updates it. Returns the new sha. */
export async function savePost(p: PostInput, sha: string | undefined): Promise<string> {
  const verb = sha ? 'Update' : 'Add';
  const what = p.status === 'published' ? 'post' : 'draft';
  return putFile(postPath(p.slug), serialize(p), `blog: ${verb} ${what} "${p.title}"`, sha);
}

export async function removePost(slug: string, sha: string, title: string): Promise<void> {
  await deleteFile(postPath(slug), sha, `blog: Delete post "${title}"`);
}

export async function uploadImage(slug: string, filename: string, data: Buffer): Promise<string> {
  const path = `public/blog/${slug}/${filename}`;
  await putFile(path, data, `blog: Add image ${filename} for "${slug}"`);
  return `/blog/${slug}/${filename}`;
}
