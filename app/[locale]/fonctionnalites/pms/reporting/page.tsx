export default function ReportingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Reporting & <span className="text-primary">performance</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Analysez vos performances en détail avec des rapports complets et des indicateurs clés pour piloter votre activité.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tableaux de bord détaillés</h3>
            <p className="text-gray-700 leading-relaxed">
              Visualisez vos KPI essentiels : taux d'occupation, RevPAR, ADR, revenus nets et performances par logement. Comparez les périodes et identifiez les tendances.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">💹</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyses financières</h3>
            <p className="text-gray-700 leading-relaxed">
              Suivez vos revenus, dépenses, commissions et rentabilité. Générez des rapports financiers pour vos propriétaires et votre comptabilité.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapports personnalisables</h3>
            <p className="text-gray-700 leading-relaxed">
              Créez des rapports sur-mesure en sélectionnant les métriques qui vous intéressent. Exportez-les en PDF ou Excel pour les partager facilement.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prévisions & objectifs</h3>
            <p className="text-gray-700 leading-relaxed">
              Définissez des objectifs de performance et suivez leur réalisation en temps réel. Utilisez les prévisions pour anticiper vos revenus futurs.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Pilotez par la data</h2>
          <p className="text-lg mb-8 opacity-90">
            Prenez des décisions éclairées grâce à des analyses précises et complètes.
          </p>
          <a
            href="/commencer-gratuitement"
            className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Essayer gratuitement
          </a>
        </div>
      </div>
    </div>
  );
}
