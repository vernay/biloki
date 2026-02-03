/**
 * API Route: /api/agent/data
 * 
 * Expose les données de configuration de l'agent IA de manière dynamique.
 * Cette API est la source unique de vérité pour le ChatBot.
 * 
 * Paramètres:
 * - locale: fr | en | es | pt (optionnel, défaut: fr)
 * 
 * Avantages:
 * - Pas de hardcode côté client
 * - Données toujours à jour
 * - Cache automatique Next.js
 * - Réutilisable par d'autres services (n8n, webhooks, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';

// Import des configurations centralisées
import { 
  PRICING_TIERS, 
  FREE_TRIAL_DAYS, 
  ANNUAL_DISCOUNT,
  MODULES,
  CUSTOM_PRICING_THRESHOLD 
} from '@/lib/pricing-config';

import { 
  MAIN_PLATFORMS, 
  INTEGRATIONS_COUNT,
  MAIN_PLATFORMS_COUNT 
} from '@/lib/integrations-config';

import {
  AGENT_IDENTITY,
  AGENT_RULES,
  PRODUCT_KNOWLEDGE,
  PARTNERS_KNOWLEDGE,
  DYNAMIC_CTAS,
  TOPICS,
  IMPORTANT_URLS,
  COMPETITORS_COMPARISON,
  USER_SIZE_THRESHOLDS,
  COMPANY_INFO,
  REFERRAL_PROGRAM,
  FAQ,
  BENEFITS_METRICS,
  BLOG_ARTICLES,
  OPTIONAL_MODULES,
  INCLUDED_FEATURES,
} from '@/lib/ai-agent-config';

// Import des traductions pour enrichir les réponses
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import ptMessages from '@/messages/pt.json';

// Types
type SupportedLocale = 'fr' | 'en' | 'es' | 'pt';

// Type générique pour les messages (permet des différences entre langues)
type MessagesType = Record<string, unknown>;

const messagesMap: Record<SupportedLocale, MessagesType> = {
  fr: frMessages as MessagesType,
  en: enMessages as MessagesType,
  es: esMessages as MessagesType,
  pt: ptMessages as MessagesType,
};

// Cache simple en mémoire (5 minutes)
interface CacheEntry {
  data: AgentDataResponse;
  timestamp: number;
}

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface AgentDataResponse {
  meta: {
    locale: SupportedLocale;
    timestamp: string;
    version: string;
    cacheHit: boolean;
  };
  identity: typeof AGENT_IDENTITY;
  company: typeof COMPANY_INFO;
  rules: typeof AGENT_RULES;
  pricing: {
    tiers: typeof PRICING_TIERS;
    trialDays: number;
    annualDiscount: number;
    modules: typeof MODULES;
    customQuoteThreshold: number;
  };
  integrations: {
    count: number;
    mainPlatforms: string[];
    mainPlatformsCount: number;
  };
  features: typeof PRODUCT_KNOWLEDGE.features;
  partners: typeof PARTNERS_KNOWLEDGE;
  ctas: typeof DYNAMIC_CTAS;
  urls: typeof IMPORTANT_URLS;
  topics: typeof TOPICS;
  sizeThresholds: typeof USER_SIZE_THRESHOLDS;
  competitors: typeof COMPETITORS_COMPARISON;
  // Nouvelles données
  referralProgram: typeof REFERRAL_PROGRAM;
  faq: typeof FAQ;
  benefitsMetrics: typeof BENEFITS_METRICS;
  blogArticles: typeof BLOG_ARTICLES;
  optionalModules: typeof OPTIONAL_MODULES;
  includedFeatures: typeof INCLUDED_FEATURES;
  translations: {
    chatbot: unknown;
    common: unknown;
  };
}

function buildAgentData(locale: SupportedLocale, cacheHit: boolean): AgentDataResponse {
  const messages = messagesMap[locale] || messagesMap['fr'];
  
  return {
    meta: {
      locale,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      cacheHit,
    },
    identity: AGENT_IDENTITY,
    company: COMPANY_INFO,
    rules: AGENT_RULES,
    pricing: {
      tiers: PRICING_TIERS,
      trialDays: FREE_TRIAL_DAYS,
      annualDiscount: ANNUAL_DISCOUNT,
      modules: MODULES,
      customQuoteThreshold: CUSTOM_PRICING_THRESHOLD,
    },
    integrations: {
      count: INTEGRATIONS_COUNT,
      mainPlatforms: MAIN_PLATFORMS,
      mainPlatformsCount: MAIN_PLATFORMS_COUNT,
    },
    features: PRODUCT_KNOWLEDGE.features,
    partners: PARTNERS_KNOWLEDGE,
    ctas: DYNAMIC_CTAS,
    urls: IMPORTANT_URLS,
    topics: TOPICS,
    sizeThresholds: USER_SIZE_THRESHOLDS,
    competitors: COMPETITORS_COMPARISON,
    // Nouvelles données
    referralProgram: REFERRAL_PROGRAM,
    faq: FAQ,
    benefitsMetrics: BENEFITS_METRICS,
    blogArticles: BLOG_ARTICLES,
    optionalModules: OPTIONAL_MODULES,
    includedFeatures: INCLUDED_FEATURES,
    translations: {
      chatbot: messages.chatbot,
      common: messages.common,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer la locale depuis les paramètres
    const { searchParams } = new URL(request.url);
    const localeParam = searchParams.get('locale') || 'fr';
    
    // Valider la locale
    const validLocales: SupportedLocale[] = ['fr', 'en', 'es', 'pt'];
    const locale: SupportedLocale = validLocales.includes(localeParam as SupportedLocale) 
      ? (localeParam as SupportedLocale) 
      : 'fr';

    // Vérifier le cache
    const cacheKey = `agent-data-${locale}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      // Retourner depuis le cache
      const cachedData = { ...cached.data };
      cachedData.meta.cacheHit = true;
      cachedData.meta.timestamp = new Date().toISOString();
      
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache': 'HIT',
        },
      });
    }

    // Construire les données
    const data = buildAgentData(locale, false);

    // Mettre en cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache': 'MISS',
      },
    });

  } catch (error) {
    console.error('[API Agent Data] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Endpoint pour invalider le cache (utile après mise à jour des configs)
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'invalidate-cache') {
      cache.clear();
      return NextResponse.json({ 
        success: true, 
        message: 'Cache invalidated',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('[API Agent Data] POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
