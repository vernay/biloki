'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AppBanner() {
  const t = useTranslations('appBanner');
  const tCommon = useTranslations('common');
  
  return (
    <section className="w-full bg-primary py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
            {t('title')}
          </h2>
          <p className="text-sm md:text-xl text-white/90 mb-2 md:mb-3 max-w-xl mx-auto">
            {t('description')}
          </p>
          
          <a 
            href="/reserver-demo"
            className="inline-block mb-2 md:mb-3 px-5 md:px-7 py-2 md:py-2.5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {tCommon('bookYourDemo')}
          </a>
          
          <div className="flex flex-row gap-2 md:gap-3 justify-center items-center">
            {/* Google Play Button */}
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <Image 
                src="/images/footer/Google_Play_Store_badge_FR.svg.png" 
                alt={t('googlePlay')} 
                height={48}
                width={160}
                className="h-9 md:h-11 w-auto"
              />
            </a>

            {/* App Store Button */}
            <a 
              href="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <Image 
                src="/images/footer/App_Store_Badge.svg.png" 
                alt={t('appStore')} 
                height={56}
                width={200}
                className="h-9 md:h-11 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
