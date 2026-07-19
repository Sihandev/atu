import { MetadataRoute } from 'next';
import { services, routes, articles } from '@/config/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kirimkendaraan.co.id'; // Placeholder URL

  // Base routes
  const baseRoutes = [
    '',
    '/tentang',
    '/layanan',
    '/artikel',
    '/rute',
    '/cara-pengiriman',
    '/kontak',
    '/faq',
    '/cek-tarif',
    '/tracking',
    '/kebijakan-privasi',
    '/syarat-ketentuan',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: '2026-07-17',
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/layanan/${service.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Rute routes
  const routePages = routes.map((route) => ({
    url: `${baseUrl}/rute/${route.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Article routes
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/artikel/${article.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...baseRoutes, ...serviceRoutes, ...routePages, ...articlePages];
}
