'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    fr: { published: 'Publié le', updated: 'Mis à jour le', profile: 'Voir le profil' },
    en: { published: 'Published on', updated: 'Updated on', profile: 'View profile' },
    es: { published: 'Publicado el', updated: 'Actualizado el', profile: 'Ver perfil' },
    pt: { published: 'Publicado em', updated: 'Atualizado em', profile: 'Ver perfil' }
  }[locale] || { published: 'Publié le', updated: 'Mis à jour le', profile: 'Voir le profil' };

  const profileLink = author.profileUrl || author.linkedin;
  const isExternalProfile = Boolean(profileLink && /^https?:\/\//.test(profileLink));

  return (
    <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-primary rounded-r-lg mb-8">
      <Image
        src={author.avatar}
        alt={`Photo de ${author.name}, ${author.role}`}
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
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
        {profileLink && (
          isExternalProfile ? (
            <a
              href={profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-blue-700 font-semibold px-4 py-2 rounded-lg transition-all text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {labels.profile}
            </a>
          ) : (
            <Link
              href={profileLink}
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-blue-700 font-semibold px-4 py-2 rounded-lg transition-all text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h4m0 0v4m0-4L10 14m-4 5h12a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {labels.profile}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
