import { MetadataRoute } from 'next'

const baseUrl = 'https://www.biloki.fr'
const locales = ['fr', 'en', 'es', 'pt']

// Liste blanche SEO : uniquement les pages marketing/produit réellement souhaitées.
// Les routes de redirection (connexion, abonnement, etc.) sont volontairement exclues.
const STATIC_MARKETING_ROUTES: string[] = [
  '',
  '/carriere',
  '/cgv',
  '/connexions-api',
  '/contact',
  '/cookies',
  '/equipe',
  '/fonctionnalites',
  '/fonctionnalites/avis',
  '/fonctionnalites/interface-proprietaires',
  '/fonctionnalites/interface-voyageurs',
  '/fonctionnalites/marketplace-api',
  '/fonctionnalites/messagerie-unifiee',
  '/fonctionnalites/planning-missions',
  '/fonctionnalites/reservations',
  '/fonctionnalites/statistiques',
  '/fonctionnalites/ventes-additionnelles',
  '/mentions-legales',
  '/programme-parrainage',
  '/reserver-demo',
  '/tarifs',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const buildDate = new Date().toISOString()

  locales.forEach(locale => {
    const pages = [...STATIC_MARKETING_ROUTES]

    pages.forEach(pagePath => {
      const languages: Record<string, string> = {
        fr: `${baseUrl}/fr${pagePath}`,
        en: `${baseUrl}/en${pagePath}`,
        es: `${baseUrl}/es${pagePath}`,
        pt: `${baseUrl}/pt${pagePath}`,
        'x-default': `${baseUrl}/fr${pagePath}`,
      }

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${pagePath}`,
        lastModified: buildDate,
        changeFrequency: getChangeFrequency(pagePath),
        priority: getPriority(pagePath),
        alternates: {
          languages,
        },
      })
    })
  })

  return sitemapEntries
}

function getPriority(pagePath: string): number {
  if (pagePath === '') return 1
  if (pagePath === '/tarifs') return 0.95
  if (pagePath === '/contact' || pagePath === '/reserver-demo') return 0.9
  if (pagePath.startsWith('/fonctionnalites/channel-manager')) return 0.85
  if (pagePath.startsWith('/fonctionnalites')) return 0.8
  if (pagePath === '/equipe' || pagePath === '/carriere') return 0.65
  return 0.6
}

function getChangeFrequency(
  pagePath: string
): 'never' | 'yearly' | 'monthly' | 'weekly' | 'daily' {
  if (pagePath === '') return 'daily'
  if (pagePath.startsWith('/fonctionnalites')) return 'monthly'
  if (pagePath === '/tarifs' || pagePath === '/reserver-demo') return 'weekly'
  if (pagePath === '/cgv' || pagePath === '/mentions-legales' || pagePath === '/cookies') {
    return 'yearly'
  }
  return 'monthly'
}
