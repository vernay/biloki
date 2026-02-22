'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import RelatedPages from '@/components/ui/RelatedPages';

export default function PMSPage() {
  const t = useTranslations('featuresPages.pms');
  const common = useTranslations('common');
  const relatedT = useTranslations('relatedPages');
  const locale = useLocale();

  const sectionKeys = ['reservations', 'channelManager', 'operations', 'communication', 'access', 'billing', 'reporting'] as const;
  const icons = ['📅', '🌐', '⚙️', '💬', '🔐', '💰', '📊'];

  const sections = sectionKeys.map((key, index) => ({
    title: t(`sections.${key}.title`),
    description: t(`sections.${key}.description`),
    icon: icons[index],
    features: t.raw(`sections.${key}.features`) as string[],
    anchor: key === 'billing' ? 'facturation-commissions' : undefined
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Title with gradient */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          {t('description')}
        </p>

        {/* Sections Grid */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              id={section.anchor}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {/* Visual Side */}
                <div className={`hidden md:flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 p-12 group-hover:scale-105 transition-transform duration-300 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="text-6xl">{section.icon}</div>
                </div>

                {/* Content Side */}
                <div className={`md:col-span-2 p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl flex-shrink-0 mt-1 md:hidden">{section.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                      {section.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="space-y-3">
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {t('withBiloki')}
                    </p>
                    <ul className="space-y-2.5">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-primary rounded-[48px] p-12 md:p-16 text-white text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/reserver-demo" 
                className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {t('bookDemo')}
              </Link>
              <Link 
                href="/commencer-gratuitement" 
                className="inline-block bg-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                {t('freeTrial')}
              </Link>
            </div>
          </div>
        </div>

        {/* Pages connexes pour SEO */}
        <RelatedPages
          title={common('relatedPages')}
          links={[
            {
              href: `/${locale}/fonctionnalites/channel-manager`,
              title: relatedT('channelManager.title'),
              description: relatedT('channelManager.description')
            },
            {
              href: `/${locale}/tarifs`,
              title: relatedT('pricing.title'),
              description: relatedT('pricing.description')
            },
            {
              href: `/${locale}/connexions-api`,
              title: relatedT('apiConnections.title'),
              description: relatedT('apiConnections.description')
            },
            {
              href: `/${locale}/commencer-gratuitement`,
              title: relatedT('trial.title'),
              description: relatedT('trial.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            },
            {
              href: `/${locale}/blog`,
              title: relatedT('blog.title'),
              description: relatedT('blog.description')
            }
          ]}
          className="mt-16 mb-16"
        />
      </div>
    </main>
  );
}
