import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kirimkendaraan.co.id'; // Placeholder URL

  // Base routes
  const routes = [
    '',
    '/tentang',
    '/layanan',
    '/artikel',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: '2026-07-17',
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
