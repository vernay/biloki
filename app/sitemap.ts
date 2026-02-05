import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biloki.fr'
  
  // Langues supportées
  const locales = ['fr', 'en', 'es', 'pt']
  
  // Pages principales (disponibles dans toutes les langues)
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
    '/programme-parrainage',
    '/mentions-legales',
    '/cgv',
    '/cookies',
  ]
  
  // Articles de blog (uniquement en français pour le moment)
  const blogArticles = [
    '/blog/automatiser-gestion-locations-saisonnieres',
    '/blog/channel-manager-guide-complet-conciergeries',
    '/blog/messagerie-automatisee-conciergerie',
    '/blog/nice-quotas-airbnb-reglementation-2025',
  ]
  
  // Génère les URLs pour toutes les langues (pages principales)
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })
  
  // Ajouter les articles de blog uniquement en français
  blogArticles.forEach(article => {
    sitemapEntries.push({
      url: `${baseUrl}/fr${article}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })
  
  return sitemapEntries
}
