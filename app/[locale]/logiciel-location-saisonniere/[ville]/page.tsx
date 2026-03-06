import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { SITE_BASE_URL } from '@/lib/config';
import {
  getProgrammaticCityPageFr,
  getProgrammaticCitySlugsFr,
} from '@/lib/seo/programmatic-cities';

const FALLBACK_CITY_IMAGES = [
  '/images/blog/france-tourisme.png',
  '/images/blog/reglementation.jpg',
  '/images/blog/automatisation.jpg',
  '/images/blog/channel-manager-guide.jpg',
  '/images/blog/messagerie-automatisee.jpg',
  '/images/blog/Article-rentabilite.jpg',
];

const DATA_SOURCES = [
  {
    label: 'Atout France - Chiffres clés du tourisme',
    url: 'https://www.atout-france.fr/fr/chiffres-cles-tourisme',
  },
  {
    label: 'INSEE - Fréquentation dans les hébergements collectifs touristiques',
    url: 'https://www.insee.fr/fr/statistiques/2011101?sommaire=2011103',
  },
  {
    label: 'Service-Public.fr - Règles location meublée de tourisme',
    url: 'https://www.service-public.fr/particuliers/vosdroits/F2043',
  },
  {
    label: 'Biloki - France 102 millions de touristes',
    url: '/fr/blog/france-102-millions-touristes-opportunite',
  },
];

const CITY_KPI_BENCHMARKS: Record<
  string,
  Array<{ label: string; value: string; detail: string }>
> = {
  paris: [
    { label: 'Part OTA (Airbnb + Booking)', value: '78%', detail: 'Part des réservations via OTA sur un portefeuille urbain type.' },
    { label: 'Part de réservations directes', value: '22%', detail: 'Réservations hors OTA (site, repeat guests, partenaires).' },
    { label: 'Délai moyen de réponse', value: '< 15 min', detail: 'Objectif pour limiter la perte de conversion pré-séjour.' },
  ],
  marseille: [
    { label: 'Part OTA (Airbnb + Booking)', value: '74%', detail: 'Mix OTA observé sur des opérations comparables.' },
    { label: 'Part de réservations directes', value: '26%', detail: 'Potentiel en hausse avec automatisation CRM et messages.' },
    { label: 'Taux d’occupation cible', value: '82%', detail: 'Cible opérationnelle annuelle sur portefeuille structuré.' },
  ],
  lyon: [
    { label: 'Part OTA (Airbnb + Booking)', value: '71%', detail: 'Répartition type pour une activité multi-canal active.' },
    { label: 'Part de réservations directes', value: '29%', detail: 'Levier clé pour améliorer la marge nette.' },
    { label: 'Taux d’occupation cible', value: '80%', detail: 'Objectif réaliste avec pricing et exécution rigoureuse.' },
  ],
  toulouse: [
    { label: 'Part OTA (Airbnb + Booking)', value: '73%', detail: 'Poids OTA sur des biens urbains courte durée.' },
    { label: 'Part de réservations directes', value: '27%', detail: 'Part pouvant progresser avec tunnel de conversion propre.' },
    { label: 'Délai moyen de réponse', value: '< 20 min', detail: 'Réactivité attendue pour conserver un bon taux de réponse.' },
  ],
  nice: [
    { label: 'Part OTA (Airbnb + Booking)', value: '81%', detail: 'Dépendance OTA plus forte sur destination très touristique.' },
    { label: 'Part de réservations directes', value: '19%', detail: 'Travail de fidélisation nécessaire pour augmenter ce ratio.' },
    { label: 'Taux d’occupation cible', value: '84%', detail: 'Cible moyenne hors pics extrêmes de saison.' },
  ],
  bordeaux: [
    { label: 'Part OTA (Airbnb + Booking)', value: '72%', detail: 'Répartition moyenne en phase de croissance.' },
    { label: 'Part de réservations directes', value: '28%', detail: 'Progression possible via base clients et recommandations.' },
    { label: 'Délai moyen de réponse', value: '< 20 min', detail: 'Seuil opérationnel pour maintenir la performance commerciale.' },
  ],
  lille: [
    { label: 'Part OTA (Airbnb + Booking)', value: '70%', detail: 'Part OTA stabilisée sur portefeuille optimisé.' },
    { label: 'Part de réservations directes', value: '30%', detail: 'Objectif fréquent après structuration du parcours voyageur.' },
    { label: 'Taux d’occupation cible', value: '78%', detail: 'Objectif prudent avec pilotage hebdomadaire des calendriers.' },
  ],
  nantes: [
    { label: 'Part OTA (Airbnb + Booking)', value: '69%', detail: 'Mix OTA généralement un peu plus équilibré.' },
    { label: 'Part de réservations directes', value: '31%', detail: 'Part directe soutenue par la relation long terme.' },
    { label: 'Délai moyen de réponse', value: '< 20 min', detail: 'Objectif de réactivité pour limiter les abandons.' },
  ],
  strasbourg: [
    { label: 'Part OTA (Airbnb + Booking)', value: '75%', detail: 'Poids OTA renforcé sur périodes de forte demande.' },
    { label: 'Part de réservations directes', value: '25%', detail: 'Potentiel de hausse via collecte et relance clients.' },
    { label: 'Taux d’occupation cible', value: '81%', detail: 'Objectif moyen annualisé sur portefeuille structuré.' },
  ],
  montpellier: [
    { label: 'Part OTA (Airbnb + Booking)', value: '74%', detail: 'Répartition type sur des biens urbains et péri-urbains.' },
    { label: 'Part de réservations directes', value: '26%', detail: 'Part directe qui progresse avec automatisation CRM.' },
    { label: 'Taux d’occupation cible', value: '80%', detail: 'Cible opérationnelle avec planning centralisé et process robustes.' },
  ],
};

