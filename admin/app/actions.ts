'use server';

import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { ConflictError, GitHubError } from '@/lib/github';
import { getPost, removePost, savePost, uploadImage, type PostInput } from '@/lib/posts';
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken } from '@/lib/session';
import { isValidSlug } from '@/lib/slug';

// ---------- auth ----------

function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error('ADMIN_PASSWORD is not set.');
  const a = createHash('sha256').update(input).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function login(_prev: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const password = String(formData.get('password') ?? '');
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 1000));
    return { error: 'Wrong password.' };
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  redirect('/');
}

export async function logout(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}

// ---------- posts ----------

export type SaveResult = { ok: true; sha: string } | { ok: false; error: string };

function errorMessage(err: unknown): string {
  if (err instanceof ConflictError || err instanceof GitHubError) return err.message;
  console.error(err);
  return 'Something went wrong. Your changes are still in the editor — try again.';
}

function validate(p: PostInput): string | null {
  if (!p.title.trim()) return 'Title is required.';
  if (!isValidSlug(p.slug)) return 'Slug may only contain lowercase letters, numbers and single hyphens.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) return 'Date must be YYYY-MM-DD.';
  if (p.cover && !p.cover.startsWith('/blog/') && !/^https:\/\//.test(p.cover)) return 'Cover must be an uploaded image.';
  if (p.status !== 'draft' && p.status !== 'published') return 'Invalid status.';
  return null;
}

export async function savePostAction(input: PostInput, sha: string | undefined): Promise<SaveResult> {
  await requireAdmin();
  const post: PostInput = {
    slug: input.slug.trim(),
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    date: input.date.trim(),
    cover: input.cover.trim(),
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    status: input.status,
    body: input.body,
  };
  const invalid = validate(post);
  if (invalid) return { ok: false, error: invalid };
  try {
    const newSha = await savePost(post, sha);
    revalidatePath('/');
    return { ok: true, sha: newSha };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

export async function deletePostAction(slug: string): Promise<{ error: string } | null> {
  await requireAdmin();
  try {
    const post = await getPost(slug);
    if (post) await removePost(slug, post.sha, post.title, post.status === 'published');
  } catch (err) {
    return { error: errorMessage(err) };
  }
  revalidatePath('/');
  redirect('/');
}

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

export async function uploadImageAction(formData: FormData): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  await requireAdmin();
  const slug = String(formData.get('slug') ?? '');
  const file = formData.get('file');
  if (!isValidSlug(slug)) return { ok: false, error: 'Set a valid slug before uploading images.' };
  if (!(file instanceof File)) return { ok: false, error: 'No image received.' };
  if (!['image/webp', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type))
    return { ok: false, error: 'Unsupported image type.' };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: 'Image is too large (max 3 MB after compression).' };
  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const base =
    file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image';
  const filename = `${base}-${Date.now().toString(36)}.${ext}`;
  try {
    const path = await uploadImage(slug, filename, Buffer.from(await file.arrayBuffer()));
    return { ok: true, path };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
