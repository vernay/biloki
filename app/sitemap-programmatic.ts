import { MetadataRoute } from 'next';
import { getProgrammaticCitySlugsFr } from '../lib/seo/programmatic-cities';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function sitemapProgrammatic(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.biloki.fr';

  return getProgrammaticCitySlugsFr().map((slug) => {
    const pagePath = `/fr/logiciel-location-saisonniere/${slug}`;

    return {
      url: `${baseUrl}${pagePath}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.45,
      alternates: {
        languages: {
          fr: `${baseUrl}${pagePath}`,
          'x-default': `${baseUrl}${pagePath}`,
        },
      },
    };
  });
}