const CITY_RENTAL_PRESSURE: Record<
  string,
  { tensionScore: number; medianAdr: number; occupancyRate: number; medianBookingLeadDays: number }
> = {
  paris: { tensionScore: 91, medianAdr: 195, occupancyRate: 82, medianBookingLeadDays: 21 },
  marseille: { tensionScore: 84, medianAdr: 142, occupancyRate: 79, medianBookingLeadDays: 18 },
  lyon: { tensionScore: 80, medianAdr: 148, occupancyRate: 77, medianBookingLeadDays: 17 },
  toulouse: { tensionScore: 76, medianAdr: 126, occupancyRate: 74, medianBookingLeadDays: 15 },
  nice: { tensionScore: 88, medianAdr: 172, occupancyRate: 81, medianBookingLeadDays: 20 },
  bordeaux: { tensionScore: 78, medianAdr: 136, occupancyRate: 75, medianBookingLeadDays: 16 },
  lille: { tensionScore: 72, medianAdr: 118, occupancyRate: 71, medianBookingLeadDays: 14 },
  nantes: { tensionScore: 74, medianAdr: 121, occupancyRate: 72, medianBookingLeadDays: 14 },
  strasbourg: { tensionScore: 83, medianAdr: 139, occupancyRate: 78, medianBookingLeadDays: 18 },
  montpellier: { tensionScore: 79, medianAdr: 132, occupancyRate: 75, medianBookingLeadDays: 16 },
  rennes: { tensionScore: 71, medianAdr: 114, occupancyRate: 70, medianBookingLeadDays: 13 },
  reims: { tensionScore: 69, medianAdr: 109, occupancyRate: 68, medianBookingLeadDays: 12 },
  'le-havre': { tensionScore: 66, medianAdr: 103, occupancyRate: 66, medianBookingLeadDays: 11 },
  'saint-malo': { tensionScore: 82, medianAdr: 156, occupancyRate: 76, medianBookingLeadDays: 19 },
  'la-rochelle': { tensionScore: 81, medianAdr: 151, occupancyRate: 75, medianBookingLeadDays: 18 },
  annecy: { tensionScore: 85, medianAdr: 165, occupancyRate: 79, medianBookingLeadDays: 20 },
  biarritz: { tensionScore: 87, medianAdr: 173, occupancyRate: 80, medianBookingLeadDays: 21 },
  cannes: { tensionScore: 90, medianAdr: 187, occupancyRate: 82, medianBookingLeadDays: 23 },
  'aix-en-provence': { tensionScore: 77, medianAdr: 138, occupancyRate: 74, medianBookingLeadDays: 16 },
  'mont-saint-michel': { tensionScore: 89, medianAdr: 176, occupancyRate: 81, medianBookingLeadDays: 22 },
  avignon: { tensionScore: 78, medianAdr: 133, occupancyRate: 74, medianBookingLeadDays: 16 },
  antibes: { tensionScore: 86, medianAdr: 169, occupancyRate: 80, medianBookingLeadDays: 21 },
};

const CITY_COMPARISON_BASELINE: Record<
  string,
  {
    label: string;
    tensionScore: number;
    medianAdr: number;
    occupancyRate: number;
    medianBookingLeadDays: number;
  }
> = {
  paris: { label: 'Moyenne grandes métropoles FR', tensionScore: 78, medianAdr: 142, occupancyRate: 75, medianBookingLeadDays: 17 },
  marseille: { label: 'Moyenne PACA', tensionScore: 80, medianAdr: 151, occupancyRate: 77, medianBookingLeadDays: 18 },
  lyon: { label: 'Moyenne Auvergne-Rhône-Alpes', tensionScore: 74, medianAdr: 131, occupancyRate: 73, medianBookingLeadDays: 15 },
  toulouse: { label: 'Moyenne Occitanie', tensionScore: 72, medianAdr: 124, occupancyRate: 71, medianBookingLeadDays: 14 },
  nice: { label: 'Moyenne PACA', tensionScore: 80, medianAdr: 151, occupancyRate: 77, medianBookingLeadDays: 18 },
  bordeaux: { label: 'Moyenne Nouvelle-Aquitaine', tensionScore: 73, medianAdr: 127, occupancyRate: 72, medianBookingLeadDays: 15 },
  lille: { label: 'Moyenne Hauts-de-France', tensionScore: 68, medianAdr: 112, occupancyRate: 68, medianBookingLeadDays: 12 },
  nantes: { label: 'Moyenne Pays de la Loire', tensionScore: 70, medianAdr: 116, occupancyRate: 69, medianBookingLeadDays: 13 },
  strasbourg: { label: 'Moyenne Grand Est', tensionScore: 72, medianAdr: 123, occupancyRate: 71, medianBookingLeadDays: 14 },
  montpellier: { label: 'Moyenne Occitanie', tensionScore: 72, medianAdr: 124, occupancyRate: 71, medianBookingLeadDays: 14 },
  rennes: { label: 'Moyenne Bretagne', tensionScore: 70, medianAdr: 119, occupancyRate: 70, medianBookingLeadDays: 13 },
  reims: { label: 'Moyenne Grand Est', tensionScore: 72, medianAdr: 123, occupancyRate: 71, medianBookingLeadDays: 14 },
  'le-havre': { label: 'Moyenne Normandie', tensionScore: 69, medianAdr: 117, occupancyRate: 69, medianBookingLeadDays: 13 },
  'saint-malo': { label: 'Moyenne littoral Atlantique', tensionScore: 79, medianAdr: 149, occupancyRate: 75, medianBookingLeadDays: 18 },
  'la-rochelle': { label: 'Moyenne littoral Atlantique', tensionScore: 79, medianAdr: 149, occupancyRate: 75, medianBookingLeadDays: 18 },
  annecy: { label: 'Moyenne destinations alpines', tensionScore: 81, medianAdr: 158, occupancyRate: 77, medianBookingLeadDays: 19 },
  biarritz: { label: 'Moyenne littoral Atlantique', tensionScore: 79, medianAdr: 149, occupancyRate: 75, medianBookingLeadDays: 18 },
  cannes: { label: 'Moyenne Côte d’Azur', tensionScore: 83, medianAdr: 162, occupancyRate: 79, medianBookingLeadDays: 20 },
  'aix-en-provence': { label: 'Moyenne PACA', tensionScore: 80, medianAdr: 151, occupancyRate: 77, medianBookingLeadDays: 18 },
  'mont-saint-michel': { label: 'Moyenne destinations patrimoniales', tensionScore: 79, medianAdr: 147, occupancyRate: 75, medianBookingLeadDays: 18 },
  avignon: { label: 'Moyenne PACA', tensionScore: 80, medianAdr: 151, occupancyRate: 77, medianBookingLeadDays: 18 },
  antibes: { label: 'Moyenne Côte d’Azur', tensionScore: 83, medianAdr: 162, occupancyRate: 79, medianBookingLeadDays: 20 },
};

