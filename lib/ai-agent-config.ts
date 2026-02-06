/**
 * Configuration centralisée de l'Agent IA Biloki
 * 
 * ARCHITECTURE:
 * - Base de connaissance contrôlée (pas d'invention)
 * - Rôles spécialisés (qualification, produit, partenaires, conversion)
 * - CTA dynamiques selon le profil
 * - Règles strictes anti-hallucination
 */

import { PRICING_TIERS, FREE_TRIAL_DAYS, ANNUAL_DISCOUNT } from './pricing-config';
import { INTEGRATIONS_COUNT, MAIN_PLATFORMS } from './integrations-config';
import { CONTACT_EMAIL, SUPPORT_PHONE } from './config';

// ============================================================================
// POSITIONNEMENT & IDENTITÉ
// ============================================================================

export const AGENT_IDENTITY = {
  name: 'Biloki',
  role: 'assistant officiel',
  company: 'Biloki',
  target: 'conciergeries et gestionnaires de locations courte durée',
  tone: 'professionnel, concis, orienté action',
  personality: 'commercial discret, pas un professeur',
};

// ============================================================================
// INFORMATIONS DE CONTACT ENTREPRISE
// ============================================================================

export const COMPANY_INFO = {
  name: 'Biloki',
  legalName: 'SAS Biloki',
  email: CONTACT_EMAIL,
  phone: SUPPORT_PHONE,
  phoneFormatted: '09 64 18 00 69',
  address: '4 rue Voltaire - 44000 Nantes, France',
  website: 'https://www.biloki.fr',
  socialMedia: {
    linkedin: 'https://linkedin.com/company/biloki',
  },
  support: {
    email: CONTACT_EMAIL,
    phone: SUPPORT_PHONE,
    hours: 'Du lundi au vendredi, 9h-18h',
    responseTime: 'Sous 24h (jours ouvrables)',
  },
  contactPage: '/contact',
  legal: {
    rcs: 'Nantes n° 932 678 493',
    tva: 'FR69932678493',
    capital: '204 911,00 €',
    president: 'Vernay Sébastien',
    hebergeur: 'IONOS SARL - 7 place de la gare BP 70109 / 57201 Sarreguemines',
  },
};

// ============================================================================
// PROGRAMME DE PARRAINAGE
// ============================================================================

export const REFERRAL_PROGRAM = {
  url: '/programme-parrainage',
  forReferrer: {
    reward: '1 mois d\'abonnement offert par parrainage',
    cumulative: true,
    priorityAccess: 'Accès prioritaire aux nouvelles fonctionnalités',
  },
  forReferee: {
    discount: '20% de réduction sur le premier mois',
    onboarding: 'Accompagnement personnalisé à l\'onboarding',
    prioritySupport: 'Support prioritaire pendant 3 mois',
  },
  howItWorks: [
    'Partagez votre lien unique de parrainage',
    'Vos filleuls créent leur compte et souscrivent',
    'Recevez vos récompenses automatiquement',
  ],
  faq: [
    { q: 'Y a-t-il une limite de parrainages ?', a: 'Aucune limite, les récompenses sont cumulables' },
    { q: 'Quand reçoit-on la récompense ?', a: 'Dès que le filleul souscrit et paye son premier mois' },
    { q: 'Le lien de parrainage est-il obligatoire ?', a: 'Oui, l\'inscription doit se faire via le lien unique' },
    { q: 'Peut-on parrainer un client existant ?', a: 'Non, uniquement les nouveaux clients' },
  ],
};

// ============================================================================
// FAQ GÉNÉRALE
// ============================================================================

