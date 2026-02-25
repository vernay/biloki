'use client';

interface BlogTagsProps {
  tags: string[];
  locale: string;
}

export default function BlogTags({ tags, locale }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null;

  const label = {
    fr: 'Tags',
    en: 'Tags',
    es: 'Etiquetas',
    pt: 'Tags'
  }[locale] || 'Tags';

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-gray-200">
      <span className="text-sm font-semibold text-gray-700">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary text-sm font-medium rounded-full transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
