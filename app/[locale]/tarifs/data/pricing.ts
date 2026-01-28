export const PRICING_TIERS = [
  { min: 1, max: 3, pricePerMonth: 16.99 },
  { min: 4, max: 9, pricePerMonth: 14.99 },
  { min: 10, max: 49, pricePerMonth: 9.99 },
  { min: 50, max: 99, pricePerMonth: 7.99 },
  { min: 100, max: 200, pricePerMonth: 6.99 },
  { min: 201, max: Infinity, pricePerMonth: null },
];

export const ANNUAL_DISCOUNT = 0.1; // 10%

export type BillingPeriod = 'monthly' | 'annual';

export function getPricePerLogement(logementCount: number): number | null {
  const tier = PRICING_TIERS.find(t => logementCount >= t.min && logementCount <= t.max);
  return tier?.pricePerMonth ?? null;
}

export function calculatePrice(
  logementCount: number,
  billingPeriod: BillingPeriod
): { pricePerMonth: number; totalMonth: number; discount: boolean } | null {
  const basePrice = getPricePerLogement(logementCount);
  
  if (basePrice === null) {
    return null;
  }

  const displayPrice = billingPeriod === 'annual' ? basePrice * (1 - ANNUAL_DISCOUNT) : basePrice;
  const totalMonth = displayPrice * logementCount;

  return {
    pricePerMonth: displayPrice,
    totalMonth,
    discount: billingPeriod === 'annual',
  };
}

export function getTierRange(logementCount: number): string {
  const tier = PRICING_TIERS.find(t => logementCount >= t.min && logementCount <= t.max);
  if (!tier) return '';
  if (tier.max === Infinity) return `+200 logements`;
  return `${tier.min}-${tier.max} logements`;
}
