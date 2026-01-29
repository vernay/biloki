import { useTranslations } from 'next-intl';

export default function CarrierePage() {
  const t = useTranslations('careersPage');
  const common = useTranslations('common');

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Offres d'emploi */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('jobsTitle')}
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('filtersTitle')}
            </h3>
            {(() => {
              const departmentOptions = [
                t('deptMarketing'),
                t('deptProduct'),
                t('deptDevelopment'),
                t('deptSales'),
              ];
              const locationOptions = [t('locationNantes'), t('locationParis')];
              const workTypeOptions = [
                t('workTypeInternship'),
                t('workTypeApprenticeship'),
                t('workTypePermanent'),
                t('workTypeFixedTerm'),
                t('workTypeFreelance'),
                t('workTypeOther'),
              ];

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">{t('departments')}</span>
                    <div className="mt-2 relative">
                      <select
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 shadow-sm focus:outline-none"
                      >
                        <option>{t('allOption')}</option>
                        {departmentOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        ▼
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">{t('locations')}</span>
                    <div className="mt-2 relative">
                      <select
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 shadow-sm focus:outline-none"
                      >
                        <option>{t('allOption')}</option>
                        {locationOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        ▼
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">{t('workType')}</span>
                    <div className="mt-2 relative">
                      <select
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 shadow-sm focus:outline-none"
                      >
                        <option>{t('allOption')}</option>
                        {workTypeOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        ▼
                      </span>
                    </div>
                  </label>
                </div>
              );
            })()}

            <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
              <p className="text-base font-medium">{t('emptyTitle')}</p>
              <p className="text-sm mt-1">{t('emptySubtitle')}</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('whyJoinUs')}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {t('whyJoinUsText')}
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('benefit1Title')}
              </h3>
              <p className="text-gray-700">
                {t('benefit1Description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('benefit2Title')}
              </h3>
              <p className="text-gray-700">
                {t('benefit2Description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('benefit3Title')}
              </h3>
              <p className="text-gray-700">
                {t('benefit3Description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('benefit4Title')}
              </h3>
              <p className="text-gray-700">
                {t('benefit4Description')}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary rounded-2xl shadow-lg p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              {t('ctaDescription')}
            </p>
            <a
              href="mailto:careers@biloki.com"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all"
            >
              {t('ctaButton')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
