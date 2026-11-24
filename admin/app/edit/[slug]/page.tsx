import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { getPost } from '@/lib/posts';
import { imageBaseUrl } from '@/lib/images';
import Header from '../../components/Header';
import PostEditor from '../../components/PostEditor';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <PostEditor key={post.sha} initial={post} imageBase={imageBaseUrl()} siteUrl={process.env.SITE_URL ?? ''} />
    </>
  );
}
