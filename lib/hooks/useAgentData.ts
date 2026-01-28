/**
 * Hook personnalisé pour récupérer les données de l'agent IA
 * 
 * Utilise l'API /api/agent/data pour obtenir les données dynamiquement
 * au lieu d'importer directement les fichiers de configuration.
 * 
 * Avantages:
 * - Données toujours à jour sans rebuild
 * - Cache côté client (SWR pattern)
 * - Gestion des erreurs
 * - Support multilingue automatique
 */

import { useState, useEffect, useCallback } from 'react';

export interface AgentPricingTier {
  min: number;
  max: number;
  pricePerMonth: number | null;
}

export interface AgentModule {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number;
}

export interface AgentFeature {
  name: string;
  description: string;
  benefits: string[];
  url: string;
  platforms?: string[];
  partners?: string[];
  roles?: string[];
  categories?: string[];
}

export interface AgentCTA {
  primary: { label: string; url: string };
  secondary: { label: string; url: string };
}

export interface AgentCompanyInfo {
  name: string;
  legalName?: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  address: string;
  website: string;
  socialMedia: {
    linkedin: string;
  };
  support: {
    email: string;
    phone: string;
    hours: string;
    responseTime?: string;
  };
  contactPage: string;
  legal?: {
    rcs: string;
    tva: string;
    capital: string;
    president: string;
    hebergeur: string;
  };
}

export interface ReferralProgram {
  url: string;
  forReferrer: {
    reward: string;
    cumulative: boolean;
    priorityAccess: string;
  };
  forReferee: {
    discount: string;
    onboarding: string;
    prioritySupport: string;
  };
  howItWorks: string[];
  faq: Array<{ q: string; a: string }>;
}

export interface FAQ {
  general: Array<{ q: string; a: string }>;
  pricing: Array<{ q: string; a: string }>;
  technical: Array<{ q: string; a: string }>;
}

export interface BenefitsMetrics {
  timeSaved: string;
  adminReduction: string;
  migrationTime: string;
  supportResponse: string;
  doubleBookings: string;
  platforms: string;
  languages: number;
}

export interface BlogArticle {
  title: string;
  url: string;
  summary: string;
  keyPoints?: string[];
  templates?: string[];
}

export interface OptionalModule {
  name: string;
  price: string;
  features: string[];
}

export interface AgentDataResponse {
  meta: {
    locale: string;
    timestamp: string;
    version: string;
    cacheHit: boolean;
  };
  identity: {
    name: string;
    role: string;
    company: string;
    target: string;
    tone: string;
    personality: string;
  };
  company: AgentCompanyInfo;
  rules: {
    never: string[];
    always: string[];
  };
  pricing: {
    tiers: AgentPricingTier[];
    trialDays: number;
    annualDiscount: number;
    modules: Record<string, AgentModule>;
    customQuoteThreshold: number;
  };
  integrations: {
    count: number;
    mainPlatforms: string[];
    mainPlatformsCount: number;
  };
  features: Record<string, AgentFeature>;
  partners: Record<string, Record<string, unknown>>;
  ctas: Record<string, AgentCTA>;
  urls: Record<string, string>;
  topics: Record<string, string[]>;
  sizeThresholds: Record<string, { min: number; max: number }>;
  competitors: Record<string, unknown>;
  // Nouvelles données
  referralProgram?: ReferralProgram;
  faq?: FAQ;
  benefitsMetrics?: BenefitsMetrics;
  blogArticles?: Record<string, BlogArticle>;
  optionalModules?: Record<string, OptionalModule>;
  includedFeatures?: string[];
  translations: {
    chatbot: Record<string, unknown>;
    common: Record<string, unknown>;
  };
}

interface UseAgentDataOptions {
  locale?: string;
  enabled?: boolean;
}

interface UseAgentDataReturn {
  data: AgentDataResponse | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  invalidateCache: () => Promise<void>;
}

