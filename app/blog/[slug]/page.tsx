import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { formatDate, getPost, getPublishedPosts } from '../../lib/blog';

const SITE_URL = 'https://www.Protutor360.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date,
      images: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.date,
    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'Protutor360', logo: `${SITE_URL}/logo.png` },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <Link href="/blog" className="text-sm font-medium text-accent-blue hover:underline">
            &larr; All posts
          </Link>
          <header className="mt-6 mb-10">
            <time dateTime={post.date} className="text-sm text-zinc-500">
              {formatDate(post.date)}
            </time>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mt-4 text-lg text-zinc-600">{post.excerpt}</p>}
          </header>
          {post.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover} alt="" className="mb-10 w-full rounded-2xl object-cover" />
          )}
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  );
}
