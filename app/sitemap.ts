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

  const walk = (currentDir: string, currentRoute: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    // Vérifier si ce dossier contient un fichier page.tsx ou page.ts
    const hasPage = entries.some(
      entry => entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts')
    )

    if (hasPage) {
      pages.push(currentRoute)
    }

    // Parcourir récursivement les sous-dossiers
    entries
      .filter(entry => entry.isDirectory())
      .forEach(dir => {
        // Exclure les dossiers spéciaux :
        // - Groupes de routes Next.js : (group-name)
        // - Dossiers privés : _private
        // - Routes API
        // - Routes dynamiques avec paramètres : [id], [slug], etc.
        if (
          dir.name.startsWith('(') || 
          dir.name.startsWith('_') || 
          dir.name === 'api' ||
          dir.name.startsWith('[')
        ) {
          return
        }

        const nextRoute = currentRoute === '' ? `/${dir.name}` : `${currentRoute}/${dir.name}`
        walk(path.join(currentDir, dir.name), nextRoute)
      })
  }

  walk(localeDir, '')

  return pages
}