export const FAQ = {
  general: [
    { q: 'Quel est le délai de réponse du support ?', a: 'Sous 24h les jours ouvrables (lundi-vendredi, 9h-18h)' },
    { q: 'Comment démarrer l\'essai gratuit ?', a: 'Cliquez sur "Essai gratuit", aucune carte bancaire requise' },
    { q: 'Y a-t-il un support téléphonique ?', a: 'Oui, du lundi au vendredi de 9h à 18h au 09 64 18 00 69' },
    { q: 'Peut-on avoir une démo personnalisée ?', a: 'Oui, réservez un créneau sur notre page démo' },
    { q: 'Combien de temps pour être opérationnel ?', a: 'Moins de 48h avec notre accompagnement migration' },
  ],
  pricing: [
    { q: 'Les tarifs sont-ils HT ou TTC ?', a: 'Tous les tarifs affichés sont HT' },
    { q: 'Peut-on changer de forfait ?', a: 'Oui, à tout moment depuis votre espace client' },
    { q: 'Y a-t-il un engagement ?', a: 'Non, vous pouvez résilier à tout moment' },
    { q: 'Quelle est la réduction annuelle ?', a: '20% de réduction en optant pour le paiement annuel' },
  ],
  technical: [
    { q: 'Quelles OTAs sont connectées ?', a: 'Plus de 50+ plateformes : Airbnb, Booking, Vrbo, Expedia, Abritel, Tripadvisor, etc.' },
    { q: 'La synchronisation est-elle instantanée ?', a: 'Oui, synchronisation temps réel avec zéro double réservation' },
    { q: 'Quelles serrures sont compatibles ?', a: 'Nuki, TTLock, Igloohome, August et bien d\'autres' },
    { q: 'Peut-on importer ses données existantes ?', a: 'Oui, import automatique de vos données avec accompagnement' },
  ],
};

// ============================================================================
// BÉNÉFICES CHIFFRÉS
// ============================================================================

export const BENEFITS_METRICS = {
  timeSaved: '20h/semaine',
  adminReduction: '70%',
  migrationTime: '< 48h',
  supportResponse: '< 2h',
  doubleBookings: '0',
  platforms: '50+',
  languages: 5,
};

// ============================================================================
// ARTICLES DE BLOG (résumés pour l'agent)
// ============================================================================

export const BLOG_ARTICLES = {
  channelManagerGuide: {
    title: 'Channel Manager : Guide Complet 2026',
    url: '/blog/channel-manager-guide-complet-conciergeries',
    summary: 'Un channel manager synchronise vos calendriers, tarifs et disponibilités sur toutes les OTAs. Les 3 fonctions essentielles : synchronisation calendriers, gestion tarifs centralisée, distribution de contenu. Gain estimé : 15-20h/semaine.',
    keyPoints: [
      'Synchronisation temps réel multi-plateformes',
      'Zéro double réservation garantie',
      'Tarification centralisée',
      'Gain de 15-20h par semaine',
    ],
  },
  automationGuide: {
    title: 'Automatiser la Gestion des Locations Saisonnières',
    url: '/blog/automatiser-gestion-locations-saisonnieres',
    summary: 'Automatisez les tâches répétitives pour gagner jusqu\'à 20h/semaine : messages automatiques, génération de codes d\'accès, planning ménage, facturation.',
    keyPoints: [
      'Automatisation des messages voyageurs',
      'Génération automatique des codes serrures',
      'Planning prestataires automatisé',
      'Facturation et reporting automatiques',
    ],
  },
  messagingGuide: {
    title: 'Messagerie automatisée : Scripts et Workflows',
    url: '/blog/messagerie-automatisee-conciergerie',
    summary: '6 messages essentiels à automatiser : réponse instantanée, confirmation, instructions J-2, accueil jour J, satisfaction J+1, pré-checkout.',
    templates: [
      'Réponse à demande de réservation',
      'Confirmation de réservation',
      'Instructions d\'accès (J-2)',
      'Message d\'accueil (jour J)',
      'Check satisfaction (J+1)',
      'Pré-check-out et demande d\'avis',
    ],
  },
};

// ============================================================================
// MODULES OPTIONNELS DÉTAILLÉS (désactivés pour le moment)
// ============================================================================

export const OPTIONAL_MODULES = {
  // Modules désactivés - à réactiver ultérieurement si besoin
};

// ============================================================================
// FONCTIONNALITÉS INCLUSES DANS LE FORFAIT DE BASE
// ============================================================================

