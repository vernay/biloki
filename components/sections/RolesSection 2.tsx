'use client';

import { useTranslations } from 'next-intl';

interface RoleConfig {
  id: string;
  translationKey: string;
  icon: string;
  image: string;
  color: string;
  link: string;
}

const ROLES_CONFIG: RoleConfig[] = [
  {
    id: 'gestionnaire',
    translationKey: 'gestionnaire',
    icon: '📋',
    image: '/images/interfaces/gestionnaire.png',
    color: '#0284c7',
    link: '/fonctionnalites/4-interfaces#gestionnaire'
  },
  {
    id: 'locataire',
    translationKey: 'locataire',
    icon: '🏠',
    image: '/images/interfaces/locataire.png',
    color: '#ff8c42',
    link: '/fonctionnalites/4-interfaces#locataire'
  },
  {
    id: 'proprietaire',
    translationKey: 'proprietaire',
    icon: '💼',
    image: '/images/interfaces/proprietaire.png',
    color: '#38bdf8',
    link: '/fonctionnalites/4-interfaces#proprietaire'
  },
  {
    id: 'prestataire',
    translationKey: 'prestataire',
    icon: '🔧',
    image: '/images/interfaces/prestataire.png',
    color: '#22c55e',
    link: '/fonctionnalites/4-interfaces#prestataire'
  }
];

export default function RolesSection() {
  const t = useTranslations('roles');
  const tCommon = useTranslations('common');

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-[var(--biloki-blue)]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Roles Grid: 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLES_CONFIG.map((role) => {
            const details = t.raw(`${role.translationKey}.details`) as string[];
            
            return (
              <a
                key={role.id}
                href={role.link}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[var(--biloki-blue)] hover:shadow-lg transition-all duration-200 flex flex-col h-full cursor-pointer group"
              >
                {/* Image */}
                <div className="mb-4 -mx-6 -mt-6 bg-gray-50">
                  <img 
                    src={role.image} 
                    alt={t(`${role.translationKey}.label`)}
                    className="w-full h-48 object-contain rounded-t-2xl group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(`${role.translationKey}.label`)}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {t(`${role.translationKey}.description`)}
                </p>

                {/* Details */}
                <ul className="space-y-2 flex-grow">
                  {details.map((detail: string, index: number) => {
                    const parts = detail.split(':');
                    const hasTitle = parts.length > 1;
                    const title = hasTitle ? parts[0].trim() : '';
                    const description = hasTitle ? parts.slice(1).join(':').trim() : detail;
                    
                    return (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span className="text-gray-700 text-sm">
                          {hasTitle ? (
                            <>
                              <strong>{title}</strong> : {description}
                            </>
                          ) : (
                            detail
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 text-[var(--biloki-blue)] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    {tCommon('learnMore')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
