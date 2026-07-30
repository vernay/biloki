/**
 * Configuration partagée entre Header et Footer
 * Les modifications ici se reflètent automatiquement dans les deux composants
 */

export const MEGA_FEATURE_ITEMS = [
  {
    key: 'reservations',
    href: '/fonctionnalites/reservations',
    iconPath: 'M8 7V5m8 2V5M7 11h10m-9 8h8a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z',
    translationKey: 'reservations', // Clé pour le titre détaillé
  },
  {
    key: 'planningMissions',
    href: '/fonctionnalites/planning-missions',
    iconPath: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9m-7-4h4m0 0v4m0-4L10 14',
    translationKey: 'planningMissions',
  },
  {
    key: 'unifiedMessaging',
    href: '/fonctionnalites/messagerie-unifiee',
    iconPath: 'M8 10h8M8 14h5m-7 5l-3 1 1-3a9 9 0 1115 0 9 9 0 01-13 2z',
    translationKey: 'unifiedMessaging',
  },
  {
    key: 'travelerInterface',
    href: '/fonctionnalites/interface-voyageurs?view=traveler',
    iconPath: 'M9 17h6m-8 3h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2zm3-13h4',
    translationKey: 'travelerInterface',
  },
  {
    key: 'ownerInterface',
    href: '/fonctionnalites/interface-proprietaires',
    iconPath: 'M17 20h5V10H2v10h5m10 0v-6a3 3 0 00-6 0v6m6 0H7',
    translationKey: 'ownerInterface',
  },
  {
    key: 'additionalSales',
    href: '/fonctionnalites/ventes-additionnelles',
    iconPath: 'M12 8c-2.21 0-4 .896-4 2s1.79 2 4 2 4 .896 4 2-1.79 2-4 2m0-10v12m0-12c1.657 0 3 1.343 3 3',
    translationKey: 'additionalSales',
  },
  {
    key: 'statistics',
    href: '/fonctionnalites/statistiques',
    iconPath: 'M7 16V8m5 8V6m5 10v-4M5 19h14',
    translationKey: 'statistics',
  },
  {
    key: 'smartLocks',
    href: '/fonctionnalites/serrures-connectees',
    iconPath: 'M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v4m-4 4h8a2 2 0 002-2v-3a6 6 0 10-12 0v3a2 2 0 002 2z',
    translationKey: 'smartLocks',
  },
  {
    key: 'marketplaceApi',
    href: '/fonctionnalites/marketplace-api',
    iconPath: 'M8 12h8m-4-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    translationKey: 'marketplaceApi',
  },
];

export const FOOTER_FEATURE_ITEMS = MEGA_FEATURE_ITEMS.slice(0, 9);