export const INCLUDED_FEATURES = [
  'Gestion complète des réservations',
  '4 interfaces (gestionnaire, propriétaire, prestataire, locataire)',
  'Channel Manager (Airbnb, Booking, Vrbo, Expedia, etc.)',
  'Synchronisation multi-canaux temps réel',
  'Messagerie centralisée (email, SMS, WhatsApp)',
  'Intégration serrures connectées',
  'Génération automatique des factures',
  'Reporting et statistiques',
  'Support multi-langues (FR, EN, ES, DE, PT)',
  'Automatisations de base',
  'Application mobile',
  'Support client inclus',
];

// ============================================================================
// RÈGLES STRICTES (ANTI-HALLUCINATION)
// ============================================================================

export const AGENT_RULES = {
  never: [
    'inventer des fonctionnalités',
    'promettre ce qui n\'existe pas',
    'répondre hors périmètre Biloki',
    'donner des conseils juridiques ou fiscaux',
    'mentionner des prix non officiels',
  ],
  always: [
    'dire "je ne sais pas encore" si information manquante',
    'proposer une action ou un lien',
    'rester concis (max 3-4 phrases par réponse)',
    'terminer par un CTA pertinent',
  ],
};

// ============================================================================
// BASE DE CONNAISSANCE PRODUIT
// ============================================================================

export const PRODUCT_KNOWLEDGE = {
  // Qu'est-ce que Biloki ?
  whatIs: {
    short: 'Biloki est un logiciel tout-en-un pour les conciergeries et gestionnaires de locations courte durée.',
    detailed: 'Biloki centralise la gestion des réservations, la communication avec les voyageurs, la coordination des prestataires et le reporting propriétaires dans une seule plateforme.',
  },

  // Fonctionnalités principales
  features: {
    pms: {
      name: 'PMS (Property Management System)',
      description: 'Gestion complète des logements, séjours, voyageurs et revenus',
      benefits: ['Centralisation des données', 'Historique complet', 'Multi-propriétaires'],
      url: '/fonctionnalites/pms',
    },
    channelManager: {
      name: 'Channel Manager',
      description: `Synchronisation avec ${INTEGRATIONS_COUNT}+ plateformes de réservation`,
      benefits: ['Zéro double réservation', 'Calendriers synchronisés', 'Tarifs unifiés'],
      platforms: MAIN_PLATFORMS,
      url: '/fonctionnalites/channel-manager',
    },
    messaging: {
      name: 'Messagerie centralisée',
      description: 'Email, SMS et WhatsApp depuis une seule interface',
      benefits: ['Réponses automatiques', 'Templates personnalisés', 'Historique unifié'],
      url: '/fonctionnalites/messagerie',
    },
    providers: {
      name: 'Gestion des prestataires',
      description: 'Coordination du ménage, maintenance et services',
      benefits: ['Planning automatique', 'Notifications push', 'Suivi des interventions'],
      url: '/fonctionnalites/prestataires',
    },
    smartLocks: {
      name: 'Serrures connectées',
      description: 'Génération automatique des codes d\'accès',
      partners: ['Nuki', 'TTLock', 'Igloohome', 'August'],
      benefits: ['Codes uniques par séjour', 'Accès sans clé', 'Historique des accès'],
      url: '/fonctionnalites/serrures-connectees',
    },
    ai: {
      name: 'IA intégrée',
      description: 'Assistant intelligent pour voyageurs et équipes',
      benefits: ['Réponses 24/7', 'Suggestions d\'actions', 'Automatisation des tâches'],
      url: '/fonctionnalites/ia-automatisation',
    },
    reporting: {
      name: 'Reporting & Analytics',
      description: 'Tableaux de bord et rapports personnalisés',
      benefits: ['KPIs en temps réel', 'Export PDF/Excel', 'Rapports propriétaires'],
      url: '/fonctionnalites/reporting',
    },
    interfaces: {
      name: '4 interfaces dédiées',
      description: 'Une interface adaptée à chaque rôle',
      roles: ['Conciergerie', 'Propriétaire', 'Prestataire', 'Voyageur'],
      url: '/fonctionnalites/4-interfaces',
    },
    marketplace: {
      name: 'Marketplace API',
      description: 'Intégrations avec les meilleurs outils du marché',
      categories: ['Pricing dynamique', 'Comptabilité', 'Paiements', 'CRM'],
      url: '/fonctionnalites/marketplace-api',
    },
  },

  // Tarification (dynamique depuis pricing-config)
  pricing: {
    model: 'par logement par mois',
    tiers: PRICING_TIERS.filter(t => t.pricePerMonth !== null),
    annualDiscount: `${ANNUAL_DISCOUNT * 100}%`,
    trialDays: FREE_TRIAL_DAYS,
    noCardRequired: true,
    customQuoteThreshold: 200,
  },

  // Ce que Biloki NE FAIT PAS (important pour éviter les promesses)
  limitations: [
    'Biloki ne fait pas de pricing dynamique natif (mais s\'intègre avec PriceLabs, Wheelhouse)',
    'Biloki ne gère pas la comptabilité complète (mais exporte vers les logiciels comptables)',
    'Biloki ne fait pas de conciergerie physique (c\'est un logiciel, pas un service)',
  ],
};

