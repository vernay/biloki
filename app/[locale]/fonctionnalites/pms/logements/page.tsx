export default function LogementsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Gestion des <span className="text-primary">logements</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Centralisez toutes les informations de vos propriétés : caractéristiques, équipements, photos, accès et documentation.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fiches logements complètes</h3>
            <p className="text-gray-700 leading-relaxed">
              Créez des fiches détaillées pour chaque propriété : nombre de chambres, équipements, règlement intérieur, instructions d'accès et contacts d'urgence.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Galeries photos</h3>
            <p className="text-gray-700 leading-relaxed">
              Stockez et organisez toutes vos photos par logement. Utilisez-les automatiquement pour vos annonces et le guide voyageur digital.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion des accès</h3>
            <p className="text-gray-700 leading-relaxed">
              Configurez les systèmes d'accès pour chaque logement : serrures connectées, codes, clés traditionnelles ou badges. Synchronisez automatiquement avec les séjours.
            </p>
          </div>

          <div className="bg-[#f8fbff] border border-[#e3eef9] rounded-2xl p-8">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Documentation centralisée</h3>
            <p className="text-gray-700 leading-relaxed">
              Stockez tous les documents importants : contrats, plans, manuels d'équipements et contacts fournisseurs. Accessibles à tout moment par votre équipe.
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Centralisez vos logements</h2>
          <p className="text-lg mb-8 opacity-90">
            Gérez toutes vos propriétés depuis une interface unique et intuitive.
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