const BLOG_TITLE_BY_SLUG: Record<string, string> = {
  'numero-enregistrement-obligatoire-meubles-tourisme': 'Numéro d’enregistrement obligatoire des meublés de tourisme',
  'channel-manager-guide-complet-conciergeries': 'Channel manager: guide complet pour conciergeries',
  'france-102-millions-touristes-opportunite': '102 millions de touristes: opportunité à saisir',
  'loi-le-meur-2026-location-saisonniere': 'Loi Le Meur 2026: ce qui change',
  'automatiser-gestion-locations-saisonnieres': 'Automatiser la gestion des locations saisonnières',
  'messagerie-automatisee-conciergerie': 'Messagerie automatisée: gagner du temps',
  'nice-quotas-airbnb-reglementation-2025': 'Nice: quotas Airbnb et réglementation 2025',
  'ia-location-courte-duree-conciergeries': 'IA et location courte durée: leviers concrets',
  'rentabilite-location-courte-duree-2026': 'Rentabilité location courte durée 2026',
  'salon-marseille-2026': 'Salon Marseille 2026: tendances du marché',
};

const CITY_PERSONALIZATION: Record<
  string,
  {
    authorizationNote: string;
    occupancyTargetRange: string;
    automationPaybackMonths: string;
    blogSlugs: [string, string];
  }
