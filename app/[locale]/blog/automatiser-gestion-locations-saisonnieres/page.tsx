import { Metadata } from "next";
import { FREE_TRIAL_CTA } from "@/lib/pricing-config";

export const metadata: Metadata = {
  title: "Comment automatiser la gestion de ses locations saisonnières en 2026 | Biloki",
  description: "Automatisez vos locations saisonnières : 5 automatisations clés (messagerie, tarifs, ménage, accès, compta) pour gagner 20h/semaine et éviter les erreurs.",
  keywords: "automatisation location saisonnière, automatiser conciergerie, workflows airbnb booking, messages automatiques, ménage planification",
};

export default function AutomatiserLocationsPage() {
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
            <span className="text-gray-900">Automatisation</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-primary px-4 py-1.5 rounded-full font-semibold">Automatisation</span>
            <time dateTime="2026-01-20">20 janvier 2026</time>
            <span>•</span>
            <span>8 min de lecture</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Comment automatiser la gestion de ses locations saisonnières en 2026
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed">
            Emails, clés, ménage, tarifs, compta : les tâches s'accumulent vite. Voici un plan concret en 5 automatisations
            pour gagner du temps, réduire les erreurs et améliorer l'expérience voyageurs.
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Pourquoi automatiser */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi automatiser maintenant ?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les voyageurs s'attendent à des réponses en minutes, à un check-in simple et à des logements impeccables. Les
            conciergeries qui n'automatisent pas finissent par perdre du temps, des notes et des opportunités de marge.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Gagner 10 à 20 heures/semaine dès 10 logements.</li>
            <li>Réduire les erreurs humaines (double réservations, oublis d'accès, ménage).</li>
            <li>Améliorer la satisfaction et les notes voyageurs (réactivité + clarté).</li>
            <li>Standardiser vos process pour former plus vite vos équipes.</li>
          </ul>
        </section>

        {/* Les 5 automatisations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Les 5 automatisations clés à mettre en place</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1) Messagerie voyageurs multicanal</h3>
              <p className="text-gray-700 mb-3">Déclenchez automatiquement les messages essentiels : demande, confirmation, accès, accueil, suivi, départ.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>J-2 : instructions d'accès + Google Maps + code du coffre.</li>
                <li>Jour J : message d'accueil + numéro d'astreinte.</li>
                <li>J+1 : check de satisfaction pour détecter les irritants.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2) Planning ménage et maintenance</h3>
              <p className="text-gray-700 mb-3">Générez des tickets automatiquement après chaque check-out confirmé.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Assignation automatique aux prestataires selon la zone.</li>
                <li>Checklist standardisée (linge, consommables, photos avant/après).</li>
                <li>Notifications push/SMS aux équipes terrain.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3) Tarifs et disponibilité synchronisés</h3>
              <p className="text-gray-700 mb-3">Unifiez vos calendriers et appliquez des règles de prix dynamiques.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Blocage instantané sur tous les canaux (Airbnb, Booking, Vrbo).</li>
                <li>Majoration week-end, baisse last-minute, planchers par canal.</li>
                <li>Protection contre les doubles réservations.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">4) Accès et sécurité</h3>
              <p className="text-gray-700 mb-3">Automatisez l'envoi des codes d'accès et leur renouvellement.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Codes uniques par séjour (serrures connectées ou coffres).</li>
                <li>Expiration automatique à la sortie.</li>
                <li>Journalisation des accès pour tracer les incidents.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">5) Facturation et comptabilité</h3>
              <p className="text-gray-700 mb-3">Réduisez le temps passé en back-office.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Factures automatiques à chaque séjour (TVA, frais de ménage, options).</li>
                <li>Exports comptables mensuels prêts à importer.</li>
                <li>Suivi des règlements et relances automatiques.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA contextuel */}
        <section className="mb-12">
          <div className="bg-primary text-white p-8 rounded-[32px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold mb-2">Déployez vos automatisations en 15 minutes</h3>
              <p className="text-white/90 max-w-2xl">Biloki combine PMS, channel manager, messagerie et workflows prêts à l'emploi. Connectez vos annonces, choisissez vos déclencheurs, activez.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/reserver-demo" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all">
                Réserver une démo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="/commencer-gratuitement" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-md">
                {FREE_TRIAL_CTA}
              </a>
            </div>
          </div>
        </section>

        {/* Plan d'action */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Plan d'action 30 jours</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Semaine 1-2</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Normaliser vos templates de messages (FR/EN).</li>
                <li>Connecter vos canaux (Airbnb, Booking, Vrbo).</li>
                <li>Activer les messages demande/confirmation/J-2/Jour J/J+1/J-1.</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Semaine 3-4</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Automatiser le planning ménage + notifications prestataires.</li>
                <li>Paramétrer les règles tarifaires par canal et last-minute.</li>
                <li>Mettre en place les exports comptables et relances auto.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact chiffré */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact chiffré observé chez nos clients</h2>
          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <h3 className="text-xl font-bold mb-2">Temps</h3>
                <p>12 à 18 h économisées / semaine dès 15 logements.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Satisfaction</h3>
                <p>+0,3 à +0,5 sur la note moyenne grâce à la réactivité et aux infos claires.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Incidents</h3>
                <p>-40 % d'appels liés à l'accès lorsque les instructions sont envoyées en J-2.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Revenu</h3>
                <p>+10-15 % de conversion sur les demandes grâce aux réponses instantanées.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion + CTA final */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion : moins d'opérations, plus de croissance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Automatiser vos locations, c'est standardiser ce qui doit l'être (messages, accès, ménage, factures) pour libérer du temps sur ce qui fait la différence : relation voyageurs, optimisation des revenus, développement du parc.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            En 2026, les conciergeries performantes opèrent avec des workflows clairs et des déclencheurs automatiques. Passez à l'action en priorisant ces 5 automatisations.
          </p>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Automatisez vos séjours avec Biloki</h3>
              <p className="text-lg mb-8 opacity-90">Messagerie, planning ménage, tarifs dynamiques, accès et compta intégrés. Configuration en 15 minutes.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/reserver-demo" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white font-bold rounded-lg text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Réserver ma démo
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="/commencer-gratuitement" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 font-bold rounded-lg text-lg hover:shadow-xl transition-all duration-300">
                  {FREE_TRIAL_CTA}
                </a>
              </div>
              <p className="text-sm mt-6 opacity-75">Sans engagement • Support francophone • Workflows préconfigurés</p>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <div className="text-center mt-12 pt-8 border-t">
          <a href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour au blog
          </a>
        </div>
      </article>
    </main>
  );
}
