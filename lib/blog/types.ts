export type Locale = "fr" | "en" | "es" | "pt";

export interface BlogArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
}

export interface BlogArticle {
  slug: string;
  category: string;
  date: string; // YYYY-MM-DD
  readTime: string; // "4 min", "8 min", etc.
  image: string;
  translations: Record<Locale, BlogArticleTranslation>;
}

export type BlogArticles = BlogArticle[];