> = {
  paris: {
    authorizationNote: 'Vérifier les règles locales de changement d’usage et la procédure d’enregistrement selon l’arrondissement.',
    occupancyTargetRange: '80-86%',
    automationPaybackMonths: '2 à 4 mois',
    blogSlugs: ['loi-le-meur-2026-location-saisonniere', 'rentabilite-location-courte-duree-2026'],
  },
  marseille: {
    authorizationNote: 'Contrôler les exigences d’enregistrement et les obligations locales avant mise en location.',
    occupancyTargetRange: '76-83%',
    automationPaybackMonths: '2 à 4 mois',
    blogSlugs: ['salon-marseille-2026', 'automatiser-gestion-locations-saisonnieres'],
  },
  lyon: {
    authorizationNote: 'Valider les conditions municipales pour les meublés touristiques et la conformité documentaire.',
    occupancyTargetRange: '74-80%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['channel-manager-guide-complet-conciergeries', 'rentabilite-location-courte-duree-2026'],
  },
  toulouse: {
    authorizationNote: 'Vérifier le cadre local d’enregistrement et les obligations applicables aux résidences concernées.',
    occupancyTargetRange: '72-78%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'messagerie-automatisee-conciergerie'],
  },
  nice: {
    authorizationNote: 'Intégrer les règles de quotas et de réglementation locale avant de scaler le portefeuille.',
    occupancyTargetRange: '78-85%',
    automationPaybackMonths: '2 à 4 mois',
    blogSlugs: ['nice-quotas-airbnb-reglementation-2025', 'loi-le-meur-2026-location-saisonniere'],
  },
  bordeaux: {
    authorizationNote: 'Contrôler les démarches d’enregistrement et les contraintes locales selon le type de bien.',
    occupancyTargetRange: '73-79%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['numero-enregistrement-obligatoire-meubles-tourisme', 'automatiser-gestion-locations-saisonnieres'],
  },
  lille: {
    authorizationNote: 'Vérifier la conformité administrative des annonces et la traçabilité des obligations locales.',
    occupancyTargetRange: '69-75%',
    automationPaybackMonths: '3 à 6 mois',
    blogSlugs: ['channel-manager-guide-complet-conciergeries', 'messagerie-automatisee-conciergerie'],
  },
  nantes: {
    authorizationNote: 'S’assurer de la conformité locale et de la bonne déclaration des meublés concernés.',
    occupancyTargetRange: '70-76%',
    automationPaybackMonths: '3 à 6 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'ia-location-courte-duree-conciergeries'],
  },
  strasbourg: {
    authorizationNote: 'Valider les règles communales en vigueur pour la location courte durée et l’enregistrement.',
    occupancyTargetRange: '74-81%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['loi-le-meur-2026-location-saisonniere', 'channel-manager-guide-complet-conciergeries'],
  },
  montpellier: {
    authorizationNote: 'Contrôler les obligations locales de mise en location et la conformité des annonces.',
    occupancyTargetRange: '73-79%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'rentabilite-location-courte-duree-2026'],
  },
  rennes: {
    authorizationNote: 'Vérifier les règles locales et la documentation nécessaire pour exploiter sans risque.',
    occupancyTargetRange: '68-74%',
    automationPaybackMonths: '3 à 6 mois',
    blogSlugs: ['numero-enregistrement-obligatoire-meubles-tourisme', 'messagerie-automatisee-conciergerie'],
  },
  reims: {
    authorizationNote: 'Sécuriser l’enregistrement et les obligations locales avant déploiement multi-biens.',
    occupancyTargetRange: '66-73%',
    automationPaybackMonths: '3 à 6 mois',
    blogSlugs: ['loi-le-meur-2026-location-saisonniere', 'rentabilite-location-courte-duree-2026'],
  },
  'le-havre': {
    authorizationNote: 'Contrôler les obligations locales applicables aux meublés de tourisme sur la commune.',
    occupancyTargetRange: '64-71%',
    automationPaybackMonths: '4 à 6 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'channel-manager-guide-complet-conciergeries'],
  },
  'saint-malo': {
    authorizationNote: 'Anticiper les contraintes locales et la saisonnalité forte du littoral pour rester conforme.',
    occupancyTargetRange: '73-80%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['france-102-millions-touristes-opportunite', 'rentabilite-location-courte-duree-2026'],
  },
  'la-rochelle': {
    authorizationNote: 'Vérifier les règles locales d’exploitation et les formalités administratives associées.',
    occupancyTargetRange: '72-79%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'france-102-millions-touristes-opportunite'],
  },
  annecy: {
    authorizationNote: 'Intégrer les spécificités locales et la pression saisonnière dans la stratégie de conformité.',
    occupancyTargetRange: '76-83%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['rentabilite-location-courte-duree-2026', 'ia-location-courte-duree-conciergeries'],
  },
  biarritz: {
    authorizationNote: 'Vérifier les obligations locales liées aux zones très touristiques et à la saisonnalité.',
    occupancyTargetRange: '77-84%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['france-102-millions-touristes-opportunite', 'channel-manager-guide-complet-conciergeries'],
  },
  cannes: {
    authorizationNote: 'Sécuriser la conformité locale avant les périodes événementielles à forte tension locative.',
    occupancyTargetRange: '79-86%',
    automationPaybackMonths: '2 à 4 mois',
    blogSlugs: ['rentabilite-location-courte-duree-2026', 'messagerie-automatisee-conciergerie'],
  },
  'aix-en-provence': {
    authorizationNote: 'Contrôler les conditions locales d’exploitation et les obligations déclaratives applicables.',
    occupancyTargetRange: '72-79%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'ia-location-courte-duree-conciergeries'],
  },
  'mont-saint-michel': {
    authorizationNote: 'Tenir compte des contraintes locales de zone patrimoniale et du flux touristique saisonnier.',
    occupancyTargetRange: '78-85%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['france-102-millions-touristes-opportunite', 'channel-manager-guide-complet-conciergeries'],
  },
  avignon: {
    authorizationNote: 'Vérifier le cadre municipal, l’enregistrement et les obligations locales avant montée en charge.',
    occupancyTargetRange: '72-79%',
    automationPaybackMonths: '3 à 5 mois',
    blogSlugs: ['loi-le-meur-2026-location-saisonniere', 'rentabilite-location-courte-duree-2026'],
  },
  antibes: {
    authorizationNote: 'Intégrer les contraintes locales de la Côte d’Azur et sécuriser la conformité documentaire.',
    occupancyTargetRange: '77-84%',
    automationPaybackMonths: '2 à 4 mois',
    blogSlugs: ['nice-quotas-airbnb-reglementation-2025', 'channel-manager-guide-complet-conciergeries'],
  },
};

const CITY_SEO_SNIPPETS: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  paris: {
    title: 'Logiciel location saisonnière Paris: + de réservations, - de charge opérationnelle',
    description:
      'Pilotez votre activité courte durée à Paris avec Biloki: channel manager, PMS et automatisation pour réduire les erreurs et augmenter la rentabilité.',
  },
  marseille: {
    title: 'Logiciel location saisonnière Marseille: centralisez opérations et réservations',
    description:
      'Gérez vos locations courte durée à Marseille depuis une seule plateforme: synchronisation OTA, workflow terrain et suivi KPI pour mieux convertir.',
  },
  nice: {
    title: 'Logiciel location saisonnière Nice: plus de contrôle, plus de revenus nets',
    description:
      'Optimisez votre gestion à Nice avec Biloki: calendrier unifié, messages automatisés et pilotage local pour améliorer occupation, ADR et exécution.',
  },
};

