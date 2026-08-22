import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.protutor360.com',
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.protutor360.com/contact',
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
