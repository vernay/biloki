import { articles } from "./articles";
import { Locale, BlogArticle, BlogAuthor } from "./types";

export interface BlogArticleForLocale {
  slug: string;
  category: string;
  date: string;
  updatedDate?: string;
  readTime: string;
  image: string;
  author?: BlogAuthor;
  featured?: boolean;
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

/**
 * Get all blog articles for a specific locale
 */
export function getArticlesForLocale(locale: Locale): BlogArticleForLocale[] {
  return articles
    .map((article) => ({
      slug: article.slug,
      category: article.category,
      date: article.date,
      updatedDate: article.updatedDate,
      readTime: article.readTime,
      image: article.image,
      author: article.author,
      featured: article.featured,
      ...article.translations[locale],
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    updatedDate: article.updatedDate,
    readTime: article.readTime,
    image: article.image,
    author: article.author,
    featured: article.featured,
    ...article.translations[locale],
  };
}

/**
 * Get all article slugs (for static generation)
 */
export function getAllArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}
