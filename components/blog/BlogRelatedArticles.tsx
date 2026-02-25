'use client';

import Image from 'next/image';
import Link from 'next/link';
import { translateCategory } from '@/lib/blog/categories';

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogRelatedArticlesProps {
  currentSlug: string;
  articles: RelatedArticle[];
  locale: string;
  relatedSlugs?: string[]; // Prioritize these article slugs for related articles
}

export default function BlogRelatedArticles({ 
  currentSlug, 
  articles,
  locale,
  relatedSlugs
}: BlogRelatedArticlesProps) {
  // Filter related articles: prioritize those in relatedSlugs, then fallback to first 3
  const relatedArticles = relatedSlugs && relatedSlugs.length > 0
    ? articles.filter(article => relatedSlugs.includes(article.slug)).slice(0, 3)
    : articles
        .filter(article => article.slug !== currentSlug)
        .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  const title = {
    fr: 'Articles liés',
    en: 'Related articles',
    es: 'Artículos relacionados',
    pt: 'Artigos relacionados'
  }[locale] || 'Articles liés';

  const seeAllText = {
    fr: 'Voir tous les articles',
    en: 'See all articles',
    es: 'Ver todos los artículos',
    pt: 'Ver todos os artigos'
  }[locale] || 'Voir tous les articles';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="space-y-5">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale}/blog/${article.slug}`}
            className="block group"
          >
            <div className="overflow-hidden rounded-lg mb-2">
              <Image
                src={article.image}
                alt={article.title}
                width={280}
                height={157}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-primary font-semibold">
                {translateCategory(article.category, locale)}
              </span>
              <span className="text-xs text-gray-500">
                • {article.readTime}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1 leading-tight">
              {article.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
        
        <Link
          href={`/${locale}/blog`}
          className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-all"
        >
          {seeAllText}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    );
}

