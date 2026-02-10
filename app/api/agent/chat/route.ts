import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

import {
  AGENT_IDENTITY,
  COMPANY_INFO,
  PRODUCT_KNOWLEDGE,
  INCLUDED_FEATURES,
  FAQ,
  AGENT_RULES,
  IMPORTANT_URLS,
  TOPICS,
} from '@/lib/ai-agent-config';
import {
  PRICING_TIERS,
  FREE_TRIAL_DAYS,
  ANNUAL_DISCOUNT,
  MODULES,
  CUSTOM_PRICING_THRESHOLD,
  calculatePrice,
} from '@/lib/pricing-config';
import { INTEGRATIONS_COUNT, MAIN_PLATFORMS } from '@/lib/integrations-config';
import { getKnowledgeIndex, searchKnowledge } from '@/lib/agent/knowledge';
import { recordChatSession } from '@/lib/agent/lead-store';

const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt'] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type LeadData = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  propertyCount?: number;
  city?: string;
  currentTools?: string[];
  painPoints?: string[];
  consent?: boolean;
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function addLocaleToUrl(url: string, locale: SupportedLocale): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith('/') ? url : `/${url}`;
  return `/${locale}${normalized}`;
}

function detectTopic(message: string): keyof typeof TOPICS | null {
  const normalized = normalizeText(message);
  const entries = Object.entries(TOPICS) as Array<[keyof typeof TOPICS, string[]]>;
  for (const [topic, keywords] of entries) {
    if (keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return topic;
    }
  }
  return null;
}

function getCtaLabels(locale: SupportedLocale) {
  const labels = {
    fr: {
      pricing: 'Voir les tarifs',
      demo: 'Réserver une démo',
      contact: 'Nous contacter',
      features: 'Voir les fonctionnalités',
      blog: 'Voir le blog',
      api: 'Voir les intégrations',
      faq: 'Voir la FAQ',
      signup: 'Créer un compte',
    },
    en: {
      pricing: 'See pricing',
      demo: 'Book a demo',
      contact: 'Contact us',
      features: 'See features',
      blog: 'Read the blog',
      api: 'See integrations',
      faq: 'View FAQ',
      signup: 'Start free trial',
    },
    es: {
      pricing: 'Ver precios',
      demo: 'Reservar una demo',
      contact: 'Contactarnos',
      features: 'Ver funcionalidades',
      blog: 'Ver el blog',
      api: 'Ver integraciones',
      faq: 'Ver FAQ',
      signup: 'Crear una cuenta',
    },
    pt: {
      pricing: 'Ver preços',
      demo: 'Agendar demo',
      contact: 'Fale conosco',
      features: 'Ver funcionalidades',
      blog: 'Ver o blog',
      api: 'Ver integrações',
      faq: 'Ver FAQ',
      signup: 'Criar conta',
    },
  };

  return labels[locale];
}

function buildCtas(message: string, locale: SupportedLocale) {
  const labels = getCtaLabels(locale);
  const topic = detectTopic(message);

  if (topic === 'pricing') {
    return [
      { label: labels.pricing, url: addLocaleToUrl(IMPORTANT_URLS.pricing, locale), type: 'primary' },
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'secondary' },
    ];
  }

  if (topic === 'demo') {
    return [
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'primary' },
      { label: labels.pricing, url: addLocaleToUrl(IMPORTANT_URLS.pricing, locale), type: 'secondary' },
    ];
  }

  if (topic === 'contact' || topic === 'support') {
    return [
      { label: labels.contact, url: addLocaleToUrl(IMPORTANT_URLS.contact, locale), type: 'primary' },
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'secondary' },
    ];
  }

  if (topic === 'features' || topic === 'ai' || topic === 'messaging' || topic === 'smartLocks' || topic === 'channelManager') {
    return [
      { label: labels.features, url: addLocaleToUrl(IMPORTANT_URLS.features, locale), type: 'primary' },
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'secondary' },
    ];
  }

  if (topic === 'integration') {
    return [
      { label: labels.api, url: addLocaleToUrl(IMPORTANT_URLS.api, locale), type: 'primary' },
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'secondary' },
    ];
  }

  if (topic === 'faq') {
    return [
      { label: labels.faq, url: addLocaleToUrl(IMPORTANT_URLS.faq, locale), type: 'primary' },
      { label: labels.contact, url: addLocaleToUrl(IMPORTANT_URLS.contact, locale), type: 'secondary' },
    ];
  }

  if (topic === 'blog') {
    return [
      { label: labels.blog, url: addLocaleToUrl(IMPORTANT_URLS.blog, locale), type: 'primary' },
      { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'secondary' },
    ];
  }

  return [
    { label: labels.demo, url: addLocaleToUrl(IMPORTANT_URLS.demo, locale), type: 'primary' },
    { label: labels.pricing, url: addLocaleToUrl(IMPORTANT_URLS.pricing, locale), type: 'secondary' },
  ];
}

