import type { MetadataRoute } from 'next';
import { getPublishedPosts } from './lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  return [
    {
      url: 'https://www.Protutor360.com',
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.Protutor360.com/contact',
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.Protutor360.com/privacy',
      lastModified: new Date('2026-10-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.Protutor360.com/terms',
      lastModified: new Date('2026-10-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.Protutor360.com/blog',
      lastModified: posts[0] ? new Date(posts[0].date) : new Date('2026-11-24'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `https://www.Protutor360.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
