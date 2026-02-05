import { useTranslations } from 'next-intl';

export default function EquipePage() {
  const t = useTranslations('teamPage');
  const common = useTranslations('common');

  const teamMembers: Array<{
    name: string;
    role: string;
    initials: string;
    photo?: string;
    photoPosition?: string;
    linkedin?: string;
  }> = [
    {
      name: 'Sebastien Vernay',
      role: t('roles.founder'),
      initials: 'SV',
      photo: '/images/equipe/Sebastien.png',
      photoPosition: '50% 10%',
      linkedin: 'https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/'
    },
    {
      name: 'Antonio Silva Neto',
      role: t('roles.coFounder'),
      initials: 'AS',
      photo: '/images/equipe/Antonio.png',
      linkedin: 'https://www.linkedin.com/in/antonio-silva-neto-831344117/'
    },
    {
      name: 'Enzo Michaud',
      role: t('roles.fullStackJunior'),
      initials: 'EM',
      photo: '/images/equipe/Enzo.png',
      linkedin: 'https://www.linkedin.com/in/enzo-michaud-a19979180/'
    },
    {
      name: 'Léo',
      role: t('roles.crmExpert'),
      initials: 'L',
      photo: '/images/equipe/Leo.png',
      linkedin: 'https://www.linkedin.com/in/l%C3%A9o-jacqueline/'
    },
    {
      name: 'Grégoire Vernay',
      role: t('roles.salesMarketingManager'),
      initials: 'GV',
      photo: '/images/equipe/Greg.png',
      linkedin: 'https://www.linkedin.com/in/gregoirevernay/'
    },
    {
      name: 'Eddy Tredan',
      role: t('roles.devExpert'),
      initials: 'ET',
      linkedin: 'https://www.linkedin.com/in/eddy-tr%C3%A9dan-7b2238239/'
    },
    {
      name: 'Bryan Montassier',
      role: t('roles.fullStackSenior'),
      initials: 'BM',
      photo: '/images/equipe/Bryan.png',
      linkedin: 'https://www.linkedin.com/in/bryanmtr/'
    },
  ];

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

        {/* Team Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {member.photo ? (
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-primary/10">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale"
                          style={{ objectPosition: member.photoPosition ?? '50% 0%' }}
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                        {member.initials}
                      </div>
                    )}
                    <div className="absolute -right-2 -bottom-2 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center mt-1">{member.role}</p>
                <div className="mt-4 flex justify-center">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.79v2.18h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.34 6 7.68V24h-5v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V24h-5V8z" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary/60">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.79v2.18h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.34 6 7.68V24h-5v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V24h-5V8z" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reserver-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t('meetTeam')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              {common('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