// ============================================================================
// BASE DE CONNAISSANCE PARTENAIRES
// ============================================================================

export const PARTNERS_KNOWLEDGE = {
  smartLocks: {
    nuki: {
      name: 'Nuki',
      type: 'Serrure connectée',
      integration: 'API directe',
      setup: 'Configuration en 5 minutes',
      url: '/connexions-api',
    },
    ttlock: {
      name: 'TTLock',
      type: 'Serrure connectée',
      integration: 'API directe',
      url: '/connexions-api',
    },
    igloohome: {
      name: 'Igloohome',
      type: 'Serrure connectée',
      integration: 'API directe',
      url: '/connexions-api',
    },
  },
  pricing: {
    pricelabs: {
      name: 'PriceLabs',
      type: 'Pricing dynamique',
      integration: 'API bidirectionnelle',
      url: '/connexions-api',
    },
    wheelhouse: {
      name: 'Wheelhouse',
      type: 'Pricing dynamique',
      integration: 'API',
      url: '/connexions-api',
    },
  },
  otas: {
    airbnb: { name: 'Airbnb', integration: 'API directe' },
    booking: { name: 'Booking.com', integration: 'API directe' },
    vrbo: { name: 'Vrbo', integration: 'API directe' },
    expedia: { name: 'Expedia', integration: 'API directe' },
  },
};

// ============================================================================
// DIFFÉRENCIATION CONCURRENCE
// ============================================================================

export const COMPETITORS_COMPARISON = {
  vsGuesty: {
    bilokiAdvantages: [
      'Interface en français',
      'Support francophone',
      'Tarifs plus accessibles pour les petites structures',
      'Simplicité d\'utilisation',
    ],
    guestyAdvantages: ['Plus de fonctionnalités avancées pour très grandes structures'],
    recommendation: 'Biloki est idéal pour les conciergeries françaises de 1 à 200 logements',
  },
  vsLodgify: {
    bilokiAdvantages: [
      'Channel Manager plus complet',
      'Gestion des prestataires intégrée',
      'Interface propriétaires dédiée',
    ],
    recommendation: 'Biloki offre une solution plus complète pour les professionnels',
  },
  vsSmoobu: {
    bilokiAdvantages: [
      'Fonctionnalités conciergerie avancées',
      'Marketplace d\'intégrations',
      'IA intégrée',
    ],
  },
};

// ============================================================================
// PROFILS UTILISATEURS & CTA DYNAMIQUES
// ============================================================================

export type UserProfileType = 'owner' | 'concierge' | 'manager' | 'unknown';
export type UserSize = 'small' | 'medium' | 'large' | 'enterprise' | 'unknown';

export interface UserProfile {
  type: UserProfileType;
  size: UserSize;
  propertyCount?: number;
  currentTools?: string[];
  mainProblem?: string;
  interests?: string[];
}

export const USER_SIZE_THRESHOLDS = {
  small: { min: 1, max: 5 },
  medium: { min: 6, max: 20 },
  large: { min: 21, max: 100 },
  enterprise: { min: 101, max: Infinity },
};

