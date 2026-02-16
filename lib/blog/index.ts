import { articles } from "./articles";
import { Locale, BlogArticle } from "./types";

export interface BlogArticleForLocale {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  title: string;
  excerpt: string;
  content: string;
}

/**
 * Get all blog articles for a specific locale
 */
export function getArticlesForLocale(locale: Locale): BlogArticleForLocale[] {
  return articles.map((article) => ({
    slug: article.slug,
    category: article.category,
    date: article.date,
    readTime: article.readTime,
    image: article.image,
    ...article.translations[locale],
  }));
}

/**
 * Get a single blog article by slug for a specific locale
 */
export function getArticleBySlug(
  slug: string,
  locale: Locale
): BlogArticleForLocale | null {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;

  return {
    slug: article.slug,
    category: article.category,
    date: article.date,
    readTime: article.readTime,
    image: article.image,
    ...article.translations[locale],
  };
}

/**
 * Get all article slugs (for static generation)
 */
export function getAllArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}