function ComparisonBar({
  label,
  cityLabel,
  cityValue,
  benchmarkValue,
  benchmarkLabel,
  max,
  unit,
}: {
  label: string;
  cityLabel: string;
  cityValue: number;
  benchmarkValue: number;
  benchmarkLabel: string;
  max: number;
  unit: string;
}) {
  const cityWidth = Math.min((cityValue / max) * 100, 100);
  const benchmarkWidth = Math.min((benchmarkValue / max) * 100, 100);

  return (
    <article className="rounded-xl border border-blue-100 bg-white p-4">
      <p className="text-sm font-semibold text-gray-800">{label}</p>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
          <span>{cityLabel}</span>
          <span>{cityValue}{unit}</span>
        </div>
        <div className="h-2 rounded bg-blue-100">
          <div className="h-2 rounded bg-primary" style={{ width: `${cityWidth}%` }} />
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>{benchmarkLabel}</span>
          <span>{benchmarkValue}{unit}</span>
        </div>
        <div className="h-2 rounded bg-gray-200">
          <div className="h-2 rounded bg-gray-500" style={{ width: `${benchmarkWidth}%` }} />
        </div>
      </div>
    </article>
  );
}

function getCityVisual(slug: string) {
  const allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  for (const ext of allowedExt) {
    const rel = `/images/seo/cities/${slug}.${ext}`;
    const abs = path.join(process.cwd(), 'public', rel.replace('/images/', 'images/'));
    if (fs.existsSync(abs)) {
      return { src: rel };
    }
  }

  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    src: FALLBACK_CITY_IMAGES[hash % FALLBACK_CITY_IMAGES.length],
  };
}

function accentizeFrenchText(text: string): string {
  return text
    .replace(/\bIle\b/g, 'Île')
    .replace(/\bCote\b/g, 'Côte')
    .replace(/\bDecouvrez\b/g, 'Découvrez')
    .replace(/\bdecouvrez\b/g, 'découvrez')
    .replace(/\bCentralisez\b/g, 'Centralisez')
    .replace(/\bgerer\b/g, 'gérer')
    .replace(/\bGerer\b/g, 'Gérer')
    .replace(/\boperations\b/g, 'opérations')
    .replace(/\bOperations\b/g, 'Opérations')
    .replace(/\bGestion\b/g, 'Gestion')
    .replace(/\bactivite\b/g, 'activité')
    .replace(/\bActivite\b/g, 'Activité')
    .replace(/\bdonnees\b/g, 'données')
    .replace(/\bDonnees\b/g, 'Données')
    .replace(/\bduree\b/g, 'durée')
    .replace(/\bDuree\b/g, 'Durée')
    .replace(/\boperationnel\b/g, 'opérationnel')
    .replace(/\boperationnelle\b/g, 'opérationnelle')
    .replace(/\boperationnels\b/g, 'opérationnels')
    .replace(/\boperationnelles\b/g, 'opérationnelles')
    .replace(/\bOperationnel\b/g, 'Opérationnel')
    .replace(/\bOperationnelle\b/g, 'Opérationnelle')
    .replace(/\bequipe\b/g, 'équipe')
    .replace(/\bEquipe\b/g, 'Équipe')
    .replace(/\bequipes\b/g, 'équipes')
    .replace(/\bEquipements\b/g, 'Équipements')
    .replace(/\breservation\b/g, 'réservation')
    .replace(/\breservations\b/g, 'réservations')
    .replace(/\breponse\b/g, 'réponse')
    .replace(/\breponses\b/g, 'réponses')
    .replace(/\bReservation\b/g, 'Réservation')
    .replace(/\bReservations\b/g, 'Réservations')
    .replace(/\bresponsabilite\b/g, 'responsabilité')
    .replace(/\bstrategie\b/g, 'stratégie')
    .replace(/\bregulation\b/g, 'régulation')
    .replace(/\breglementaires\b/g, 'réglementaires')
    .replace(/\bregles\b/g, 'règles')
    .replace(/\bevolutions\b/g, 'évolutions')
    .replace(/\bmaitrise\b/g, 'maîtrise')
    .replace(/\bmeme\b/g, 'même')
    .replace(/\bperiode\b/g, 'période')
    .replace(/\bperiodes\b/g, 'périodes')
    .replace(/\bsejour\b/g, 'séjour')
    .replace(/\bsejours\b/g, 'séjours')
    .replace(/\bmenage\b/g, 'ménage')
    .replace(/\bMeme\b/g, 'Même')
    .replace(/\bfrequents\b/g, 'fréquents')
    .replace(/\bfrequentes\b/g, 'fréquentes')
    .replace(/\bApercu\b/g, 'Aperçu')
    .replace(/\bmarche\b/g, 'marché')
    .replace(/\bMarche\b/g, 'Marché')
    .replace(/\bdelai\b/g, 'délai')
    .replace(/\bdeja\b/g, 'déjà')
    .replace(/\bcles\b/g, 'clés')
    .replace(/\breel\b/g, 'réel')
    .replace(/\breelle\b/g, 'réelle')
    .replace(/\balignes\b/g, 'alignés')
    .replace(/\breduire\b/g, 'réduire')
    .replace(/\bdisponibilite\b/g, 'disponibilité')
    .replace(/\bdisponibilites\b/g, 'disponibilités')
    .replace(/\butilises\b/g, 'utilisés')
    .replace(/\butilisees\b/g, 'utilisées')
    .replace(/\bhebergements\b/g, 'hébergements')
    .replace(/\bsaisonniere\b/g, 'saisonnière')
    .replace(/\bsaisonnieres\b/g, 'saisonnières')
    .replace(/\bSaisonniere\b/g, 'Saisonnière')
    .replace(/\bSaisonnieres\b/g, 'Saisonnières')
    .replace(/\ba\b/g, 'à');
}

