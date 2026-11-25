import 'server-only';
import matter from 'gray-matter';
import { deleteFile, getFile, putFile, readDirTexts } from './github';
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

/**
 * Commits tagged with this are skipped by the public site's Vercel build (see /vercel.json).
 * Only changes that affect what visitors see (publish, update a live post, unpublish,
 * delete a live post) trigger a rebuild; drafts and image uploads don't.
 */
const SKIP_DEPLOY = ' [skip deploy]';

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
  const files = (await readDirTexts(POSTS_DIR)).filter((f) => f.name.endsWith('.md'));
  return files
    .map((f): PostSummary => {
      const slug = f.name.replace(/\.md$/, '');
      const { title, date, status } = parse(slug, f.text, f.sha);
      return { slug, title: title || slug, date, status };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isValidSlug(slug)) return null;
  const file = await getFile(postPath(slug));
  return file ? parse(slug, file.text, file.sha) : null;
}

/** Creates the post when sha is undefined, otherwise updates it. Returns the new sha. */
export async function savePost(p: PostInput, sha: string | undefined): Promise<string> {
  // Unpublishing (live -> draft) must rebuild so the post disappears from the site.
  const wasPublished = sha ? (await getPost(p.slug))?.status === 'published' : false;
  const live = p.status === 'published' || wasPublished;
  const verb = !sha ? 'Add' : p.status === 'draft' && wasPublished ? 'Unpublish' : 'Update';
  const what = p.status === 'published' ? 'post' : 'draft';
  const message = `blog: ${verb} ${what} "${p.title}"${live ? '' : SKIP_DEPLOY}`;
  return putFile(postPath(p.slug), serialize(p), message, sha);
}

export async function removePost(slug: string, sha: string, title: string, wasPublished: boolean): Promise<void> {
  await deleteFile(postPath(slug), sha, `blog: Delete post "${title}"${wasPublished ? '' : SKIP_DEPLOY}`);
}

export async function uploadImage(slug: string, filename: string, data: Buffer): Promise<string> {
  const path = `public/blog/${slug}/${filename}`;
  // Images go live with the next publish/update commit, so this commit needs no rebuild.
  await putFile(path, data, `blog: Add image ${filename} for "${slug}"${SKIP_DEPLOY}`);
  return `/blog/${slug}/${filename}`;
}
