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

  const title = seoMetadata?.["blog-messaging"]?.title || "Biloki";
  const description = seoMetadata?.["blog-messaging"]?.description || "";

  return {
    title,
    description,
  };
}

export default function MessagerieAutomatiseePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-primary">Accueil</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary">Blog</a>
            <span>/</span>
            <span className="text-gray-900">Messagerie automatisée</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-primary px-4 py-1.5 rounded-full font-semibold">Automatisation</span>
            <time dateTime="2026-01-20">20 janvier 2026</time>
            <span>•</span>
            <span>9 min de lecture</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Messagerie automatisée : scripts et workflows pour conciergeries
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed">
            Les voyageurs attendent des réponses en quelques minutes. Automatiser vos messages pré-séjour, check-in
            et post-séjour vous fait gagner du temps tout en améliorant l'expérience. Voici les scripts prêts à l'emploi
            et les déclencheurs à mettre en place dès maintenant.
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Pourquoi automatiser */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi automatiser la messagerie ?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pour une conciergerie, chaque minute compte : vérifications, check-in, ménage, maintenance. La messagerie
            est indispensable, mais chronophage. L'automatisation vous aide à :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Répondre en moins de 5 minutes, même la nuit ou le week-end.</li>
            <li>Standardiser le ton et les informations critiques (accès, règles, urgences).</li>
            <li>Réduire les frictions : moins d'appels, moins de questions répétitives.</li>
            <li>Améliorer les notes voyageurs (réactivité + clarté = meilleures évaluations).</li>
          </ul>
        </section>

        {/* Scripts essentiels */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Les 6 messages à automatiser en priorité</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Déployez ces scripts dans votre channel manager ou PMS pour couvrir 90 % des échanges voyageurs.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Réponse instantanée à une demande</h3>
              <p className="text-gray-700 mb-2">Objectif : rassurer et donner envie de confirmer.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Bonjour [prenom], merci pour votre intérêt ! Le logement est disponible aux dates demandées. 
                Voici les points clés :
                • Check-in autonome 24/7
                • Wifi fibre, literie hôtel, ménage pro
                • Parking gratuit sur place
                Une question ? Je réponds en quelques minutes.
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Confirmation de réservation</h3>
              <p className="text-gray-700 mb-2">Objectif : poser le cadre et limiter les questions ultérieures.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Réservation confirmée 🎉
                Adresse : [adresse]
                Check-in : [heure_checkin] | Check-out : [heure_checkout]
                Règlement : pas de fêtes, non-fumeur, respect du voisinage.
                Nous vous enverrons les instructions d'accès 48h avant l'arrivée.
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Instructions d'accès (J-2)</h3>
              <p className="text-gray-700 mb-2">Objectif : éviter les appels le jour J.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Bonjour [prenom], voici vos instructions d'accès :
                • Code du coffre : [code]
                • Adresse exacte + Google Maps : [lien_maps]
                • Parking : [details_parking]
                • Wifi : [wifi]
                • Contact urgence : [telephone_astreinte]
                Bonne route !
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Message d'accueil (jour J)</h3>
              <p className="text-gray-700 mb-2">Objectif : montrer votre présence et prévenir les problèmes.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Bienvenue [prenom] ! Avez-vous pu entrer sans souci ?
                Si besoin, je suis joignable au [telephone_astreinte].
                Petite astuce : [tip_local] (ex : meilleure boulangerie à 2 min).
                Bon séjour !
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">5. Pendant le séjour (J+1)</h3>
              <p className="text-gray-700 mb-2">Objectif : détecter les irritants avant qu'ils ne deviennent des avis négatifs.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Bonjour [prenom], tout va bien ?
                Si vous manquez de quoi que ce soit (linge, capsules, ventilateur), dites-le-moi. 
                Je passe vérifier la boîte à clés cet après-midi, tout est ok de votre côté ?
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">6. Pré-check-out (J-1) et remerciement</h3>
              <p className="text-gray-700 mb-2">Objectif : fluidifier la sortie et encourager l'avis.</p>
              <div className="bg-white border-2 border-blue-100 rounded-xl p-4 text-gray-800">
                Check-out demain avant [heure_checkout]. Merci de :
                • Laisser les clés dans le coffre
                • Sortir les poubelles
                • Fermer les fenêtres
                Merci pour votre séjour ! Si tout s'est bien passé, votre avis compte beaucoup pour nous 🙏
              </div>
            </div>
          </div>
        </section>

        {/* CTA contextuel */}
        <section className="mb-12">
          <div className="bg-primary text-white p-8 rounded-[32px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold mb-2">Déployez ces messages en 15 minutes avec Biloki</h3>
              <p className="text-white/90 max-w-2xl">
                Connectez vos annonces, choisissez vos déclencheurs, activez les workflows préconfigurés (Airbnb, Booking, Vrbo) et personnalisez vos scripts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/reserver-demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Réserver une démo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/commencer-gratuitement"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-md"
              >
                {FREE_TRIAL_CTA}
              </a>
            </div>
          </div>
        </section>

        {/* Workflows */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Workflows types et déclencheurs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Workflow 1 : cycle de séjour</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Demande reçue → réponse instantanée</li>
                <li>• Réservation confirmée → message récap</li>
                <li>• J-2 → instructions d'accès</li>
                <li>• Jour J → accueil et vérification d'entrée</li>
                <li>• J+1 → check de satisfaction</li>
                <li>• J-1 → rappel check-out + avis</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Workflow 2 : incidents et urgences</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Déclencheur : mot-clé "problème" ou "panne" dans un message</li>
                <li>• Réponse automatique : accusé, ETA du support, numéro d'astreinte</li>
                <li>• Escalade : assignation à un agent + SMS</li>
                <li>• Suivi : message de résolution + demande de confirmation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bonnes pratiques */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Bonnes pratiques de messagerie</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-gray-900">Clarté et personnalisation</h3>
              <p className="text-gray-700 text-sm">Adresse, codes, horaires : toujours en haut du message. Ajoutez une phrase personnalisée (nom, motif du séjour si connu).</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-gray-900">Timing précis</h3>
              <p className="text-gray-700 text-sm">J-2 pour l'accès, J+1 pour le check de satisfaction, J-1 pour le départ. Plus tôt = questions inutiles, plus tard = stress.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-gray-900">Numéro d'urgence visible</h3>
              <p className="text-gray-700 text-sm">Placez le numéro d'astreinte dans chaque message clé pour éviter les escalades inutiles.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-gray-900">Gestion multilingue</h3>
              <p className="text-gray-700 text-sm">Préparez au moins FR/EN. Biloki détecte la langue du voyageur et envoie la version correspondante.</p>
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact chiffré</h2>
          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <h3 className="text-xl font-bold mb-2">Temps économisé</h3>
                <p>5 à 8 min par message x 6 messages x 20 séjours/mois = ~12 h économisées.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Notes voyageurs</h3>
                <p>+0,2 à +0,4 points en moyenne grâce à la réactivité et aux infos claires (observé chez les clients Biloki).</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Moins d'appels</h3>
                <p>-40 % d'appels le jour J lorsque les instructions d'accès sont envoyées en J-2.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Conversion</h3>
                <p>Réponse instantanée = +15 % de demandes converties en réservation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion : l'automatisation comme standard de service</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Automatiser votre messagerie ne remplace pas l'humain : cela garantit qu'aucune information critique ne manque,
            que chaque voyageur est rassuré, et que votre équipe se concentre sur les situations à forte valeur ajoutée.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            En 2026, la réactivité n'est plus un avantage compétitif, c'est un prérequis. Les conciergeries qui standardisent
            leurs scripts et workflows voient moins d'incidents, de meilleures notes et plus de temps pour développer leur parc.
          </p>

          {/* CTA final fort */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Activez la messagerie intelligente Biloki</h3>
              <p className="text-lg mb-8 opacity-90">
                Workflows préconfigurés, détection de langue, escalade incidents et envoi multicanal (email, SMS, OTA) en moins de 15 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/reserver-demo"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white font-bold rounded-lg text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Réserver ma démo
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/commencer-gratuitement"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 font-bold rounded-lg text-lg hover:shadow-xl transition-all duration-300"
                >
                  {FREE_TRIAL_CTA}
                </a>
              </div>
              <p className="text-sm mt-6 opacity-75">Sans engagement • Support francophone • Templates inclus</p>
            </div>
          </div>
        </section>

        {/* Notes finales SEO / maillage */}
        <section className="border-t pt-10 mt-6 space-y-4 text-gray-800">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Maillage interne suggéré</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><a className="text-primary hover:underline" href="/blog/channel-manager-guide-complet-conciergeries">Channel Manager : guide complet</a></li>
              <li><a className="text-primary hover:underline" href="/blog/automatiser-gestion-locations-saisonnieres">Automatiser la gestion des locations</a></li>
              <li><a className="text-primary hover:underline" href="/fonctionnalites/messagerie">Fonctionnalité messagerie Biloki</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Variations de CTA</h3>
            <p className="text-gray-700"><strong>Soft :</strong> "Voir un exemple de workflow Biloki" (lien vers une vidéo ou capture). <strong>Hard :</strong> "Réserver une démo Biloki" (lien direct démo).</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ciblage mots-clés</h3>
            <p className="text-gray-700">
              Mot-clé principal : messagerie automatisée conciergerie. Secondaires : messages Airbnb automatiques, workflow voyageurs, template message check-in.
            </p>
          </div>
        </section>

        {/* Back to blog */}
        <div className="text-center mt-12 pt-8 border-t">
          <a href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au blog
          </a>
        </div>
      </article>
    </main>
  );
}