function detectLocale(locale?: string): SupportedLocale {
  if (!locale) return 'fr';
  return (SUPPORTED_LOCALES.includes(locale as SupportedLocale) ? locale : 'fr') as SupportedLocale;
}

function extractPropertyCount(message: string): number | null {
  const match = message.match(/\b(\d{1,4})\b/);
  if (!match) return null;
  const count = Number.parseInt(match[1], 10);
  return Number.isNaN(count) ? null : count;
}

function isPricingIntent(message: string): boolean {
  const normalized = normalizeText(message);
  const pricingKeywords = TOPICS?.pricing || [];
  return pricingKeywords.some((kw) => normalized.includes(normalizeText(kw))) || /€|euros?|prix|tarif/.test(normalized);
}

function buildPricingContext(propertyCount: number) {
  if (propertyCount >= CUSTOM_PRICING_THRESHOLD) {
    return {
      propertyCount,
      customQuote: true,
      message: `Au-delà de ${CUSTOM_PRICING_THRESHOLD} logements, les tarifs sont sur devis.`,
    };
  }

  const monthly = calculatePrice(propertyCount, 'monthly');
  const annual = calculatePrice(propertyCount, 'annual');

  if (!monthly || !annual) {
    return {
      propertyCount,
      customQuote: true,
      message: `Au-delà de ${CUSTOM_PRICING_THRESHOLD} logements, les tarifs sont sur devis.`,
    };
  }

  return {
    propertyCount,
    customQuote: false,
    monthly: {
      pricePerUnit: Number(monthly.pricePerMonth.toFixed(2)),
      total: Number(monthly.totalMonth.toFixed(2)),
    },
    annual: {
      pricePerUnit: Number(annual.pricePerMonth.toFixed(2)),
      total: Number(annual.totalMonth.toFixed(2)),
    },
    trialDays: FREE_TRIAL_DAYS,
    annualDiscount: ANNUAL_DISCOUNT,
    note: 'Tarifs HT',
  };
}

function buildKnowledge() {
  return {
    identity: AGENT_IDENTITY,
    company: COMPANY_INFO,
    rules: AGENT_RULES,
    pricing: {
      model: 'par logement par mois',
      tiers: PRICING_TIERS,
      annualDiscount: ANNUAL_DISCOUNT,
      trialDays: FREE_TRIAL_DAYS,
      modules: MODULES,
      customQuoteThreshold: CUSTOM_PRICING_THRESHOLD,
      note: 'Tarifs HT',
    },
    integrations: {
      count: INTEGRATIONS_COUNT,
      mainPlatforms: MAIN_PLATFORMS,
    },
    product: PRODUCT_KNOWLEDGE,
    includedFeatures: INCLUDED_FEATURES,
    faq: FAQ,
    urls: IMPORTANT_URLS,
  };
}

function buildSystemPrompt(locale: SupportedLocale) {
  const languageMap: Record<SupportedLocale, string> = {
    fr: 'français',
    en: 'anglais',
    es: 'espagnol',
    pt: 'portugais',
  };

  return `Tu es le conseiller commercial officiel de Biloki.
- Réponds en ${languageMap[locale]}.
- Ne mentionne pas que tu es une IA.
- Utilise UNIQUEMENT les informations fournies dans "Knowledge", "PricingContext" et "retrieved".
- Les passages "retrieved" proviennent du site Biloki (source incluse). Si l'info n'est pas là, dis "Je ne sais pas encore".
- Si l'information n'existe pas, dis "Je ne sais pas encore" et propose une démo ou un contact.
- Ne promets pas de fonctionnalités non listées.
- Réponse ultra courte (1 à 2 phrases maximum), orientée action.
- Qualifie le lead : si une info clé manque, pose UNE seule question à la fois.
- Si c'est pertinent et bref, propose de laisser un email et demander l'accord pour un suivi.
- Si une réponse de prix est possible, donne le calcul et précise que les tarifs sont HT.
- Termine par un CTA pertinent si possible.
- Ne mentionne aucun lien ou URL dans le texte (les boutons gèrent la navigation).`;
}

function buildUserPrompt(params: {
  message: string;
  history: ChatMessage[];
  lead?: LeadData;
  locale: SupportedLocale;
  pricingContext?: ReturnType<typeof buildPricingContext> | null;
  retrieved?: Array<{ text: string; source: string }>;
}) {
  const { message, history, lead, pricingContext, locale, retrieved } = params;
  const knowledge = buildKnowledge();

  return JSON.stringify({
    locale,
    message,
    history,
    lead: lead || {},
    pricingContext: pricingContext || null,
    retrieved: retrieved || [],
    knowledge,
    outputFormat: {
      reply: 'string',
      lead: {
        name: 'string?',
        email: 'string?',
        consent: 'boolean?',
        phone: 'string?',
        company: 'string?',
        role: 'string?',
        propertyCount: 'number?',
        city: 'string?',
        currentTools: 'string[]?',
        painPoints: 'string[]?'
      },
      actions: [{ label: 'string', url: 'string', type: 'primary|secondary' }]
    }
  });
}

