export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Tarifs & <span className="text-primary">disponibilités</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Gérez et synchronisez vos tarifs sur toutes vos plateformes depuis une interface unique. Optimisez vos revenus avec la tarification dynamique.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion centralisée des tarifs</h3>
            <p className="text-gray-700 leading-relaxed">
              Modifiez vos prix une seule fois dans Biloki et ils se mettent à jour automatiquement sur Airbnb, Booking.com et toutes vos autres plateformes connectées.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tarification dynamique</h3>
            <p className="text-gray-700 leading-relaxed">
              Optimisez automatiquement vos tarifs en fonction de la demande, de la saison, des événements locaux et de votre taux d'occupation. Maximisez vos revenus sans effort.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tarifs par saison</h3>
            <p className="text-gray-700 leading-relaxed">
              Créez des grilles tarifaires saisonnières et appliquez-les à tous vos logements. Définissez des prix spéciaux pour les week-ends, vacances et événements.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Règles de tarification</h3>
            <p className="text-gray-700 leading-relaxed">
              Configurez des règles personnalisées : tarifs dégressifs pour les longs séjours, majorations de dernière minute, et prix minimum par nuitée.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Optimisez vos revenus</h2>
          <p className="text-lg mb-8 opacity-90">
            Gérez vos tarifs efficacement et maximisez votre taux d'occupation.
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
