/**
 * Configuration centralisée des intégrations et partenaires
 * Source unique de vérité pour tous les OTAs et intégrations
 */

export interface Integration {
  name: string;
  logo: string;
  category: string;
  url?: string;
}

export const INTEGRATIONS_BY_PLATFORM = {
  airbnb: 'Airbnb',
  booking: 'Booking.com',
  vrbo: 'Vrbo',
  expedia: 'Expedia',
  abritel: 'Abritel',
  homeaway: 'HomeAway',
  tripadvisor: 'TripAdvisor',
  agoda: 'Agoda',
};

// Liste des plateformes principales (affichées en priorité)
export const MAIN_PLATFORMS = [
  'Airbnb',
  'Booking.com',
  'Vrbo',
  'Expedia',
  'Abritel',
  'HomeAway',
  'TripAdvisor',
  'Agoda',
];

// Constantes sur les intégrations
export const INTEGRATIONS_COUNT = 120;
export const MAIN_PLATFORMS_COUNT = 8;

/**
 * Récupère la liste des noms de plateformes principales
 */
export function getMainPlatforms(): string[] {
  return MAIN_PLATFORMS;
}

/**
 * Génère un message lisible sur les intégrations
 * @deprecated Utiliser getIntegrationsMessageI18n avec traductions i18n
 */
export function getIntegrationsMessage(): string {
  return `Biloki se connecte avec plus de ${INTEGRATIONS_COUNT} plateformes :\n\n🔗 Connexions API directes :\n• ${MAIN_PLATFORMS.join('\n• ')}\n• et ${INTEGRATIONS_COUNT - MAIN_PLATFORMS_COUNT} autres via iCal\n\nTout est synchronisé en temps réel : calendriers, tarifs, réservations. Zéro double booking ! ⚡`;
}

/**
 * Interface pour les traductions d'intégrations
 */
interface IntegrationsTranslations {
  intro: string;
  directApi: string;
  othersViaIcal: string;
  syncInfo: string;
}

/**
 * Génère un message sur les intégrations avec traductions i18n
 */
export function getIntegrationsMessageI18n(t: IntegrationsTranslations): string {
  const intro = t.intro.replace('{count}', INTEGRATIONS_COUNT.toString());
  const othersCount = INTEGRATIONS_COUNT - MAIN_PLATFORMS_COUNT;
  const othersViaIcal = t.othersViaIcal.replace('{count}', othersCount.toString());
  
  return `${intro}\n\n${t.directApi}\n• ${MAIN_PLATFORMS.join('\n• ')}\n• ${othersViaIcal}\n\n${t.syncInfo}`;
}

/**
 * Récupère la description pour les features
 * @deprecated Utiliser getFeaturesListMessageI18n avec traductions i18n
 */
export function getFeaturesListMessage(): string {
  return `Biloki est une plateforme tout-en-un qui inclut :\n\n✅ PMS complet (logements, séjours, voyageurs, revenus)\n✅ Channel Manager (${INTEGRATIONS_COUNT}+ OTAs)\n✅ Messagerie centralisée (Email, SMS, WhatsApp)\n✅ Gestion des prestataires\n✅ Serrures connectées (codes automatiques)\n✅ IA intégrée\n✅ Reporting & analytics\n✅ Multi-langues\n\nVoulez-vous une démo pour voir tout ça en action ?`;
}

/**
 * Interface pour les traductions des features
 */
interface FeaturesTranslations {
  intro: string;
  pms: string;
  channelManager: string;
  messaging: string;
  providers: string;
  locks: string;
  ai: string;
  reporting: string;
  multiLanguage: string;
  outro: string;
}

/**
 * Génère la liste des fonctionnalités avec traductions i18n
 */
export function getFeaturesListMessageI18n(t: FeaturesTranslations): string {
  const channelManager = t.channelManager.replace('{count}', INTEGRATIONS_COUNT.toString());
  
  return `${t.intro}\n\n✅ ${t.pms}\n✅ ${channelManager}\n✅ ${t.messaging}\n✅ ${t.providers}\n✅ ${t.locks}\n✅ ${t.ai}\n✅ ${t.reporting}\n✅ ${t.multiLanguage}\n\n${t.outro}`;
}
