import { MetadataRoute } from 'next';
import { brand, servicesList, routesList, articlesList } from '@/config/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${brand.domain}`;

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
    '/pesan',
    '/kebijakan-klaim',
    '/kebijakan-pembatalan',
    '/kebijakan-privasi',
    '/syarat-ketentuan',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = servicesList.map((service) => ({
    url: `${baseUrl}/layanan/${service.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Rute routes
  const routePages = routesList.map((route) => ({
    url: `${baseUrl}/rute/${route.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Article routes
  const articlePages = articlesList.map((article) => ({
    url: `${baseUrl}/artikel/${article.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...baseRoutes, ...serviceRoutes, ...routePages, ...articlePages];
}
