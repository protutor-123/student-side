import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatDate, getPublishedPosts } from '../lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Study tips, exam guidance and curriculum insights for IB, IGCSE, CBSE and SAT/ACT students from Protutor360 tutors.',
  alternates: { canonical: 'https://www.Protutor360.com/blog' },
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <header className="mb-12 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Blog</h1>
            <p className="mt-4 text-lg text-zinc-600">
              Study tips, exam guidance and curriculum insights from our tutors.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-zinc-500">No posts yet — check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-navy to-accent-blue" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={post.date} className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      {formatDate(post.date)}
                    </time>
                    <h2 className="mt-2 text-xl font-bold text-navy group-hover:text-accent-blue">{post.title}</h2>
                    {post.excerpt && <p className="mt-3 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>}
                    {post.tags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-off-white px-2.5 py-1 text-xs text-zinc-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
