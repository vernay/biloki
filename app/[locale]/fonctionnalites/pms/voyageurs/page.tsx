export default function VoyageursPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Gestion des <span className="text-primary">voyageurs</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Centralisez les informations de vos voyageurs et offrez-leur une expérience personnalisée à chaque séjour.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Profils voyageurs</h3>
            <p className="text-gray-700 leading-relaxed">
              Créez et gérez des profils complets pour chaque voyageur : coordonnées, préférences, historique de séjours et notes personnelles.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents & vérifications</h3>
            <p className="text-gray-700 leading-relaxed">
              Collectez et stockez en toute sécurité les documents nécessaires : pièces d'identité, contrats de location et fiches de police.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Historique des séjours</h3>
            <p className="text-gray-700 leading-relaxed">
              Consultez l'historique complet de chaque voyageur : séjours précédents, dépenses, avis laissés et comportement général.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fidélisation clients</h3>
            <p className="text-gray-700 leading-relaxed">
              Identifiez vos voyageurs récurrents et offrez-leur une attention particulière. Personnalisez leur expérience en fonction de leurs préférences.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Fidélisez vos voyageurs</h2>
          <p className="text-lg mb-8 opacity-90">
            Créez des relations durables avec vos clients grâce à une gestion personnalisée.
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
