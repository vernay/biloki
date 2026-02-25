'use client';

import { useState } from 'react';
import Image from 'next/image';
import { categoryTranslations, translateCategory } from '@/lib/blog/categories';

interface Article {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  title: string;
  excerpt: string;
}

interface BlogGridProps {
  articles: Article[];
  locale: string;
  readMoreLabel: string;
}

export default function BlogGrid({ articles, locale, readMoreLabel }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  // Récupère uniquement les catégories présentes dans les articles
  const usedCategories = Array.from(new Set(articles.map(a => a.category)));

  const allLabel: Record<string, string> = {
    fr: 'Tous',
    en: 'All',
    es: 'Todos',
    pt: 'Todos',
  };

  const noResultLabel: Record<string, string> = {
    fr: 'Aucun article dans cette catégorie.',
    en: 'No articles in this category.',
    es: 'No hay artículos en esta categoría.',
    pt: 'Nenhum artigo nesta categoria.',
  };

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <>
      {/* Filtres par catégorie */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
          }`}
        >
          {allLabel[locale] ?? 'Tous'}
        </button>
        {usedCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {translateCategory(cat, locale)}
          </button>
        ))}
      </div>

      {/* Grille d'articles */}
      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 py-16">{noResultLabel[locale] ?? 'Aucun article.'}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary to-blue-600">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={article.slug === 'ia-location-courte-duree-conciergeries'}
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">
                    {translateCategory(article.category, locale)}
                  </span>
                  <span>{formatDate(article.date)}</span>
                  <span>• {article.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-700 mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* CTA */}
                <a
                  href={`/${locale}/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {readMoreLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
