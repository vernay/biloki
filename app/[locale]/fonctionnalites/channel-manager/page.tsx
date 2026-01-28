'use client';

import { useTranslations } from 'next-intl';

export default function ChannelManagerPage() {
  const t = useTranslations('featuresPages.channelManager');

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('description')}
        </p>
        
        <div className="prose prose-lg max-w-none">
          <p>
            {t('content')}
          </p>
        </div>
      </div>
    </main>
  );
}
