import type { BlogArticle } from "../types";

const article: BlogArticle = {
  slug: "api-meubles-airbnb-abritel-reglementation-2026",
  category: "regulation",
  date: "2026-03-25",
  readTime: "8 min",
  image: "/images/blog/Marteau-justice.jpg",
  ogImage: "/images/blog/Marteau-og.jpg",
  featured: true,
  relatedSlugs: [
    "loi-le-meur-2026-location-saisonniere",
    "numero-enregistrement-obligatoire-meubles-tourisme",
    "nice-quotas-airbnb-reglementation-2025",
  ],
  translations: {
    fr: {
      title:
        "API Meubles : ce que tout propriétaire sur Airbnb ou Abritel doit savoir en 2026",
      excerpt:
        "Depuis le 21 mars 2026, l’API Meubles automatise le contrôle des annonces de location touristique par les communes. Plafond des 120 jours, données collectées, amendes, obligations pratiques : le point complet pour rester conforme.",
      tags: [
        "api meubles",
        "airbnb reglementation 2026",
        "abritel obligations proprietaire",
        "location saisonniere 120 jours",
        "decret 2026 196",
        "decret 2026 197",
        "conformite meuble tourisme",
      ],
      content: `
        <div class="space-y-8">
          <section>
            <p class="text-xl text-gray-700 leading-relaxed mb-6">
              La régulation des meublés de tourisme entre dans une nouvelle ère. Deux ans après le vote de la loi Échaniz-Le Meur, les décrets n 2026-196 et n 2026-197 du 19 mars 2026 rendent opérationnel un dispositif attendu : <strong>l’API Meubles</strong>.
            </p>
            <p class="text-gray-700 leading-relaxed mb-6">
              Depuis le 21 mars 2026, les plateformes comme Airbnb, Abritel ou Booking doivent transmettre des données standardisées à la Direction Générale des Entreprises (DGE), qui les redistribue ensuite aux communes et intercommunalités habilitées. Résultat : le contrôle devient <strong>automatique, régulier et traçable</strong>.
            </p>
            <div class="bg-blue-50 border border-primary/30 rounded-2xl p-6">
              <p class="text-gray-800 font-semibold mb-2">Ce qui change concrètement</p>
              <p class="text-gray-700">
                Les mairies n’ont plus besoin d’envoyer des demandes manuelles à chaque plateforme. Elles accèdent à des données consolidées via un guichet unique, ce qui accélère les contrôles et limite les zones grises.
              </p>
            </div>
          </section>

          <section id="api-meubles-definition">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">API Meubles : définition simple</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              L’API Meubles est une infrastructure nationale de transmission de données sur la location touristique. Son rôle est de centraliser les informations remontées par les plateformes pour permettre aux pouvoirs publics de vérifier l’activité des meublés de tourisme.
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              En phase de test depuis 2025, le dispositif est maintenant actif. Plus de 800 communes sont déjà concernées, avec une généralisation prévue au dernier trimestre 2026.
            </p>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-4">
              <p class="text-gray-800 font-semibold mb-2">Qui est concerné ?</p>
              <ul class="space-y-2 text-gray-700 ml-6">
                <li>• Si vous louez votre <strong>résidence principale</strong>, vous devez suivre le plafond de 120 jours (ou 90 jours selon la commune).</li>
                <li>• Si vous louez une <strong>résidence secondaire</strong>, des obligations locales supplémentaires peuvent s’appliquer (autorisation, changement d’usage, enregistrement).</li>
                <li>• Si vous êtes <strong>personne physique ou personne morale</strong>, vos données d’activité peuvent être transmises et contrôlées dans ce cadre.</li>
                <li>• Si vous êtes <strong>conciergerie ou mandataire</strong>, vous devez sécuriser la conformité des annonces gérées pour le compte de vos clients.</li>
              </ul>
            </div>
            <p class="text-gray-700 leading-relaxed">
              Pour comprendre le cadre global, vous pouvez aussi lire notre analyse de la <a href="/fr/blog/loi-le-meur-2026-location-saisonniere" class="text-primary hover:underline">loi Le Meur 2026 et ses obligations</a>.
            </p>
          </section>

          <section id="plafond-120-jours">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Plafond 120 jours (ou 90 jours) : désormais contrôlé automatiquement</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              C’est le point le plus sensible pour les propriétaires de résidence principale. Les collectivités peuvent désormais identifier automatiquement les annonces qui dépassent :
            </p>
            <ul class="space-y-2 text-gray-700 ml-6 mb-6">
              <li>• <strong>120 jours par an</strong> dans le regime general</li>
              <li>• <strong>90 jours par an</strong> si la commune a vote ce seuil</li>
            </ul>
            <div class="bg-red-50 border border-red-200 rounded-2xl p-6 mb-4">
              <p class="text-gray-800 font-semibold mb-2">Risque en cas de dépassement</p>
              <p class="text-gray-700">
                Une amende civile pouvant aller jusqu’à <strong>50 000 euros par annonce ou par meublé</strong> de tourisme, selon la situation constatée.
              </p>
            </div>
            <p class="text-gray-700 leading-relaxed">
              Si vous louez dans une zone très encadrée, consultez aussi notre article sur <a href="/fr/blog/nice-quotas-airbnb-reglementation-2025" class="text-primary hover:underline">les quotas Airbnb et la limite de 90 jours à Nice</a>.
            </p>
          </section>

          <section id="donnees-collectees">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Quelles données sont collectées via l’API Meubles ?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Le dispositif ne se limite pas au nombre de nuits. Il centralise un ensemble d’informations permettant de croiser déclaration, fiscalité et activité réelle des annonces.
            </p>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <ul class="space-y-2 text-gray-700">
                <li>• Identité du loueur : nom, prénom, email, SIRET</li>
                <li>• Données du logement : identifiant fiscal, nombre de pièces, nombre de lits</li>
                <li>• Informations de conformité : accessibilité PMR, niveau de classement</li>
                <li>• Données d’annonces : URL publiées sur plateformes</li>
                <li>• Données d’activité : périodes et volumes de location</li>
              </ul>
            </div>
            <p class="text-gray-700 leading-relaxed mt-4">
              Fréquence de transmission : en principe mensuelle pour les grandes plateformes et trimestrielle pour les plus petites structures (moins de 4 250 référencements mensuels en moyenne).
            </p>
          </section>

          <section id="locaux-non-habitation">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Bureaux et locaux commerciaux : vigilance renforcée</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Le décret 2026-196 harmonise la définition des locaux qui ne sont pas à usage d’habitation. En pratique, les communes pourront plus facilement vérifier si un bien loué en courte durée respecte bien sa destination urbanistique.
            </p>
            <div class="bg-yellow-50 border border-yellow-300 rounded-2xl p-6">
              <p class="text-gray-800 font-semibold mb-2">Point de contrôle prioritaire</p>
              <p class="text-gray-700">
                Si votre bien n’est pas officiellement qualifié en habitation, une mise en conformité peut être nécessaire avant poursuite de l’activité touristique.
              </p>
            </div>
          </section>

          <section id="donnees-personnelles">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Vie privée : quels sont vos droits ?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Les textes prévoient un droit d’accès et de rectification des données vous concernant. En revanche, il n’est pas possible de demander la suppression des données ni de s’opposer à leur collecte dans ce cadre, l’intérêt public étant retenu.
            </p>
            <p class="text-gray-700 leading-relaxed">
              Les connexions des agents habilités sont journalisées et conservées pendant 6 mois afin d’assurer la traçabilité des consultations.
            </p>
          </section>

          <section id="checklist-conformite" class="bg-blue-50 border border-primary/30 rounded-2xl p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Checklist : ce que vous devez faire dès maintenant</h2>
            <ol class="list-decimal ml-6 space-y-3 text-gray-700">
              <li>Vérifiez que votre numéro d’enregistrement est valide et visible sur toutes vos annonces.</li>
              <li>Confirmez votre statut (particulier ou professionnel) sur chaque plateforme.</li>
              <li>Suivez vos jours loués pour rester sous 120 jours (ou sous le seuil local, parfois 90 jours).</li>
              <li>Contrôlez la destination légale du local : habitation, et non usage incompatible.</li>
            </ol>
            <p class="text-gray-700 leading-relaxed mt-6">
              Si besoin, consultez notre guide dédié au <a href="/fr/blog/numero-enregistrement-obligatoire-meubles-tourisme" class="text-primary hover:underline">numéro d’enregistrement obligatoire pour les meublés de tourisme</a>.
            </p>
          </section>

          <section id="faq-api-meubles" class="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">FAQ API Meubles</h2>
            <div class="space-y-4 text-gray-700">
              <div>
                <p class="font-semibold">L’API Meubles concerne-t-elle uniquement Airbnb ?</p>
                <p>Non. Le dispositif vise les plateformes de location touristique, dont Airbnb, Abritel et Booking.</p>
              </div>
              <div>
                <p class="font-semibold">Le seuil est-il toujours 120 jours ?</p>
                <p>Non. Certaines communes peuvent appliquer un seuil de 90 jours pour les résidences principales.</p>
              </div>
              <div>
                <p class="font-semibold">Puis-je refuser la transmission de mes données ?</p>
                <p>Non, dans ce cadre réglementaire la collecte est obligatoire. Vous pouvez en revanche demander la correction d’une erreur.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">En résumé</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              L’API Meubles n’est pas un outil punitif pour les loueurs conformes : c’est un système de transparence qui automatise des contrôles déjà prévus par la réglementation.
            </p>
            <p class="text-gray-700 leading-relaxed">
              Pour les propriétaires et conciergeries, la priorité est claire : fiabiliser les déclarations, suivre les seuils de location, vérifier la destination du bien et documenter sa conformité de façon continue.
            </p>
          </section>

          <section class="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Besoin d’aide pour rester conforme ?</h3>
            <p class="text-gray-700 mb-4">
              L’équipe Biloki vous accompagne pour structurer vos process, suivre vos obligations et sécuriser vos annonces.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="/fr/reserver-demo" class="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
                Réserver une démo
              </a>
              <a href="/fr/commencer-gratuitement" class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Commencer gratuitement
              </a>
            </div>
          </section>

          <section>
            <p class="text-sm text-gray-500 leading-relaxed">
              Sources : Décrets n 2026-196 et n 2026-197 du 19 mars 2026, Journal officiel du 20 mars 2026, Legifrance, Banque des Territoires, Maire-Info, <a href="https://www.entreprises.gouv.fr/espace-entreprises/s-informer-sur-la-reglementation/lapi-meubles-guichet-unique-de-centralisation" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Direction générale des Entreprises - API Meubles</a>.
            </p>
          </section>
        </div>
      `,
    },
    en: {
      title: "API Meubles in 2026: what Airbnb and Abritel hosts in France must know",
      excerpt:
        "Since March 21, 2026, API Meubles enables automated municipal controls on short-term rental listings. Here is what hosts need to know about day caps, collected data, and compliance.",
      tags: [
        "api meubles france",
        "airbnb regulation france 2026",
        "abritel compliance france",
        "short-term rental day cap france",
      ],
      content: `
        <div class="space-y-6">
          <section>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">API Meubles is now live in France</h2>
            <p class="text-gray-700 leading-relaxed">
              Since March 21, 2026, booking platforms must report listing activity data to a central public gateway (DGE), enabling municipalities to run automated compliance checks.
            </p>
          </section>
        </div>
      `,
    },
    es: {
      title: "API Meubles 2026: lo que deben saber los propietarios en Airbnb y Abritel",
      excerpt:
        "Desde el 21 de marzo de 2026, API Meubles automatiza el control de anuncios de alquiler turistico por parte de los ayuntamientos en Francia.",
      tags: [
        "api meubles",
        "regulacion airbnb francia 2026",
        "cumplimiento abritel francia",
      ],
      content: `
        <div class="space-y-6">
          <section>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">API Meubles ya esta activa</h2>
            <p class="text-gray-700 leading-relaxed">
              Las plataformas deben transmitir datos de actividad a un sistema publico central para permitir controles automatizados por los municipios.
            </p>
          </section>
        </div>
      `,
    },
    pt: {
      title: "API Meubles 2026: o que anfitrioes no Airbnb e Abritel precisam saber",
      excerpt:
        "Desde 21 de marco de 2026, a API Meubles automatiza o controle de anuncios de aluguel de curta duracao pelas autoridades locais na Franca.",
      tags: [
        "api meubles",
        "regulacao airbnb franca 2026",
        "conformidade abritel franca",
      ],
      content: `
        <div class="space-y-6">
          <section>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">API Meubles em operacao</h2>
            <p class="text-gray-700 leading-relaxed">
              As plataformas agora enviam dados de atividade para um gateway publico central, permitindo controles municipais automatizados.
            </p>
          </section>
        </div>
      `,
    },
  },
};

export default article;
