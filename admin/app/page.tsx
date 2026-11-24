import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listPosts, type PostSummary } from '@/lib/posts';
import Header from './components/Header';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  await requireAdmin();

  let posts: PostSummary[] = [];
  let error = '';
  try {
    posts = await listPosts();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-navy">Posts</h1>
          <Link
            href="/new"
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white hover:bg-accent-blue-hover"
          >
            New post
          </Link>
        </div>

        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {posts.length === 0 ? (
          !error && (
            <p className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
              No posts yet. Click <strong>New post</strong> to write your first one.
            </p>
          )
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {posts.map((p) => (
                  <tr key={p.slug} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <Link href={`/edit/${p.slug}`} className="font-medium text-navy hover:text-accent-blue">
                        {p.title}
                      </Link>
                      <div className="text-xs text-zinc-400">/blog/{p.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          p.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {p.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
