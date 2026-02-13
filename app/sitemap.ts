import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.biloki.fr'
  const locales = ['fr', 'en', 'es', 'pt']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    const pages = getPagesForLocale()

    pages.forEach(pagePath => {
      // Priorités basées sur l'importance
      let priority = 0.6
      if (pagePath === '') priority = 1.0
      else if (pagePath === '/tarifs') priority = 0.95
      else if (pagePath === '/contact' || pagePath === '/reserver-demo') priority = 0.9
      else if (pagePath.startsWith('/fonctionnalites/channel-manager/airbnb')) priority = 0.85
      else if (pagePath.startsWith('/fonctionnalites/channel-manager/booking')) priority = 0.85
      else if (pagePath.startsWith('/fonctionnalites/channel-manager')) priority = 0.85
      else if (pagePath.startsWith('/fonctionnalites')) priority = 0.8
      else if (pagePath.startsWith('/blog/')) priority = 0.7
      else if (pagePath.startsWith('/commencer-gratuitement')) priority = 0.85
      else if (pagePath === '/equipe' || pagePath === '/carriere') priority = 0.65

      // Fréquence de changement
      let changeFrequency: 'never' | 'yearly' | 'monthly' | 'weekly' | 'daily' = 'monthly'
      if (pagePath === '') changeFrequency = 'daily'
      else if (pagePath.startsWith('/blog/')) changeFrequency = 'weekly'
      else if (pagePath.startsWith('/fonctionnalites')) changeFrequency = 'monthly'
      else if (pagePath === '/tarifs' || pagePath === '/reserver-demo' || pagePath === '/commencer-gratuitement') changeFrequency = 'weekly'
      else if (pagePath === '/cgv' || pagePath === '/mentions-legales' || pagePath === '/cookies') changeFrequency = 'yearly'

      // Créer les alternates multilingues
      const alternates: Record<string, string> = {}
      locales.forEach(l => {
        if (l !== locale) {
          alternates[`${l}-${l.toUpperCase()}`] = `${baseUrl}/${l}${pagePath}`
        }
      })
      alternates['x-default'] = `${baseUrl}/${locale}${pagePath}`

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${pagePath}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency,
        priority,
        alternates: alternates as any,
      })
    })
  })

  return sitemapEntries
}

function getPagesForLocale(): string[] {
  const appDir = path.join(process.cwd(), 'app')
  const localeDir = path.join(appDir, '[locale]')

  if (!fs.existsSync(localeDir)) {
    return []
  }

  const pages: string[] = []
  
  // Pages de base à inclure
  const staticPages = [
    '',
    '/tarifs',
    '/contact',
    '/reserver-demo',
    '/commencer-gratuitement',
    '/carriere',
    '/equipe',
    '/cgv',
    '/cookies',
    '/mentions-legales',
  ]
  
  // Sections de fonctionnalités à inclure
  const featurePages = [
    '/fonctionnalites',
    '/fonctionnalites/channel-manager',
    '/fonctionnalites/channel-manager/airbnb',
    '/fonctionnalites/channel-manager/booking',
    '/fonctionnalites/channel-manager/calendriers',
    '/fonctionnalites/channel-manager/ota',
    '/fonctionnalites/pms',
    '/fonctionnalites/vue-ensemble',
  ]

  const walk = (currentDir: string, currentRoute: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    const hasPage = entries.some(
      entry => entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts')
    )

    if (hasPage && staticPages.includes(currentRoute)) {
      pages.push(currentRoute)
    }

    entries
      .filter(entry => entry.isDirectory())
      .forEach(dir => {
        if (dir.name.startsWith('(') || dir.name.startsWith('_') || dir.name === 'api') {
          return
        }

        const nextRoute = currentRoute === '' ? `/${dir.name}` : `${currentRoute}/${dir.name}`
        
        // Pour les routes de features, inclure spécifiquement
        if (featurePages.some(fp => nextRoute === fp || nextRoute.startsWith(fp + '/'))) {
          walk(path.join(currentDir, dir.name), nextRoute)
        } else if (!nextRoute.startsWith('/fonctionnalites') && !dir.name.includes('[')) {
          walk(path.join(currentDir, dir.name), nextRoute)
        }
      })
  }

  walk(localeDir, '')

  return pages
}
