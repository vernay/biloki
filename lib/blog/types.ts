export type Locale = "fr" | "en" | "es" | "pt";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

export interface BlogArticle {
  slug: string;
  category: string;
  date: string; // YYYY-MM-DD
  updatedDate?: string; // YYYY-MM-DD
  readTime: string; // "4 min", "8 min", etc.
  image: string;
  author?: BlogAuthor;
  featured?: boolean;
  relatedSlugs?: string[]; // Related article slugs for internal linking (max 3)
  translations: Record<Locale, BlogArticleTranslation>;
}

export type BlogArticles = BlogArticle[];