export function getUserSize(propertyCount: number): UserSize {
  if (propertyCount <= 5) return 'small';
  if (propertyCount <= 20) return 'medium';
  if (propertyCount <= 100) return 'large';
  return 'enterprise';
}

import { WEBAPP_REGISTER_URL } from './config';

// CTA dynamiques selon le profil
export const DYNAMIC_CTAS = {
  // Petits gestionnaires (1-5 logements)
  small: {
    primary: { label: 'startFreeTrial', url: WEBAPP_REGISTER_URL },
    secondary: { label: 'seePricing', url: '/tarifs' },
  },
  // Moyens (6-20 logements)
  medium: {
    primary: { label: 'bookDemo', url: '/reserver-demo' },
    secondary: { label: 'startFreeTrial', url: WEBAPP_REGISTER_URL },
  },
  // Grands (21-100 logements)
  large: {
    primary: { label: 'bookDemo', url: '/reserver-demo' },
    secondary: { label: 'contactUs', url: '/contact' },
  },
  // Entreprises (100+ logements)
  enterprise: {
    primary: { label: 'contactSales', url: '/contact' },
    secondary: { label: 'bookDemo', url: '/reserver-demo' },
  },
  // Par défaut
  unknown: {
    primary: { label: 'bookDemo', url: '/reserver-demo' },
    secondary: { label: 'startFreeTrial', url: WEBAPP_REGISTER_URL },
  },
};

// ============================================================================
// TOPICS & INTENTS (pour la détection)
// ============================================================================

export const TOPICS = {
  pricing: ['prix', 'tarif', 'coût', 'cout', 'combien', 'price', 'pricing', 'cost', 'precio', 'cuánto', 'cuanto', 'preço', 'preco', 'quanto', 'cher', 'gratuit', 'free', 'gratis', 'forfait', 'abonnement', 'subscription', 'mensuel', 'annuel'],
  features: ['fonctionnalité', 'fonctionnalites', 'fonction', 'fait quoi', 'propose', 'feature', 'funcionalidad', 'funcionalidade', 'permet', 'capable', 'possibilité'],
  demo: ['démo', 'demo', 'essai', 'tester', 'voir', 'trial', 'test', 'prueba', 'teste', 'découvrir', 'essayer'],
  contact: ['contact', 'contacter', 'téléphone', 'telephone', 'email', 'mail', 'appeler', 'joindre', 'numéro', 'numero', 'adresse', 'phone', 'call', 'reach', 'contacto', 'llamar', 'contato', 'ligar'],
  channelManager: ['channel manager', 'channel-manager', 'ota', 'airbnb', 'booking', 'vrbo', 'synchronisation', 'sync', 'calendrier', 'plateforme'],
  smartLocks: ['serrure', 'code', 'accès', 'acces', 'nuki', 'ttlock', 'igloohome', 'lock', 'cerradura', 'fechadura', 'clé', 'cle', 'key'],
  pms: ['pms', 'logement', 'propriété', 'property', 'gestion', 'management', 'propiedad', 'propriedade', 'bien', 'appartement', 'maison'],
  messaging: ['message', 'messagerie', 'email', 'sms', 'whatsapp', 'communication', 'voyageur', 'guest', 'huésped', 'hóspede', 'locataire', 'client'],
  providers: ['prestataire', 'ménage', 'menage', 'cleaning', 'maintenance', 'provider', 'proveedor', 'prestador', 'nettoyage', 'linge', 'intervenant'],
  ai: ['ia', 'intelligence artificielle', 'automatisation', 'automation', 'ai', 'artificial', 'inteligencia', 'inteligência', 'automatique', 'robot'],
  migration: ['migration', 'changer', 'import', 'switch', 'migrer', 'cambiar', 'mudar', 'transfert', 'quitter', 'passer de'],
  support: ['support', 'aide', 'help', 'assistance', 'ayuda', 'ajuda', 'problème', 'problema', 'bug', 'erreur'],
  comparison: ['guesty', 'lodgify', 'smoobu', 'hostaway', 'comparaison', 'comparison', 'vs', 'versus', 'différence', 'mieux', 'meilleur', 'better'],
  integration: ['intégration', 'integration', 'api', 'connecter', 'connect', 'partenaire', 'partner', 'connexion'],
  reporting: ['reporting', 'rapport', 'statistique', 'analytics', 'kpi', 'dashboard', 'tableau de bord', 'revenus', 'performance'],
  referral: ['parrainage', 'parrain', 'filleul', 'parrainer', 'referral', 'sponsor', 'récompense', 'recompense', 'recommander'],
  faq: ['faq', 'question fréquente', 'questions fréquentes'],
  team: ['équipe', 'equipe', 'team', 'fondateur', 'créateur', 'behind', 'entreprise', 'société', 'societe', 'qui êtes-vous', 'who are you'],
  legal: ['cgv', 'conditions', 'mentions légales', 'mentions legales', 'juridique', 'legal', 'rgpd', 'données personnelles', 'privacy', 'politique'],
  blog: ['blog', 'article', 'guide', 'conseil', 'astuce', 'tutoriel', 'tutorial', 'apprendre', 'learn', 'lire'],
  modules: ['module', 'option', 'comptabilité', 'comptabilite', 'vente', 'additionnelle', 'extra', 'supplément', 'supplement', 'add-on'],
  included: ['inclus', 'compris', 'forfait de base', 'included', 'basic', 'standard', 'contient'],
  benefits: ['avantage', 'bénéfice', 'benefice', 'gain', 'temps gagné', 'économie', 'economie', 'benefit', 'advantage', 'pourquoi'],
  whatIsBiloki: ['c\'est quoi biloki', 'what is biloki', 'qu\'est-ce que biloki', 'présente biloki', 'présentation de biloki', 'explain biloki', 'describe biloki', 'tell me about biloki', 'qué es biloki', 'o que é biloki'],
};

