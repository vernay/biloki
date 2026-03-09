import { getProgrammaticCitySlugsFr } from '../../lib/seo/programmatic-cities';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://www.biloki.fr';
  const today = new Date().toISOString().split('T')[0];

  const urls = getProgrammaticCitySlugsFr()
    .map((slug) => {
      const pageUrl = `${baseUrl}/fr/logiciel-location-saisonniere/${slug}`;
      return [
        '  <url>',
        `    <loc>${pageUrl}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.45</priority>',
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
