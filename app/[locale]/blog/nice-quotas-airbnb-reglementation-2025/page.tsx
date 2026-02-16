import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { FREE_TRIAL_CTA } from "@/lib/pricing-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (messages as any).seoMetadata;

  const title = seoMetadata?.["blog-nice"]?.title || "Biloki";
  const description = seoMetadata?.["blog-nice"]?.description || "";

  return {
    title,
    description,
  };
}

export default function NiceQuotasAirbnbPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-primary">Accueil</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary">Blog</a>
            <span>/</span>
            <span className="text-gray-900">Réglementation Nice</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-semibold">
              Actualité
            </span>
            <time dateTime="2025-11-14">14 novembre 2025</time>
            <span>•</span>
            <span>6 min de lecture</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Nice instaure des quotas par quartier pour les locations Airbnb : ce que les conciergeries doivent savoir
          </h1>

          {/* Intro */}
          <p className="text-xl text-gray-700 leading-relaxed">
            Le conseil municipal de Nice a adopté de nouvelles mesures restrictives pour réguler les locations de courte durée. 
            Quotas par quartier, limitation à 90 jours, autorisations de 3 ans non renouvelables... 
            Voici ce que cela change pour votre activité de conciergerie.
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Section 1 : Contexte */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pourquoi Nice durcit sa réglementation ?
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Avec près de <strong>14 000 annonces de locations courte durée</strong>, Nice est la deuxième ville de France 
            après Paris en nombre d'annonces type Airbnb. Un chiffre qui pose problème : les offres de meublés touristiques 
            sont <strong>7 à 10 fois supérieures</strong> aux offres de logements longue durée, alors que la moitié de la 
            population niçoise est locataire.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-6">
            <p className="text-gray-800 font-medium">
              <strong>🏠 Le constat :</strong> « Ce phénomène de locations courte durée vient renforcer la tension immobilière 
              et diminue le nombre de logements locatifs privés pour les actifs niçois », insiste la ville de Nice.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Face à cette pénurie, le maire Christian Estrosi et son premier adjoint Anthony Borré ont décidé de 
            « mettre la pression sur les investisseurs, surtout étrangers ». Les nouvelles mesures ont été adoptées 
            à l'unanimité en conseil municipal.
          </p>
        </section>

        {/* Section 2 : Les nouvelles règles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Les 4 mesures clés à retenir
          </h2>

          <div className="space-y-6">
            {/* Mesure 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Quotas par quartier</h3>
                  <p className="text-gray-700 mb-3">
                    Les quatre secteurs les plus touchés sont désormais soumis à des quotas stricts :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Vieux-Nice</li>
                    <li>Centre-ville</li>
                    <li>Riquier, Port et Mont-Boron</li>
                    <li>Secteur Ouest</li>
                  </ul>
                  <p className="text-gray-700">
                    <strong>Maximum 1,5%</strong> des résidences principales peuvent faire l'objet d'une autorisation 
                    de changement d'usage, soit <strong>671 logements maximum</strong> sur ces quatre secteurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Mesure 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">De 120 à 90 jours de location maximum</h3>
                  <p className="text-gray-700">
                    Les résidences principales mises en location saisonnière ne pourront plus excéder 
                    <strong> 90 jours par an</strong>, contre 120 jours actuellement. Une réduction significative 
                    de 25% du temps de location autorisé.
                  </p>
                </div>
              </div>
            </div>

            {/* Mesure 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Autorisations limitées à 3 ans non renouvelables</h3>
                  <p className="text-gray-700">
                    La durée des autorisations temporaires de changement d'usage passe à <strong>3 ans maximum</strong> 
                    et <strong>non renouvelables</strong>, contre 6 ans renouvelables auparavant.
                  </p>
                </div>
              </div>
            </div>

            {/* Mesure 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Attestation sur l'honneur obligatoire</h3>
                  <p className="text-gray-700">
                    Le propriétaire devra désormais <strong>s'engager par écrit</strong> à respecter le règlement 
                    de copropriété via une attestation sur l'honneur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Bonne nouvelle */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Une bonne nouvelle : le dispositif mixte maintenu
          </h2>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <p className="text-gray-800 font-medium">
              <strong>✅ Location mixte :</strong> Le dispositif dérogatoire de location mixte est maintenu. 
              Cela permet de faire du meublé touristique tout en répondant aux attentes des étudiants 
              (location longue durée pendant l'année scolaire, courte durée l'été).
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Cette mesure est particulièrement intéressante pour les conciergeries qui peuvent ainsi 
            proposer une stratégie hybride à leurs propriétaires, maximisant les revenus tout en 
            restant conformes à la réglementation.
          </p>
        </section>

        {/* Section 4 : Impact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quel impact pour les conciergeries ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Les défis
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Moins de jours de location disponibles (90 vs 120)</li>
                <li>• Quotas limitant le nombre de biens gérables dans certains quartiers</li>
                <li>• Autorisations non renouvelables après 3 ans</li>
                <li>• Paperasse administrative supplémentaire</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> Les opportunités
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Location mixte étudiants/touristes</li>
                <li>• Diversification vers d'autres quartiers</li>
                <li>• Montée en gamme pour maximiser chaque nuitée</li>
                <li>• Gestion plus professionnelle = avantage concurrentiel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 : Comment s'adapter */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Comment s'adapter à ces nouvelles règles ?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Optimisez chaque nuitée</h4>
                <p className="text-gray-700">
                  Avec moins de jours disponibles, chaque réservation compte. Travaillez vos tarifs, 
                  la qualité de vos annonces et votre positionnement pour maximiser le revenu par nuitée.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Proposez la location mixte</h4>
                <p className="text-gray-700">
                  Combinez location étudiante (septembre-juin) et location saisonnière (été). 
                  C'est légal, ça rassure les propriétaires et ça génère des revenus stables.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Automatisez votre gestion</h4>
                <p className="text-gray-700">
                  Avec une réglementation plus stricte, vous ne pouvez plus vous permettre d'erreurs. 
                  Un logiciel de gestion vous aide à suivre les quotas, les jours utilisés et la conformité.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Diversifiez géographiquement</h4>
                <p className="text-gray-700">
                  Explorez les quartiers hors quotas ou les communes voisines comme Villefranche-sur-Mer, 
                  Beaulieu-sur-Mer ou Èze qui peuvent offrir d'autres opportunités.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <section className="bg-primary rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Passez au channel manager intelligent Biloki
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Synchronisation temps réel, plus de 120 OTA connectées, configuration en 10 minutes. 
              Rejoignez les conciergeries qui pilotent leur croissance avec Biloki.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/fr/reserver-demo"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all"
              >
                Réserver une démo gratuite
              </a>
              <a 
                href="/fr/commencer-gratuitement"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all"
              >
                Essayer gratuitement
              </a>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            En résumé
          </h2>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Les nouvelles règles de Nice s'inscrivent dans une tendance nationale de régulation des locations 
              saisonnières. Après Paris, Lyon, Bordeaux et d'autres grandes villes, Nice renforce son arsenal 
              pour préserver son parc locatif.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pour les conciergeries, ces contraintes sont aussi une opportunité de se professionnaliser et 
              de se démarquer. Les acteurs qui sauront s'adapter, diversifier leur offre et automatiser leur 
              gestion sortiront gagnants.
            </p>
            <p className="text-gray-800 font-semibold">
              La clé ? Anticiper plutôt que subir, et utiliser les bons outils pour rester compétitif.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t pt-8">
          <h3 className="font-bold text-gray-900 mb-4">Sources</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>
              • Le Figaro Nice - « Nice instaure des quotas par quartier pour les locations de type Airbnb » - 14 novembre 2025
            </li>
            <li>
              • Conseil municipal de Nice - Délibération du 14 novembre 2025
            </li>
          </ul>
        </section>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles similaires</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/fr/blog/channel-manager-guide-complet-conciergeries" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <span className="text-sm text-primary font-semibold">Guide</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-2">Channel Manager : Le Guide Complet 2026</h3>
              <p className="text-gray-600 text-sm">Synchronisez vos annonces sur toutes les plateformes automatiquement.</p>
            </a>
            <a href="/fr/blog/automatiser-gestion-locations-saisonnieres" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <span className="text-sm text-primary font-semibold">Automatisation</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-2">Automatiser sa gestion de locations</h3>
              <p className="text-gray-600 text-sm">Gagnez du temps et évitez les erreurs avec l'automatisation.</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
