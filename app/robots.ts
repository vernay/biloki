import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*.json',
          '/*?*sort=',
          '/*?*page=',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
      },
    ],
    sitemap: [
      'https://www.biloki.fr/sitemap.xml',
    ],
  }
}