// ============================================================================
// CONVERSATION STEPS
// ============================================================================

export type ConversationStep = 
  | 'greeting'
  | 'qualification' 
  | 'discovery'
  | 'product_expert'
  | 'partner_expert'
  | 'conversion'
  | 'support';

export const CONVERSATION_FLOW = {
  greeting: {
    nextSteps: ['qualification'],
    objective: 'Accueillir et identifier le type d\'utilisateur',
  },
  qualification: {
    nextSteps: ['discovery', 'product_expert'],
    objective: 'Comprendre qui est l\'utilisateur (type, taille, problème)',
    questions: ['userType', 'propertyCount', 'mainProblem'],
  },
  discovery: {
    nextSteps: ['product_expert', 'partner_expert', 'conversion'],
    objective: 'Découvrir les besoins spécifiques',
  },
  product_expert: {
    nextSteps: ['partner_expert', 'conversion'],
    objective: 'Expliquer les fonctionnalités pertinentes',
  },
  partner_expert: {
    nextSteps: ['conversion'],
    objective: 'Détailler les intégrations et partenaires',
  },
  conversion: {
    nextSteps: ['support'],
    objective: 'Guider vers l\'action (signup, démo, contact)',
  },
  support: {
    nextSteps: ['conversion'],
    objective: 'Répondre aux questions et lever les objections',
  },
};

// ============================================================================
// RÉPONSES TYPES (pour éviter l'invention)
// ============================================================================

export const FALLBACK_RESPONSES = {
  unknownFeature: 'Je ne dispose pas d\'information sur cette fonctionnalité. Souhaitez-vous que je vous mette en contact avec notre équipe ?',
  outOfScope: 'Cette question dépasse mon domaine d\'expertise. Je vous invite à contacter notre équipe pour une réponse précise.',
  needMoreInfo: 'Pour mieux vous aider, pourriez-vous me donner plus de détails sur votre situation ?',
};

// ============================================================================
// URLS IMPORTANTES
// ============================================================================

export const IMPORTANT_URLS = {
  signup: WEBAPP_REGISTER_URL,
  demo: '/reserver-demo',
  pricing: '/tarifs',
  contact: '/contact',
  features: '/fonctionnalites',
  blog: '/blog',
  api: '/connexions-api',
  faq: '/faq',
};
