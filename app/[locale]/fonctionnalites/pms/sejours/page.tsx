export default function SejoursPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Gestion des <span className="text-primary">séjours</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Suivez et pilotez l'ensemble du cycle de vie de vos réservations, de l'arrivée au départ.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Calendrier intelligent</h3>
            <p className="text-gray-700 leading-relaxed">
              Visualisez toutes vos réservations sur un calendrier unifié. Identifiez rapidement les arrivées, départs, séjours en cours et périodes disponibles.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Suivi automatisé</h3>
            <p className="text-gray-700 leading-relaxed">
              Automatisez le suivi des réservations : confirmation, préparation du logement, accueil voyageur, ménage de départ et clôture du séjour.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion financière</h3>
            <p className="text-gray-700 leading-relaxed">
              Suivez les paiements, frais et commissions pour chaque séjour. Calculez automatiquement les revenus nets et générez des rapports détaillés.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Notes et historique</h3>
            <p className="text-gray-700 leading-relaxed">
              Ajoutez des notes sur chaque séjour, consultez l'historique des actions et partagez les informations importantes avec votre équipe.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Optimisez vos séjours</h2>
          <p className="text-lg mb-8 opacity-90">
            Automatisez la gestion de vos réservations et gagnez un temps précieux.
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
