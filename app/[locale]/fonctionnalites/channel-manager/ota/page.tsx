'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getMainPlatforms, INTEGRATIONS_COUNT } from '@/lib/integrations-config';
import { getPrimaryColor, getPrimaryDarkColor } from '@/lib/design-config';

export default function OTAPage() {
  const t = useTranslations('featuresPages.ota');
  const common = useTranslations('common');
  
  const mainPlatforms = getMainPlatforms();
  const otherPlatformsCount = INTEGRATIONS_COUNT - mainPlatforms.length;

  const cardKeys = ['platforms', 'oneClick', 'performance', 'sync'] as const;
  const cardIcons = ['🌐', '🔌', '📊', '🔄'];
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('title')} <span style={{ color: getPrimaryColor() }}>{t('titleHighlight')}</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          {t('description', { 
            count: INTEGRATIONS_COUNT, 
            platforms: mainPlatforms.slice(0, 4).join(', ') 
          })}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cardKeys.map((key, index) => (
            <div key={key} className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
              <div className="text-4xl mb-4">{cardIcons[index]}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {key === 'platforms' 
                  ? t(`cards.${key}.title`, { count: INTEGRATIONS_COUNT })
                  : t(`cards.${key}.title`)
                }
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {key === 'platforms'
                  ? t(`cards.${key}.description`, { 
                      platforms: mainPlatforms.slice(0, 6).join(', '),
                      otherCount: otherPlatformsCount
                    })
                  : t(`cards.${key}.description`)
                }
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('mainPlatforms')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mainPlatforms.map((platform) => (
              <div key={platform} className="bg-white border-2 border-[#e3eef9] rounded-xl p-6 text-center font-semibold text-gray-700">
                {platform}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6">
            {t('otherPlatforms', { count: otherPlatformsCount })}
          </p>
        </div>

        <div 
          className="rounded-2xl p-12 text-white text-center" 
          style={{ background: `linear-gradient(to right, ${getPrimaryColor()}, ${getPrimaryDarkColor()})` }}
        >
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-lg mb-8 opacity-90">
            {t('cta.description')}
          </p>
          <Link
            href="/commencer-gratuitement"
            className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            {common('tryFree')}
          </Link>
        </div>
      </div>
    </div>
  );
}
