/**
 * Configuration centralisée des tarifs et pricing
 * Source unique de vérité pour tous les prix
 * Utilisé par: PricingCalculator, pages tarifs, ChatBot, etc.
 */

export const PRICING_TIERS = [
  { min: 1, max: 3, pricePerMonth: 16.99 },
  { min: 4, max: 9, pricePerMonth: 14.99 },
  { min: 10, max: 49, pricePerMonth: 10.99 },
  { min: 50, max: 99, pricePerMonth: 8.99 },
  { min: 100, max: 200, pricePerMonth: 7.99 },
  { min: 201, max: Infinity, pricePerMonth: null },
];

export const ANNUAL_DISCOUNT = 0.2; // 20%
export const VAT_RATE = 0.2; // 20% TVA pour particuliers
export const FREE_TRIAL_DAYS = 30;

// Ces constantes sont maintenant dépréciées - utiliser les traductions i18n
export const FREE_TRIAL_DAYS_LABEL = `${FREE_TRIAL_DAYS} jours`;
export const FREE_TRIAL_CTA = `Essai gratuit ${FREE_TRIAL_DAYS_LABEL}`;
export const FREE_TRIAL_REASSURANCE = `Aucune carte bancaire requise • Accès complet pendant ${FREE_TRIAL_DAYS_LABEL}`;
export const MODULES = {
  comptabilite: {
    id: 'comptabilite',
    name: 'Module Comptabilité',
    description: 'Facturation et gestion comptable',
    pricePerUnit: 2, // €/logement/mois
  },
  ventesAdditionnelles: {
    id: 'ventes-additionnelles',
    name: 'Ventes additionnelles',
    description: 'Ventes d\'extras avec paiement sécurisé',
    pricePerUnit: 3, // €/logement/mois
  },
};

export const CUSTOM_PRICING_THRESHOLD = 200; // Au-delà = sur devis

export type BillingPeriod = 'monthly' | 'annual';

/**
 * Récupère le prix par logement pour un nombre de logements donnés
 */
export function getPricePerLogement(logementCount: number): number | null {
  const tier = PRICING_TIERS.find(t => logementCount >= t.min && logementCount <= t.max);
  return tier?.pricePerMonth ?? null;
}

/**
 * Calcule le prix total avec options
 */
export function calculatePrice(
  logementCount: number,
  billingPeriod: BillingPeriod,
  options?: {
    addComptabilite?: boolean;
    addVentesAdditionnelles?: boolean;
    ventesLogements?: number;
    isParticulier?: boolean;
  }
): {
  pricePerMonth: number;
  totalMonth: number;
  discount: boolean;
  totalComptabilite?: number;
  totalVentes?: number;
  totalBeforeTVA?: number;
  totalWithTVA?: number;
} | null {
  const basePrice = getPricePerLogement(logementCount);

  if (basePrice === null) {
    return null;
  }

  // Appliquer la remise annuelle au prix de base
  const displayPrice = billingPeriod === 'annual' ? basePrice * (1 - ANNUAL_DISCOUNT) : basePrice;
  const totalMonth = displayPrice * logementCount;

  // Modules optionnels
  let totalComptabilite = 0;
  let totalVentes = 0;

  if (options?.addComptabilite) {
    totalComptabilite = MODULES.comptabilite.pricePerUnit * logementCount * (billingPeriod === 'annual' ? (1 - ANNUAL_DISCOUNT) : 1);
  }

  if (options?.addVentesAdditionnelles && options?.ventesLogements) {
    totalVentes = MODULES.ventesAdditionnelles.pricePerUnit * options.ventesLogements * (billingPeriod === 'annual' ? (1 - ANNUAL_DISCOUNT) : 1);
  }

  const totalBeforeTVA = totalMonth + totalComptabilite + totalVentes;
  const totalWithTVA = options?.isParticulier ? totalBeforeTVA * (1 + VAT_RATE) : totalBeforeTVA;

  return {
    pricePerMonth: displayPrice,
    totalMonth,
    discount: billingPeriod === 'annual',
    totalComptabilite,
    totalVentes,
    totalBeforeTVA,
    totalWithTVA,
  };
}

/**
 * Récupère la plage de tarif pour affichage
 */
export function getTierRange(logementCount: number): string {
  const tier = PRICING_TIERS.find(t => logementCount >= t.min && logementCount <= t.max);
  if (!tier) return '';
  if (tier.max === Infinity) return `+${CUSTOM_PRICING_THRESHOLD} logements`;
  return `${tier.min}-${tier.max} logements`;
}

/**
 * Crée un message de tarifs lisible pour le chatbot, emails, etc.
 * @deprecated Utiliser les traductions i18n avec getPricingMessageI18n à la place
 */
export function getPricingMessage(): string {
  const tiers = PRICING_TIERS.filter(t => t.pricePerMonth !== null);
  const tierMessages = tiers.map(tier => {
    const label = tier.max === tiers[tiers.length - 1].max && tier.max !== Infinity
      ? `${tier.min}+ logements`
      : `${tier.min}-${tier.max} logements`;
    return `• ${label} : ${tier.pricePerMonth}€/mois`;
  });

  return `Nos tarifs sont dégressifs selon le nombre de logements :\n\n${tierMessages.join('\n')}\n\nEssai gratuit ${FREE_TRIAL_DAYS} jours, sans engagement ni CB requise !`;
}

/**
 * Interface pour les traductions de pricing
 */
interface PricingTranslations {
  intro: string;
  tierLabel: string;
  tierLabelPlus: string;
  tierPrice: string;
  trialInfo: string;
}

/**
 * Crée un message de tarifs avec traductions i18n
 * @param t - Fonction de traduction ou objet de traductions
 */
export function getPricingMessageI18n(t: PricingTranslations): string {
  const tiers = PRICING_TIERS.filter(tier => tier.pricePerMonth !== null);
  
  const tierMessages = tiers.map((tier, index) => {
    const isLast = index === tiers.length - 1 && tier.max !== Infinity;
    const label = isLast 
      ? t.tierLabelPlus.replace('{min}', tier.min.toString())
      : t.tierLabel.replace('{min}', tier.min.toString()).replace('{max}', tier.max.toString());
    const price = t.tierPrice.replace('{price}', tier.pricePerMonth!.toString());
    return `• ${label} : ${price}`;
  });

  const trialInfo = t.trialInfo.replace('{days}', FREE_TRIAL_DAYS.toString());
  
  return `${t.intro}\n\n${tierMessages.join('\n')}\n\n${trialInfo}`;
}
