'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import type { Post, PostStatus } from '@/lib/posts';
import { isValidSlug, slugify } from '@/lib/slug';
import { deletePostAction, savePostAction, uploadImageAction } from '../actions';

type Props = { initial?: Post; imageBase: string; siteUrl: string };

const today = () => new Date().toISOString().slice(0, 10);

/** Resize to max 1600px wide and re-encode as WebP in the browser. GIFs are passed through. */
async function compressImage(file: File): Promise<File> {
  if (file.type === 'image/gif') return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/webp', 0.82));
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' });
}

const inputCls =
  'mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 disabled:bg-zinc-100 disabled:text-zinc-500';

export default function PostEditor({ initial, imageBase, siteUrl }: Props) {
  const router = useRouter();
  const isNew = !initial;

  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [date, setDate] = useState(initial?.date || today());
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [cover, setCover] = useState(initial?.cover ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [status, setStatus] = useState<PostStatus>(initial?.status ?? 'draft');
  const [sha, setSha] = useState<string | undefined>(initial?.sha);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  // Images uploaded in this session: repo path -> local object URL (repo copy may not be fetchable yet).
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const edit =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setDirty(true);
    };

  const onTitle = (v: string) => {
    edit(setTitle)(v);
    if (isNew && !slugTouched) setSlug(slugify(v));
  };

  const resolveSrc = (src: string) =>
    localImages[src] ?? (src.startsWith('/blog/') ? `${imageBase}${src}` : src);

  const previewHtml = useMemo(() => {
    const html = marked.parse(body, { async: false });
    return html.replace(/src="(\/blog\/[^"]+)"/g, (_, src: string) => `src="${resolveSrc(src)}"`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, localImages, imageBase]);

  async function upload(file: File): Promise<string | null> {
    if (!isValidSlug(slug)) {
      setMessage({ kind: 'error', text: 'Enter a title (and valid slug) before uploading images.' });
      return null;
    }
    setUploading(true);
    setMessage(null);
    try {
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.set('slug', slug);
      fd.set('file', compressed);
      const res = await uploadImageAction(fd);
      if (!res.ok) {
        setMessage({ kind: 'error', text: res.error });
        return null;
      }
      setLocalImages((m) => ({ ...m, [res.path]: URL.createObjectURL(compressed) }));
      return res.path;
    } catch {
      setMessage({ kind: 'error', text: 'Could not process that image.' });
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function onCoverFile(file: File | undefined) {
    if (!file) return;
    const path = await upload(file);
    if (path) edit(setCover)(path);
  }

  async function onInlineImage(file: File | undefined) {
    if (!file) return;
    const path = await upload(file);
    if (!path) return;
    const ta = textareaRef.current;
    const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    const snippet = `\n![${alt}](${path})\n`;
    const pos = ta?.selectionStart ?? body.length;
    edit(setBody)(body.slice(0, pos) + snippet + body.slice(pos));
  }

  function save(nextStatus: PostStatus) {
    setMessage(null);
    startTransition(async () => {
      const res = await savePostAction(
        {
          slug,
          title,
          excerpt,
          date,
          cover,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          status: nextStatus,
          body,
        },
        sha,
      );
      if (!res.ok) {
        setMessage({ kind: 'error', text: res.error });
        return;
      }
      setSha(res.sha);
      setStatus(nextStatus);
      setDirty(false);
      const text =
        nextStatus === 'published'
          ? 'Published. The post will be live in about 1–2 minutes once the site redeploys.'
          : status === 'published'
            ? 'Unpublished. It will disappear from the site after the next redeploy (~1–2 min).'
            : 'Draft saved.';
      setMessage({ kind: 'ok', text });
      if (isNew) router.replace(`/edit/${slug}`);
    });
  }

  function remove() {
    if (!initial) return;
    if (!confirm(`Delete "${title || slug}"? This removes it from the site.`)) return;
    startTransition(async () => {
      const res = await deletePostAction(initial.slug);
      if (res?.error) setMessage({ kind: 'error', text: res.error });
    });
  }

  const busy = pending || uploading;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-zinc-500 hover:text-navy">
            ← Posts
          </Link>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {isNew ? 'New' : status === 'published' ? 'Published' : 'Draft'}
          </span>
          {!isNew && status === 'published' && siteUrl && (
            <a
              href={`${siteUrl}/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-blue hover:underline"
            >
              View live ↗
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Delete
            </button>
          )}
          {status === 'published' && !isNew ? (
            <button
              type="button"
              onClick={() => save('draft')}
              disabled={busy}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50"
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => save('draft')}
              disabled={busy}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50"
            >
              Save draft
            </button>
          )}
          <button
            type="button"
            onClick={() => save('published')}
            disabled={busy}
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white hover:bg-accent-blue-hover disabled:opacity-50"
          >
            {pending ? 'Saving…' : status === 'published' && !isNew ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`mb-6 rounded-lg p-3 text-sm ${
            message.kind === 'ok' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mb-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-zinc-700">Title</span>
          <input value={title} onChange={(e) => onTitle(e.target.value)} className={`${inputCls} text-lg font-semibold`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Slug (URL)</span>
          <input
            value={slug}
            disabled={!isNew}
            onChange={(e) => {
              setSlugTouched(true);
              edit(setSlug)(e.target.value.toLowerCase());
            }}
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-zinc-400">
            /blog/{slug || '…'}
            {!isNew && ' · fixed after first save'}
            {isNew && slug && !isValidSlug(slug) && <span className="text-red-600"> · use a-z, 0-9 and hyphens</span>}
          </span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Date</span>
          <input type="date" value={date} onChange={(e) => edit(setDate)(e.target.value)} className={inputCls} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-zinc-700">Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => edit(setExcerpt)(e.target.value)}
            rows={2}
            placeholder="One or two sentences shown on the blog list and in search results."
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Tags</span>
          <input
            value={tags}
            onChange={(e) => edit(setTags)(e.target.value)}
            placeholder="IB, Study tips"
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-zinc-400">Comma-separated</span>
        </label>
        <div>
          <span className="text-sm font-medium text-zinc-700">Cover image</span>
          <div className="mt-1 flex items-center gap-3">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resolveSrc(cover)} alt="" className="h-14 w-24 rounded-md object-cover" />
            )}
            <label className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
              {uploading ? 'Uploading…' : cover ? 'Replace' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  onCoverFile(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
            {cover && (
              <button type="button" onClick={() => edit(setCover)('')} className="text-sm text-zinc-500 hover:text-red-600">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Markdown</span>
            <label className="cursor-pointer text-sm text-accent-blue hover:underline">
              {uploading ? 'Uploading…' : '+ Insert image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  onInlineImage(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => edit(setBody)(e.target.value)}
            placeholder={'## A heading\n\nWrite your post here. **Bold**, *italic*, [links](https://example.com), lists with - item.'}
            className="min-h-[60vh] flex-1 resize-y rounded-b-2xl p-4 font-mono text-sm leading-relaxed outline-none"
          />
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview</span>
          </div>
          <div className="max-h-[75vh] overflow-y-auto p-6">
            {title && <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-navy">{title}</h1>}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      </div>
    </main>
  );
}
