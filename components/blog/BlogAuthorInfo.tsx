'use client';

import Image from 'next/image';
import { BlogAuthor } from '@/lib/blog/types';

interface BlogAuthorInfoProps {
  author: BlogAuthor;
  date: string;
  updatedDate?: string;
  readTime: string;
  locale: string;
}

export default function BlogAuthorInfo({ 
  author, 
  date, 
  updatedDate,
  readTime,
  locale 
}: BlogAuthorInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const labels = {
    fr: { published: 'Publié le', updated: 'Mis à jour le' },
    en: { published: 'Published on', updated: 'Updated on' },
    es: { published: 'Publicado el', updated: 'Actualizado el' },
    pt: { published: 'Publicado em', updated: 'Atualizado em' }
  }[locale] || { published: 'Publié le', updated: 'Mis à jour le' };

  return (
    <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-primary rounded-r-lg mb-8">
      <Image
        src={author.avatar}
        alt={author.name}
        width={64}
        height={64}
        className="rounded-full ring-2 ring-white shadow-md"
      />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-bold text-gray-900">{author.name}</h3>
          <span className="text-sm text-gray-600">• {author.role}</span>
        </div>
        {author.bio && (
          <p className="text-sm text-gray-700 mb-3">{author.bio}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {labels.published} {formatDate(date)}
          </span>
          {updatedDate && (
            <span className="flex items-center gap-1 text-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {labels.updated} {formatDate(updatedDate)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime}
          </span>
        </div>
      </div>
    </div>
  );
}
