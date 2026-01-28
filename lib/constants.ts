import { FREE_TRIAL_DAYS, FREE_TRIAL_DAYS_LABEL, ANNUAL_DISCOUNT } from './pricing-config';

/**
 * Configuration centralisée des constantes métier
 * Tous les nombres et constantes clés du produit
 */

// Pricing & Billing
export const FREE_TRIAL_DURATION_DAYS = FREE_TRIAL_DAYS;
export const ANNUAL_DISCOUNT_PERCENT = ANNUAL_DISCOUNT * 100; // Dynamique depuis pricing-config

// Product specs
export const CHANNEL_MANAGER_PLATFORMS = 120;
export const CUSTOM_PRICING_THRESHOLD = 200;

// Features count
export const TOTAL_FEATURES = 11;

// Company info
export const COMPANY_NAME = 'Biloki';
export const COMPANY_SLOGAN = 'Plateforme de gestion de locations saisonnières';

/**
 * Messages génériques
 */
export const MESSAGES = {
  freeTrialBanner: `Essai gratuit ${FREE_TRIAL_DAYS_LABEL}, sans engagement ni CB requise !`,
  noCardRequired: `Aucune carte bancaire requise • Accès complet pendant ${FREE_TRIAL_DAYS_LABEL}`,
  annualDiscount: `Remise annuelle de ${ANNUAL_DISCOUNT_PERCENT}% sur le forfait de base`,
  customPricingThreshold: `Pour plus de ${CUSTOM_PRICING_THRESHOLD} logements, nos équipes vous proposeront une offre personnalisée.`,
  freeTrialCTA: `Essai gratuit ${FREE_TRIAL_DAYS_LABEL}`,
  noCreditCard: 'Sans engagement • Sans carte bancaire • Support inclus',
};