interface ProgrammaticCityPageProps {
  params: Promise<{
    locale: Locale;
    ville: string;
  }>;
}

export function generateStaticParams() {
  return getProgrammaticCitySlugsFr().map((ville) => ({
    locale: 'fr',
    ville,
  }));
}

export async function generateMetadata({
  params,
}: ProgrammaticCityPageProps): Promise<Metadata> {
  const { locale, ville } = await params;
  const cityPage = getProgrammaticCityPageFr(ville);

  if (locale !== 'fr' || !cityPage) {
    return {
      title: 'Page non trouvee',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${locale}/logiciel-location-saisonniere/${cityPage.slug}`;
  const customSnippet = CITY_SEO_SNIPPETS[cityPage.slug];
  const title = customSnippet?.title ?? `${accentizeFrenchText(cityPage.heroTitle)} | PMS et Channel Manager`;
  const description =
    customSnippet?.description ??
    `Découvrez comment mieux gérer vos locations courte durée à ${cityPage.city} avec Biloki: channel manager, PMS, automatisation et suivi opérationnel.`;

  return {
    title,
    description,
    keywords: [
      `logiciel location saisonnière ${cityPage.city.toLowerCase()}`,
      `pms location saisonnière ${cityPage.city.toLowerCase()}`,
      `channel manager ${cityPage.city.toLowerCase()}`,
      `outil conciergerie ${cityPage.city.toLowerCase()}`,
    ],
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: canonicalPath,
        'x-default': canonicalPath,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_BASE_URL}${canonicalPath}`,
      type: 'website',
      siteName: 'Biloki',
      locale: 'fr_FR',
    },
  };
}

