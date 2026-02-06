import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biloki.fr'

  // Langues supportées
  const locales = ['fr', 'en', 'es', 'pt']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    const pages = getPagesForLocale()

    pages.forEach(pagePath => {
      const priority = pagePath === '' ? 1 : 0.8
      const changeFrequency = pagePath.startsWith('/blog/') ? 'weekly' : 'monthly'

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${pagePath}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
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

    const hasPage = entries.some(
      entry => entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts')
    )

    if (hasPage) {
      pages.push(currentRoute)
    }

    entries
      .filter(entry => entry.isDirectory())
      .forEach(dir => {
        if (dir.name.startsWith('(') || dir.name.startsWith('_')) {
          return
        }

        // Exclure les segments dynamiques ou catch-all
        if (dir.name.includes('[')) {
          return
        }

        const nextRoute = currentRoute === '' ? `/${dir.name}` : `${currentRoute}/${dir.name}`
        walk(path.join(currentDir, dir.name), nextRoute)
      })
  }

  walk(localeDir, '')

  return pages
}
