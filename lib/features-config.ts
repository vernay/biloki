/**
 * Configuration centralisée des fonctionnalités du produit
 * Utilisé par: Header, pages de features, etc.
 */

export interface Feature {
  id: string;
  label: string;
  href: string;
  description: string;
  icon?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
}

export const FEATURES: Feature[] = [
  {
    id: 'pms',
    label: 'PMS',
    href: '/fonctionnalites/pms',
    description: 'Gestion complète des propriétés',
    icon: '🏠',
  },
  {
    id: 'channel-manager',
    label: 'Channel Manager',
    href: '/fonctionnalites/channel-manager',
    description: 'Synchronisation sur 120+ plateformes',
    icon: '🔄',
    subItems: [
      { label: 'Synchronisation des calendriers', href: '/fonctionnalites/channel-manager/calendriers' },
      { label: 'Connexion Airbnb', href: '/fonctionnalites/channel-manager/airbnb' },
      { label: 'Connexion Booking', href: '/fonctionnalites/channel-manager/booking' },
    ],
  },
  {
    id: 'serrures-connectees',
    label: 'Serrures connectées',
    href: '/fonctionnalites/serrures-connectees',
    description: 'Accès intelligent et sécurisé',
    icon: '🔐',
  },
  {
    id: '4-interfaces',
    label: 'Les 4 interfaces',
    href: '/fonctionnalites/4-interfaces',
    description: 'Outils adaptés à chaque rôle',
    icon: '👥',
  },
  {
    id: 'marketplace-api',
    label: 'Marketplace API',
    href: '/fonctionnalites/marketplace-api',
    description: 'Intégrations et extensions',
    icon: '🔗',
  },
];

/**
 * Récupère une feature par son ID
 */
export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find(f => f.id === id);
}

/**
 * Récupère tous les liens de navigation principaux (sans subItems)
 */
export function getMainFeatures(): Feature[] {
  return FEATURES;
}
