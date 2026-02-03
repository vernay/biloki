import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biloki.fr'
  
  // Langues supportées
  const locales = ['fr', 'en', 'es', 'pt']
  
  // Pages principales
  const routes = [
    '',
    '/tarifs',
    '/fonctionnalites',
    '/fonctionnalites/pms',
    '/fonctionnalites/channel-manager',
    '/fonctionnalites/messagerie',
    '/fonctionnalites/serrures-connectees',
    '/fonctionnalites/ia-automatisation',
    '/fonctionnalites/prestataires',
    '/fonctionnalites/reporting',
    '/fonctionnalites/marketplace-api',
    '/fonctionnalites/4-interfaces',
    '/fonctionnalites/multi-langues',
    '/fonctionnalites/vue-ensemble',
    '/connexions-api',
    '/equipe',
    '/carriere',
    '/contact',
    '/blog',
    '/blog/automatiser-gestion-locations-saisonnieres',
    '/blog/channel-manager-guide-complet-conciergeries',
    '/blog/messagerie-automatisee-conciergerie',
    '/blog/nice-quotas-airbnb-reglementation-2025',
    '/programme-parrainage',
    '/mentions-legales',
    '/cgv',
    '/cookies',
  ]
  
  // Génère les URLs pour toutes les langues
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.includes('/blog/') ? 0.6 : 0.8,
      })
    })
  })
  
  return sitemapEntries
}
