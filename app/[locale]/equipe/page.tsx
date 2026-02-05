import { useTranslations } from 'next-intl';

export default function EquipePage() {
  const t = useTranslations('teamPage');
  const common = useTranslations('common');

  const teamMembers = [
    { name: 'Sebastien Vernay', role: 'Founder', initials: 'SV', photo: '/images/equipe/Sebastien.png' },
    { name: 'Antonio Silva Neto', role: 'Co-founder', initials: 'AS', photo: '/images/equipe/Antonio.png' },
    { name: 'Enzo Michaud', role: 'Développeur junior full stack', initials: 'EM', photo: '/images/equipe/Enzo.png' },
    { name: 'Léo', role: 'Expert CRM', initials: 'L', photo: '/images/equipe/Leo.png' },
    { name: 'Grégoire Vernay', role: 'Sales & Marketing manager', initials: 'GV', photo: '/images/equipe/Greg.png' },
    { name: 'Eddy Tredan', role: 'Expert développement', initials: 'ET' },
    { name: 'Bryan Montassier', role: 'Développeur senior full stack', initials: 'BM', photo: '/images/equipe/Bryan.png' },
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
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-28 h-28 rounded-full object-cover bg-primary/10"
                      />
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