export default async function ProgrammaticCityPage({
  params,
}: ProgrammaticCityPageProps) {
  const { locale, ville } = await params;
  const cityPage = getProgrammaticCityPageFr(ville);

  if (locale !== 'fr' || !cityPage) {
    notFound();
  }

  const pageUrl = `${SITE_BASE_URL}/${locale}/logiciel-location-saisonniere/${cityPage.slug}`;
  const cityVisual = getCityVisual(cityPage.slug);
  const rentalPressure =
    CITY_RENTAL_PRESSURE[cityPage.slug] ??
    ({ tensionScore: 75, medianAdr: 125, occupancyRate: 73, medianBookingLeadDays: 15 } as const);
  const cityKpis =
    CITY_KPI_BENCHMARKS[cityPage.slug] ?? [
      {
        label: 'Part OTA (Airbnb + Booking)',
        value: '72%',
        detail: 'Ordre de grandeur sur portefeuille urbain multi-canal.',
      },
      {
        label: 'Part de réservations directes',
        value: '28%',
        detail: 'Réservations hors OTA via canaux directs.',
      },
      {
        label: 'Taux d’occupation cible',
        value: '80%',
        detail: 'Cible annuelle avec organisation et pricing suivis.',
      },
    ];
  const cityPersonalization =
    CITY_PERSONALIZATION[cityPage.slug] ??
    ({
      authorizationNote: `Vérifier les obligations locales d’enregistrement et la conformité avant exploitation à ${cityPage.city}.`,
      occupancyTargetRange: '70-78%',
      automationPaybackMonths: '3 à 6 mois',
      blogSlugs: ['automatiser-gestion-locations-saisonnieres', 'channel-manager-guide-complet-conciergeries'],
    } as const);

  const localUseCases = [
    {
      title: `Studio à ${cityPage.city}`,
      process: 'Messagerie pré-séjour automatisée, check-in cadré, check-out et ménage pilotés sur une seule timeline.',
      kpi: `KPI cible: ${Math.max(rentalPressure.occupancyRate - 2, 58)}-${Math.min(rentalPressure.occupancyRate + 2, 95)}% d’occupation, délai de réponse < 15 min.`,
    },
    {
      title: `T2 à ${cityPage.city}`,
      process: 'Distribution multi-OTA, règles de séjour harmonisées, coordination ménage + maintenance entre deux rotations.',
      kpi: `KPI cible: ADR autour de ${Math.max(rentalPressure.medianAdr - 12, 70)}-${rentalPressure.medianAdr + 15} €, incidents voyageurs traités sous 24h.`,
    },
    {
      title: `Immeuble 8 lots à ${cityPage.city}`,
      process: 'Planning mutualisé des équipes, priorisation des urgences, reporting hebdomadaire propriétaire par lot.',
      kpi: `KPI cible: ${cityPersonalization.occupancyTargetRange} d’occupation agrégée, retour sur automatisation en ${cityPersonalization.automationPaybackMonths}.`,
    },
  ];

  const localTransactionalFaq = [
    {
      q: `Faut-il une autorisation pour exploiter en location saisonnière à ${cityPage.city} ?`,
      a: `Le cadre dépend du type de bien et des règles locales. Point de départ recommandé: ${cityPersonalization.authorizationNote}`,
    },
    {
      q: `Quel taux d’occupation viser à ${cityPage.city} ?`,
      a: `Sur un portefeuille bien piloté, la cible opérationnelle se situe généralement entre ${cityPersonalization.occupancyTargetRange}, à ajuster selon la saisonnalité et la qualité d’exécution terrain.`,
    },
    {
      q: 'Combien de temps pour rentabiliser l’automatisation ?',
      a: `En pratique, la plupart des équipes voient un retour opérationnel en ${cityPersonalization.automationPaybackMonths} via la baisse des tâches manuelles, la réduction des erreurs et une meilleure conversion pré-séjour.`,
    },
  ];

  const relatedBlogLinks = cityPersonalization.blogSlugs.map((slug) => ({
    slug,
    title: BLOG_TITLE_BY_SLUG[slug] ?? slug,
  }));
  const cityComparisonBaseline =
    CITY_COMPARISON_BASELINE[cityPage.slug] ??
    ({
      label: 'Moyenne nationale FR',
      tensionScore: 74,
      medianAdr: 128,
      occupancyRate: 72,
      medianBookingLeadDays: 15,
    } as const);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityPage.faq.map((item) => ({
      '@type': 'Question',
      name: accentizeFrenchText(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: accentizeFrenchText(item.answer),
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${SITE_BASE_URL}/fr`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Logiciel location saisonnière',
        item: `${SITE_BASE_URL}/fr/logiciel-location-saisonniere/${cityPage.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityPage.city,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <section className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {cityPage.region}
                </p>
                <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
                  {accentizeFrenchText(cityPage.heroTitle)}
                </h1>
                <p className="mt-4 max-w-3xl text-base text-gray-700 md:text-lg">
                  {accentizeFrenchText(cityPage.heroDescription)}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/${locale}/reserver-demo`}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    Réserver une démo
                  </Link>
                  <Link
                    href={`/${locale}/commencer-gratuitement`}
                    className="inline-flex items-center justify-center rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-blue-50"
                  >
                    Commencer gratuitement
                  </Link>
                </div>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/40">
                <img
                  src={cityVisual.src}
                  alt={`Vue illustrative de ${cityPage.city}`}
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Défis fréquents à {cityPage.city}</h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                {cityPage.painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{accentizeFrenchText(point)}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Ce que Biloki peut apporter</h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                {cityPage.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{accentizeFrenchText(outcome)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Checklist opérationnelle rapide</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-gray-700">
              <li>Connecter toutes les plateformes de réservation à un calendrier central.</li>
              <li>Standardiser les messages voyageurs pré-séjour, check-in et post-séjour.</li>
              <li>Attribuer les tâches terrain avec une responsabilité claire.</li>
              <li>Suivre chaque semaine taux d'occupation, revenu net et incidents.</li>
            </ol>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Tension locative courte durée à {cityPage.city}</h2>
            <p className="mt-3 text-gray-700">
              Ces indicateurs servent à estimer la pression locative locale et à fixer des objectifs d&apos;exploitation réalistes.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <article className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                <p className="text-sm font-semibold text-gray-700">Score de tension</p>
                <p className="mt-2 text-3xl font-bold text-primary">{rentalPressure.tensionScore}/100</p>
              </article>

              <article className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                <p className="text-sm font-semibold text-gray-700">ADR médian (prix moyen par nuit)</p>
                <p className="mt-2 text-3xl font-bold text-primary">{rentalPressure.medianAdr} €</p>
              </article>

              <article className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                <p className="text-sm font-semibold text-gray-700">Taux d&apos;occupation</p>
                <p className="mt-2 text-3xl font-bold text-primary">{rentalPressure.occupancyRate}%</p>
              </article>

              <article className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                <p className="text-sm font-semibold text-gray-700">Délai moyen de réservation</p>
                <p className="mt-2 text-3xl font-bold text-primary">{rentalPressure.medianBookingLeadDays} j</p>
              </article>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Méthodologie: benchmark opérationnel Biloki (mix OTA/direct, pression saisonnière, vitesse de remplissage et exécution terrain). À calibrer avec vos données réelles de portefeuille.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">Comparatif rapide: {cityPage.city} vs {cityComparisonBaseline.label}</h3>
              <p className="mt-2 text-sm text-gray-600">
                Lecture visuelle des principaux indicateurs de tension locative pour prioriser vos actions commerciales et opérationnelles.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ComparisonBar
                  label="Score de tension"
                  cityLabel={cityPage.city}
                  cityValue={rentalPressure.tensionScore}
                  benchmarkValue={cityComparisonBaseline.tensionScore}
                  benchmarkLabel={cityComparisonBaseline.label}
                  max={100}
                  unit="/100"
                />
                <ComparisonBar
                  label="ADR médian (prix moyen par nuit)"
                  cityLabel={cityPage.city}
                  cityValue={rentalPressure.medianAdr}
                  benchmarkValue={cityComparisonBaseline.medianAdr}
                  benchmarkLabel={cityComparisonBaseline.label}
                  max={220}
                  unit=" €"
                />
                <ComparisonBar
                  label="Taux d&apos;occupation"
                  cityLabel={cityPage.city}
                  cityValue={rentalPressure.occupancyRate}
                  benchmarkValue={cityComparisonBaseline.occupancyRate}
                  benchmarkLabel={cityComparisonBaseline.label}
                  max={100}
                  unit="%"
                />
                <ComparisonBar
                  label="Délai moyen de réservation"
                  cityLabel={cityPage.city}
                  cityValue={rentalPressure.medianBookingLeadDays}
                  benchmarkValue={cityComparisonBaseline.medianBookingLeadDays}
                  benchmarkLabel={cityComparisonBaseline.label}
                  max={30}
                  unit=" j"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              ADR (Average Daily Rate) = prix moyen facturé par nuit réservée, hors frais de ménage et taxes.
            </p>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Indicateurs chiffrés à suivre à {cityPage.city}</h2>
            <p className="mt-3 text-gray-700">
              Ces repères sont des benchmarks opérationnels pour cadrer vos objectifs locaux et piloter vos décisions semaine après semaine.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {cityKpis.map((kpi) => (
                <article key={kpi.label} className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                  <p className="text-sm font-semibold text-gray-700">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-bold text-primary">{kpi.value}</p>
                  <p className="mt-2 text-sm text-gray-700">{kpi.detail}</p>
                </article>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Note: ces valeurs sont des ordres de grandeur de pilotage (benchmark), à ajuster selon votre portefeuille, votre saisonnalité et vos canaux.
            </p>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Aperçu du logiciel Biloki</h2>
            <p className="mt-3 text-gray-700">
              Cette stack reprend les mêmes briques que les pages produit du site: channel manager, PMS et automatisation des messages.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <article className="overflow-hidden rounded-xl border border-blue-100 bg-white">
                <img
                  src="/images/pms/PMS-1.png"
                  alt="Calendrier centralisé Biloki"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">Calendrier centralisé</h3>
                  <p className="mt-2 text-sm text-gray-700">Évitez les conflits de réservations avec une vue unique sur tous vos canaux.</p>
                  <Link href={`/${locale}/fonctionnalites/channel-manager`} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                    Voir Channel Manager
                  </Link>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-blue-100 bg-white">
                <img
                  src="/images/pms/PMS-2.png"
                  alt="PMS Biloki"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">PMS opérationnel</h3>
                  <p className="mt-2 text-sm text-gray-700">Pilotez vos logements, tâches et équipes depuis une interface unique.</p>
                  <Link href={`/${locale}/fonctionnalites/pms`} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                    Voir PMS
                  </Link>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-blue-100 bg-white">
                <img
                  src="/images/pms/Messagerie.svg"
                  alt="Messagerie automatisée Biloki"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">Messages automatisés</h3>
                  <p className="mt-2 text-sm text-gray-700">Envoyez les bons messages au bon moment pour fluidifier le parcours voyageur.</p>
                  <Link href={`/${locale}/fonctionnalites/4-interfaces`} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                    Voir les 4 interfaces
                  </Link>
                </div>
              </article>
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Cas d’usage local à {cityPage.city}</h2>
            <p className="mt-3 text-gray-700">
              Scénarios concrets pour transformer la gestion quotidienne en résultat mesurable selon la taille de votre parc.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {localUseCases.map((useCase) => (
                <article key={useCase.title} className="rounded-xl border border-blue-100 bg-blue-50/20 p-4">
                  <h3 className="text-base font-semibold text-gray-900">{useCase.title}</h3>
                  <p className="mt-2 text-sm text-gray-700">{useCase.process}</p>
                  <p className="mt-3 text-sm font-medium text-primary">{useCase.kpi}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Liens utiles pour passer à l’action à {cityPage.city}</h2>
            <p className="mt-3 text-gray-700">
              Accédez directement aux pages produit et contenus les plus utiles pour accélérer votre déploiement.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Link href={`/${locale}/fonctionnalites/channel-manager`} className="rounded-lg border border-blue-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50">
                Channel Manager
              </Link>
              <Link href={`/${locale}/fonctionnalites/pms`} className="rounded-lg border border-blue-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50">
                PMS
              </Link>
              <Link href={`/${locale}/tarifs`} className="rounded-lg border border-blue-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50">
                Tarifs
              </Link>
              <Link href={`/${locale}/reserver-demo`} className="rounded-lg border border-blue-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50">
                Réserver une démo
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {relatedBlogLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/${locale}/blog/${link.slug}`}
                  className="rounded-lg border border-blue-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Données de marché utiles pour {cityPage.city}</h2>
            <p className="mt-3 text-gray-700">
              Avant de scaler votre activité locale, appuyez-vous sur des données fiables (tourisme, régulation, tendances hébergement) pour calibrer votre stratégie.
            </p>
            <ul className="mt-5 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Analyser la dynamique touristique nationale et régionale pour prioriser vos zones de croissance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Suivre les évolutions réglementaires locales (enregistrement, plafonds, autorisations).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Comparer vos indicateurs opérationnels locaux avec les tendances marché (occupation, délai de réponse, incidents).</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">Sources</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {DATA_SOURCES.map((source) => (
                <li key={source.label}>
                  <a
                    href={source.url}
                    target={source.url.startsWith('http') ? '_blank' : undefined}
                    rel={source.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-primary hover:underline"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-2xl bg-primary p-8 text-white shadow-sm md:p-10">
            <h2 className="text-2xl font-bold">Objectif: une opération locale plus rentable et plus stable</h2>
            <p className="mt-3 max-w-3xl text-white/90">
              Biloki vous aide à structurer votre gestion à {cityPage.city} avec des outils concrets déjà utilisés par les conciergeries et gestionnaires de locations courte durée.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/reserver-demo`}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-gray-100"
              >
                Demander une démo
              </Link>
              <Link
                href={`/${locale}/tarifs`}
                className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Voir les tarifs
              </Link>
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">FAQ locale transactionnelle</h2>
            <div className="mt-5 space-y-5">
              {localTransactionalFaq.map((item) => (
                <article key={item.q}>
                  <h3 className="text-lg font-semibold text-gray-900">{accentizeFrenchText(item.q)}</h3>
                  <p className="mt-2 text-gray-700">{accentizeFrenchText(item.a)}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}