function stripUrls(text: string): string {
  return text
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\bwww\.[^\s]+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function limitSentences(text: string, maxSentences = 2): string {
  const parts = text
    .split(/(?<=[.!?])\s+|\n+/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.slice(0, maxSentences).join(' ').trim();
}

async function getApiKey(): Promise<string | null> {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;

  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const raw = await fs.readFile(envPath, 'utf-8');
    const line = raw
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l.startsWith('OPENAI_API_KEY='));
    if (!line) return null;
    const value = line.split('=')[1]?.trim();
    if (!value) return null;
    return value.replace(/^['"]|['"]$/g, '');
  } catch {
    return null;
  }
}

function formatErrorDetails(error: unknown): string {
  if (error && typeof error === 'object') {
    const maybeError = error as { message?: string; status?: number; name?: string; code?: string };
    const parts = [
      maybeError.name ? `name=${maybeError.name}` : null,
      maybeError.code ? `code=${maybeError.code}` : null,
      typeof maybeError.status === 'number' ? `status=${maybeError.status}` : null,
      maybeError.message ? `message=${maybeError.message}` : null,
    ].filter(Boolean);
    if (parts.length > 0) return parts.join(' | ');
  }
  if (typeof error === 'string') return error;
  return 'Erreur interne du serveur';
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = await getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OPENAI_API_KEY manquante',
          details: 'Vérifiez .env.local puis redémarrez le serveur Next.js.',
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const isDev = process.env.NODE_ENV !== 'production';

    const body = await request.json();
    const message: string | undefined = body?.message;
    const sessionId: string | undefined = typeof body?.sessionId === 'string' ? body.sessionId : undefined;
    const locale = detectLocale(body?.locale);
    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history.filter((m: ChatMessage) => m?.role && m?.content).slice(-8)
      : [];
    const lead: LeadData | undefined = body?.lead;

    if (!message) {
      return NextResponse.json({ error: 'Message manquant' }, { status: 400 });
    }

    const propertyCount = extractPropertyCount(message);
    const pricingContext = propertyCount && isPricingIntent(message)
      ? buildPricingContext(propertyCount)
      : null;

    let retrieved: Array<{ text: string; source: string }> = [];
    try {
      const knowledgeIndex = await getKnowledgeIndex(openai);
      const retrievedChunks = await searchKnowledge(openai, knowledgeIndex, message, 6);
      retrieved = retrievedChunks.map((chunk) => ({
        text: chunk.text,
        source: chunk.source,
      }));
    } catch (ragError) {
      console.error('Erreur RAG (index/search):', ragError);
      retrieved = [];
    }

    const systemPrompt = buildSystemPrompt(locale);
    const userPrompt = buildUserPrompt({
      message,
      history,
      lead,
      locale,
      pricingContext,
      retrieved,
    });

    let response;
    try {
      response = await openai.responses.create({
        model: 'gpt-4o-mini',
        input: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_output_tokens: 200,
      });
    } catch (openaiError) {
      const details = formatErrorDetails(openaiError);
      return NextResponse.json(
        { error: 'Erreur OpenAI', details },
        { status: 500 }
      );
    }

    const outputText = response.output_text || '{}';
    let parsed: { reply?: string; lead?: LeadData; actions?: Array<{ label: string; url: string; type?: 'primary' | 'secondary' }> } = {};

    try {
      parsed = JSON.parse(outputText);
    } catch {
      parsed = { reply: outputText };
    }

    const baseActions = Array.isArray(parsed.actions) ? parsed.actions : [];
    const normalizedActions = baseActions
      .filter((action) => action && typeof action.label === 'string' && typeof action.url === 'string')
      .map((action) => ({
        ...action,
        url: addLocaleToUrl(action.url, locale),
      }));

    const fallbackActions = buildCtas(message, locale);
    const actions = normalizedActions.length > 0 ? normalizedActions : fallbackActions;

    const safeReply = parsed.reply ? limitSentences(stripUrls(parsed.reply), 2) : '';

    const responsePayload = {
      reply: safeReply || 'Je ne sais pas encore. Souhaitez-vous une démo ?',
      lead: parsed.lead || {},
      actions,
    };

    if (sessionId) {
      try {
        await recordChatSession({
          sessionId,
          locale,
          userMessage: message,
          assistantMessage: responsePayload.reply,
          lead: parsed.lead || {},
        });
      } catch (logError) {
        console.error('Erreur log chat:', logError);
      }
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Erreur API agent chat:', error);
    const message = formatErrorDetails(error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: message },
      { status: 500 }
    );
  }
}
