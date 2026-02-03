export default function TableauBordPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Tableau de bord <span className="text-primary">global</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Visualisez l'ensemble de votre activité en un coup d'œil : réservations, revenus, taux d'occupation et performances de vos logements.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vue d'ensemble en temps réel</h3>
            <p className="text-gray-700 leading-relaxed">
              Suivez vos indicateurs clés de performance (KPI) en temps réel : taux d'occupation, revenus journaliers, nombre de réservations actives et prochaines arrivées/départs.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Statistiques avancées</h3>
            <p className="text-gray-700 leading-relaxed">
              Analysez les performances par logement, par période ou par canal de réservation. Identifiez rapidement les tendances et optimisez votre stratégie.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Widgets personnalisables</h3>
            <p className="text-gray-700 leading-relaxed">
              Configurez votre tableau de bord selon vos besoins. Ajoutez, supprimez ou réorganisez les widgets pour afficher uniquement les informations qui vous importent.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Alertes intelligentes</h3>
            <p className="text-gray-700 leading-relaxed">
              Recevez des notifications automatiques pour les événements importants : nouvelle réservation, annulation, problème de synchronisation ou objectif atteint.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à optimiser votre gestion ?</h2>
          <p className="text-lg mb-8 opacity-90">
            Découvrez comment Biloki peut transformer la gestion de votre conciergerie.
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
