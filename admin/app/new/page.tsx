import { requireAdmin } from '@/lib/auth';
import Header from '../components/Header';
import PostEditor from '../components/PostEditor';
import { imageBaseUrl } from '@/lib/images';

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <Header />
      <PostEditor imageBase={imageBaseUrl()} siteUrl={process.env.SITE_URL ?? ''} />
    </>
  );
}
