import { MetadataRoute } from 'next';
import { brand } from '@/config/data';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /* /admin is an internal tool. Keeping it out of the index is tidiness,
         not security — access is enforced by Supabase auth and RLS. */
      disallow: ['/api/', '/admin'],
    },
    sitemap: `https://${brand.domain}/sitemap.xml`,
  };
}