// Cache côté client
const clientCache: Map<string, { data: AgentDataResponse; timestamp: number }> = new Map();
const CLIENT_CACHE_TTL = 2 * 60 * 1000; // 2 minutes côté client

export function useAgentData(options: UseAgentDataOptions = {}): UseAgentDataReturn {
  const { locale = 'fr', enabled = true } = options;
  
  const [data, setData] = useState<AgentDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    const cacheKey = `agent-data-${locale}`;
    
    // Vérifier le cache client
    const cached = clientCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CLIENT_CACHE_TTL) {
      setData(cached.data);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/agent/data?locale=${locale}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: AgentDataResponse = await response.json();
      
      // Mettre en cache
      clientCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('[useAgentData] Error fetching agent data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [locale, enabled]);

  const refetch = useCallback(async () => {
    // Invalider le cache client avant de refetch
    const cacheKey = `agent-data-${locale}`;
    clientCache.delete(cacheKey);
    await fetchData();
  }, [locale, fetchData]);

  const invalidateCache = useCallback(async () => {
    try {
      // Invalider le cache serveur
      await fetch('/api/agent/data?action=invalidate-cache', {
        method: 'POST',
      });
      
      // Invalider tout le cache client
      clientCache.clear();
      
      // Refetch
      await fetchData();
    } catch (err) {
      console.error('[useAgentData] Error invalidating cache:', err);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidateCache,
  };
}

// Helpers pour extraire des données spécifiques
export function getPricingMessage(data: AgentDataResponse, translations: Record<string, unknown>): string {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else return key;
    }
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (str, [pk, pv]) => str.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv)), 
        value
      );
    }
    return typeof value === 'string' ? value : key;
  };

  const tiers = data.pricing.tiers.filter(tier => tier.pricePerMonth !== null);
  
  const tierMessages = tiers.map(tier => {
    const label = tier.max === Infinity || tier.max >= 200
      ? t('pricing.tierLabelPlus', { min: tier.min })
      : t('pricing.tierLabel', { min: tier.min, max: tier.max });
    return `• ${label} : ${t('pricing.tierPrice', { price: tier.pricePerMonth ?? 0 })}`;
  });

  return `${t('pricing.intro')}\n\n${tierMessages.join('\n')}\n\n${t('pricing.trialInfo', { days: data.pricing.trialDays })}`;
}

export function getFeaturesMessage(data: AgentDataResponse, translations: Record<string, unknown>): string {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else return key;
    }
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (str, [pk, pv]) => str.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv)), 
        value
      );
    }
    return typeof value === 'string' ? value : key;
  };

  return `${t('features.intro')}\n\n✅ ${t('features.pms')}\n✅ ${t('features.channelManager', { count: data.integrations.count })}\n✅ ${t('features.messaging')}\n✅ ${t('features.providers')}\n✅ ${t('features.locks')}\n✅ ${t('features.ai')}\n✅ ${t('features.reporting')}\n✅ ${t('features.multiLanguage')}\n\n${t('features.outro')}`;
}

export function getIntegrationsMessage(data: AgentDataResponse, translations: Record<string, unknown>): string {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else return key;
    }
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (str, [pk, pv]) => str.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv)), 
        value
      );
    }
    return typeof value === 'string' ? value : key;
  };

  const othersCount = data.integrations.count - data.integrations.mainPlatformsCount;
  
  return `${t('integrations.intro', { count: data.integrations.count })}\n\n${t('integrations.directApi')}\n• ${data.integrations.mainPlatforms.join('\n• ')}\n• ${t('integrations.othersViaIcal', { count: othersCount })}\n\n${t('integrations.syncInfo')}`;
}

export function getUserSizeFromCount(count: number, thresholds: Record<string, { min: number; max: number }>): string {
  for (const [size, range] of Object.entries(thresholds)) {
    if (count >= range.min && count <= range.max) {
      return size;
    }
  }
  return 'unknown';
}

export default useAgentData;
