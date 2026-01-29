'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import useAgentData, { 
  getPricingMessage, 
  getFeaturesMessage, 
  getIntegrationsMessage,
  getUserSizeFromCount,
  type AgentDataResponse 
} from '@/lib/hooks/useAgentData';
import { WEBAPP_REGISTER_URL } from '@/lib/config';

// Types
type UserProfileType = 'owner' | 'concierge' | 'manager' | 'unknown';
type UserSize = 'small' | 'medium' | 'large' | 'enterprise' | 'unknown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: Array<{ label: string; url: string; type?: 'primary' | 'secondary' }>;
}

interface UserProfile {
  type: UserProfileType;
  size: UserSize;
  propertyCount?: number;
  currentTools?: string[];
  mainProblem?: string;
  interests?: string[];
}

type ConversationStep = 'greeting' | 'qualification' | 'discovery' | 'product' | 'partners' | 'conversion' | 'support';

// Mots-clés pour détecter la langue
const languageKeywords: Record<string, string[]> = {
  en: ['hello', 'hi', 'hey', 'how', 'what', 'where', 'when', 'why', 'can', 'please', 'thank', 'yes', 'no', 'price', 'features', 'demo', 'help', 'owner', 'manager', 'property', 'the', 'and', 'is', 'are', 'have', 'want', 'need', 'my', 'i am', 'i\'m', 'would'],
  es: ['hola', 'buenos', 'qué', 'cómo', 'dónde', 'cuándo', 'puede', 'gracias', 'sí', 'precio', 'funcionalidades', 'demo', 'ayuda', 'propietario', 'gestor', 'propiedad', 'el', 'la', 'los', 'y', 'o', 'es', 'son', 'tengo', 'quiero', 'mi', 'soy'],
  pt: ['olá', 'oi', 'bom', 'como', 'onde', 'quando', 'pode', 'obrigado', 'sim', 'não', 'preço', 'funcionalidades', 'demo', 'ajuda', 'proprietário', 'gestor', 'propriedade', 'o', 'a', 'os', 'e', 'ou', 'é', 'são', 'tenho', 'quero', 'meu', 'sou'],
  fr: ['bonjour', 'salut', 'comment', 'quoi', 'où', 'quand', 'pourquoi', 'pouvez', 'merci', 'oui', 'non', 'prix', 'tarif', 'fonctionnalités', 'démo', 'aide', 'propriétaire', 'gestionnaire', 'conciergerie', 'logement', 'le', 'la', 'les', 'et', 'ou', 'est', 'sont', 'ai', 'veux', 'mon', 'je suis'],
};

export default function ChatBot() {
  const urlLocale = useLocale();
  
  // Récupérer les données de l'agent via l'API (pour la langue du site par défaut)
  const { data: agentData, isLoading: isAgentDataLoading } = useAgentData({ locale: urlLocale });
  
  // États
  const [detectedLang, setDetectedLang] = useState<string>(urlLocale);
  const [agentDataForLang, setAgentDataForLang] = useState<AgentDataResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    type: 'unknown',
    size: 'unknown',
  });
  const [conversationStep, setConversationStep] = useState<ConversationStep>('greeting');
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);

  // Initialiser le son de notification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationSoundRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      notificationSoundRef.current.volume = 0.3;
    }
  }, []);

  // Fermer le chatbot quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Ne pas fermer si on clique sur le bouton du chatbot ou dans la fenêtre du chatbot
      if (
        chatWindowRef.current && 
        !chatWindowRef.current.contains(target) &&
        chatButtonRef.current && 
        !chatButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Charger les données pour la langue détectée
  useEffect(() => {
    const fetchAgentDataForLang = async () => {
      try {
        const response = await fetch(`/api/agent/data?locale=${detectedLang}`);
        const data = await response.json();
        setAgentDataForLang(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données pour la langue:', error);
        // Fallback sur les données par défaut
        setAgentDataForLang(agentData);
      }
    };

    if (detectedLang && detectedLang !== urlLocale) {
      fetchAgentDataForLang();
    } else {
      // Utiliser les données du site si c'est la même langue
      setAgentDataForLang(agentData);
    }
  }, [detectedLang, urlLocale, agentData]);

  // Utiliser les données pour la langue détectée, sinon fallback sur les données du site
  const currentAgentData = agentDataForLang || agentData;

  // Quick replies suggestions
  const quickReplies = [
    { label: '💰 Tarifs', message: 'Quels sont vos tarifs ?' },
    { label: '📋 Fonctionnalités', message: 'Quelles sont les fonctionnalités ?' },
    { label: '📅 Démo', message: 'Je voudrais réserver une démo' },
    { label: '❓ Aide', message: 'J\'ai besoin d\'aide' },
  ];

  // Format time for messages
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString(detectedLang, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Clear conversation
  const clearConversation = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatbot-messages');
      localStorage.removeItem('chatbot-profile');
      localStorage.removeItem('chatbot-step');
    }
    setMessages([createInitialMessage()]);
    setUserProfile({ type: 'unknown', size: 'unknown' });
    setConversationStep('greeting');
    setShowQuickReplies(true);
  };

  // ============================================================================
  // HELPERS DE TRADUCTION (utilise les données de l'API)
  // ============================================================================

  const getT = useCallback((key: string, params?: Record<string, string | number>): string => {
    if (!currentAgentData?.translations?.chatbot) return key;
    
    const keys = key.split('.');
    let value: unknown = currentAgentData.translations.chatbot;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue)),
        value
      );
    }
    
    return typeof value === 'string' ? value : key;
  }, [currentAgentData]);

  const getTRaw = useCallback((key: string): unknown => {
    if (!currentAgentData?.translations?.chatbot) return undefined;
    
    const keys = key.split('.');
    let value: unknown = currentAgentData.translations.chatbot;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return undefined;
      }
    }
    
    return value;
  }, [currentAgentData]);

  // ============================================================================
  // DÉTECTION DE LANGUE
  // ============================================================================

  const detectLanguage = useCallback((message: string): string => {
    const lowerMessage = message.toLowerCase();
    const scores: Record<string, number> = { fr: 0, en: 0, es: 0, pt: 0 };
    
    // Utiliser des regex avec des limites de mots pour une meilleure précision
    for (const [lang, keywords] of Object.entries(languageKeywords)) {
      for (const keyword of keywords) {
        // Créer une regex avec des limites de mots (\b)
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(lowerMessage)) {
          scores[lang]++;
        }
      }
    }
    
    const maxScore = Math.max(...Object.values(scores));
    
    // Si aucun score, utiliser la locale de l'URL comme fallback
    if (maxScore === 0) return urlLocale;
    
    return Object.entries(scores).find(([, score]) => score === maxScore)?.[0] || urlLocale;
  }, [urlLocale]);

  // ============================================================================
  // DÉTECTION DE TOPICS INTELLIGENTE (scoring par pertinence)
  // ============================================================================

  const detectTopics = useCallback((message: string): string[] => {
    if (!currentAgentData?.topics) return [];
    
    const lowerMessage = message.toLowerCase();
    const normalizedMessage = lowerMessage
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
      .replace(/[^a-z0-9\s]/g, ' '); // Garder que lettres et chiffres
    
    // Score pour chaque topic détecté
    const topicScores: { topic: string; score: number; matchedKeywords: string[] }[] = [];
    
    for (const [topic, keywords] of Object.entries(currentAgentData.topics)) {
      let score = 0;
      const matchedKeywords: string[] = [];
      
      for (const kw of keywords) {
        const normalizedKw = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Match exact (mot complet) = score plus élevé
        const wordBoundaryRegex = new RegExp(`\\b${normalizedKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (wordBoundaryRegex.test(normalizedMessage) || wordBoundaryRegex.test(lowerMessage)) {
          // Bonus pour les mots-clés plus longs (plus spécifiques)
          score += 10 + (normalizedKw.length > 5 ? 5 : 0);
          matchedKeywords.push(kw);
        } 
        // Match partiel = score plus bas
        else if (lowerMessage.includes(kw.toLowerCase())) {
          score += 3;
          matchedKeywords.push(kw);
        }
      }
      
      if (score > 0) {
        topicScores.push({ topic, score, matchedKeywords });
      }
    }
    
    // Trier par score décroissant et retourner les topics
    return topicScores
      .sort((a, b) => b.score - a.score)
      .map(t => t.topic);
  }, [currentAgentData]);

  // ============================================================================
  // HELPERS POUR LES MESSAGES DYNAMIQUES (utilise les données de l'API)
  // ============================================================================
  const getPricingText = useCallback((): string => {
    if (!currentAgentData) return '';
    return getPricingMessage(currentAgentData, currentAgentData.translations.chatbot as Record<string, unknown>);
  }, [currentAgentData]);

  const getFeaturesText = useCallback((): string => {
    if (!currentAgentData) return '';
    return getFeaturesMessage(currentAgentData, currentAgentData.translations.chatbot as Record<string, unknown>);
  }, [currentAgentData]);

  const getIntegrationsText = useCallback((): string => {
    if (!currentAgentData) return '';
    return getIntegrationsMessage(currentAgentData, currentAgentData.translations.chatbot as Record<string, unknown>);
  }, [currentAgentData]);

  // ============================================================================
  // CTA DYNAMIQUES SELON LE PROFIL (utilise les données de l'API)
  // ============================================================================

  const getDynamicCTA = useCallback((lang: string): { primary: { label: string; url: string }; secondary: { label: string; url: string } } => {
    if (!currentAgentData?.ctas) {
      return {
        primary: { label: 'Réserver une démo', url: `/${lang}/reserver-demo` },
        secondary: { label: 'Essai gratuit', url: `${WEBAPP_REGISTER_URL}?lang=${lang}` },
      };
    }
    
    const size = userProfile.size || 'unknown';
    const ctas = currentAgentData?.ctas[size] || currentAgentData?.ctas['unknown'];
    
    const t = (key: string): string => {
      if (!currentAgentData?.translations?.chatbot) return key;
      const keys = key.split('.');
      let value: unknown = currentAgentData.translations.chatbot;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else return key;
      }
      return typeof value === 'string' ? value : key;
    };
    
    return {
      primary: {
        label: t(`actions.${ctas.primary.label}`),
        url: `/${lang}${ctas.primary.url}`,
      },
      secondary: {
        label: t(`actions.${ctas.secondary.label}`),
        url: `/${lang}${ctas.secondary.url}`,
      },
    };
  }, [userProfile.size, currentAgentData]);

  // ============================================================================
  // MESSAGE INITIAL (utilise les données de l'API)
  // ============================================================================

  const createInitialMessage = useCallback((): Message => {
    if (!currentAgentData?.translations?.chatbot) {
      return {
        id: '1',
        text: 'Bonjour ! Comment puis-je vous aider ?',
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    const chatbot = currentAgentData?.translations.chatbot as Record<string, unknown>;
    const greeting = chatbot?.initialGreeting;
    
    return {
      id: '1',
      text: typeof greeting === 'string' ? greeting : 'Bonjour ! Comment puis-je vous aider ?',
      sender: 'bot',
      timestamp: new Date()
    };
  }, [currentAgentData]);

  // ============================================================================
  // GÉNÉRATION DE RÉPONSE (ARCHITECTURE MULTI-RÔLES)
  // ============================================================================

  const generateBotResponse = useCallback((userMessage: string, lang: string, agentData?: AgentDataResponse | null): { 
    text: string; 
    actions?: Array<{ label: string; url: string; type?: 'primary' | 'secondary' }> 
  } => {
    // Utiliser les données passées en paramètre, sinon fallback sur currentAgentData
    const data = agentData || currentAgentData;
    
    const lowerMessage = userMessage.toLowerCase();
    // Topics triés par pertinence (le premier est le plus probable)
    const topics = detectTopics(userMessage);
    const primaryTopic = topics[0]; // Le topic le plus pertinent
    
    // Helper de traduction local (utilise les données de l'API)
    const t = (key: string, params?: Record<string, string | number>): string => {
      if (!data?.translations?.chatbot) return key;
      const keys = key.split('.');
      let value: unknown = data.translations.chatbot;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else return key;
      }
      if (typeof value === 'string' && params) {
        return Object.entries(params).reduce(
          (str, [pk, pv]) => str.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv)), value
        );
      }
      return typeof value === 'string' ? value : key;
    };
    
    const tRaw = (key: string): unknown => {
      if (!data?.translations?.chatbot) return undefined;
      const keys = key.split('.');
      let value: unknown = data.translations.chatbot;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else return undefined;
      }
      return value;
    };
    
    const trialDays = data?.pricing?.trialDays || 30;
    const trialCta = t('trialCta', { days: trialDays });
    const trialCtaRocket = t('trialCtaRocket', { days: trialDays });

    // =========================================================================
    // RÔLE 1: ACCUEIL / QUALIFICATION
    // =========================================================================
    
    if (conversationStep === 'greeting' || conversationStep === 'qualification') {
      // Détecter le type d'utilisateur
      const ownerKeywords = tRaw('profileDetection.keywords.owner') as string[] | undefined;
      const conciergeKeywords = tRaw('profileDetection.keywords.concierge') as string[] | undefined;
      const managerKeywords = tRaw('profileDetection.keywords.manager') as string[] | undefined;
      
      let detectedType: UserProfileType | null = null;
      if (ownerKeywords?.some(kw => lowerMessage.includes(kw.toLowerCase()))) detectedType = 'owner';
      else if (conciergeKeywords?.some(kw => lowerMessage.includes(kw.toLowerCase()))) detectedType = 'concierge';
      else if (managerKeywords?.some(kw => lowerMessage.includes(kw.toLowerCase()))) detectedType = 'manager';
      
      if (detectedType) {
        setUserProfile(prev => ({ ...prev, type: detectedType! }));
        setConversationStep('discovery');
        return { 
          text: t(`profileDetection.responses.${detectedType}`, { integrations: data?.integrations?.count || 120 })
        };
      }
      
      // Si un topic est détecté, on passe directement au sujet
      if (topics.length > 0) {
        setConversationStep('product');
        // Continue avec le traitement des topics ci-dessous
      } else {
        // Réponse par défaut pour qualification
        return { text: t('initialGreeting') };
      }
    }

    // =========================================================================
    // RÔLE 2: DISCOVERY (nombre de logements)
    // =========================================================================
    
    if (conversationStep === 'discovery') {
      const numberMatch = lowerMessage.match(/\d+/);
      if (numberMatch) {
        const count = parseInt(numberMatch[0]);
        const size = data?.sizeThresholds 
          ? getUserSizeFromCount(count, data.sizeThresholds) as UserSize
          : 'unknown';
        
        setUserProfile(prev => ({ ...prev, propertyCount: count, size }));
        setConversationStep('product');
        
        let responseText = '';
        if (count >= 5) {
          responseText = t('logementResponses.manyProperties', { count });
        } else if (count >= 2) {
          responseText = t('logementResponses.someProperties', { count, plural: 's' });
        } else {
          responseText = t('logementResponses.fewProperties', { count });
        }
        
        responseText += t('logementResponses.askForDemo');
        
        // CTA dynamiques selon la taille
        const dynamicCtas = getDynamicCTA(lang);
        
        return {
          text: responseText,
          actions: [
            { label: dynamicCtas.primary.label, url: dynamicCtas.primary.url, type: 'primary' },
            { label: dynamicCtas.secondary.label, url: dynamicCtas.secondary.url, type: 'secondary' }
          ]
        };
      }
      
      // Si un topic est détecté pendant discovery, on répond au topic
      if (topics.length > 0) {
        setConversationStep('product');
        // Continue avec le traitement des topics ci-dessous
      } else {
        return { text: t('logementResponses.askNumber') };
      }
    }

    // =========================================================================
    // RÔLE 3: EXPERT PRODUIT - Réponses basées sur le topic principal
    // =========================================================================
    
    // Fonction helper pour générer une réponse avec CTA
    const createResponse = (
      text: string, 
      actions?: Array<{ label: string; url: string; type?: 'primary' | 'secondary' }>
    ) => {
      return { text, actions: actions || [] };
    };

    // Traiter le topic principal (le plus pertinent)
    switch (primaryTopic) {
      case 'whatIsBiloki': {
        const whatIsBilokiText = `${t('whatIsBiloki.title')}\n\n` +
          `${t('whatIsBiloki.intro')}\n\n` +
          `${t('whatIsBiloki.description')}\n\n` +
          `${t('whatIsBiloki.benefit1')}\n` +
          `${t('whatIsBiloki.benefit2')}\n` +
          `${t('whatIsBiloki.benefit3')}\n` +
          `${t('whatIsBiloki.benefit4')}\n` +
          `${t('whatIsBiloki.benefit5')}\n` +
          `${t('whatIsBiloki.benefit6')}\n\n` +
          `${t('whatIsBiloki.callToAction')}`;
        
        return createResponse(whatIsBilokiText, [
          { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }
      
      case 'pricing': {
        setConversationStep('conversion');
        return createResponse(getPricingText(), [
          { label: t('actions.seeDetailedPricing'), url: `/${lang}/tarifs`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }

      case 'features': {
        return createResponse(getFeaturesText(), [
          { label: t('actions.discoverFeatures'), url: `/${lang}/fonctionnalites/vue-ensemble`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }

      case 'channelManager': {
        return createResponse(getIntegrationsText(), [
          { label: 'Channel Manager', url: `/${lang}/fonctionnalites/channel-manager`, type: 'primary' },
          { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'secondary' }
        ]);
      }

      case 'pms': {
        const pmsInfo = data?.features?.pms;
        if (pmsInfo) {
          return createResponse(
            `${pmsInfo.description}\n\n✅ ${pmsInfo.benefits.join('\n✅ ')}`,
            [
              { label: 'PMS', url: `/${lang}${pmsInfo.url}`, type: 'primary' },
              { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
            ]
          );
        }
        break;
      }

      case 'messaging': {
        const msgInfo = data?.features?.messaging;
        if (msgInfo) {
          return createResponse(
            `${msgInfo.description}\n\n✅ ${msgInfo.benefits.join('\n✅ ')}`,
            [
              { label: 'Messagerie', url: `/${lang}/fonctionnalites/messagerie`, type: 'primary' },
              { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'secondary' }
            ]
          );
        }
        break;
      }

      case 'providers': {
        const provInfo = data?.features?.providers;
        if (provInfo) {
          return createResponse(
            `${provInfo.description}\n\n✅ ${provInfo.benefits.join('\n✅ ')}`,
            [
              { label: t('contextual.providersLabel') || 'Gestion Prestataires', url: `/${lang}/fonctionnalites/prestataires`, type: 'primary' },
              { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'secondary' }
            ]
          );
        }
        break;
      }

      case 'reporting': {
        const repInfo = data?.features?.reporting;
        if (repInfo) {
          return createResponse(
            `${repInfo.description}\n\n✅ ${repInfo.benefits.join('\n✅ ')}`,
            [
              { label: 'Reporting', url: `/${lang}/fonctionnalites/reporting`, type: 'primary' },
              { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
            ]
          );
        }
        break;
      }

      case 'smartLocks': {
        const locksInfo = data?.features?.smartLocks;
        if (locksInfo) {
          return createResponse(
            `${locksInfo.description}\n\n🔐 ${t('contextual.partners') || 'Partenaires'}: ${locksInfo.partners?.join(', ')}\n\n✅ ${locksInfo.benefits.join('\n✅ ')}`,
            [
              { label: t('contextual.smartLocksLabel') || 'Serrures connectées', url: `/${lang}/fonctionnalites/serrures-connectees`, type: 'primary' },
              { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'secondary' }
            ]
          );
        }
        break;
      }

      case 'integration': {
        return createResponse(getIntegrationsText(), [
          { label: t('contextual.apiConnectionsLabel') || 'Connexions API', url: `/${lang}/connexions-api`, type: 'primary' },
          { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'secondary' }
        ]);
      }

      case 'ai': {
        return createResponse(t('contextual.aiResponse'), [
          { label: 'IA & Automatisation', url: `/${lang}/fonctionnalites/ia-automatisation`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }

      case 'demo': {
        setConversationStep('conversion');
        return createResponse(t('actions.twoOptions'), [
          { label: t('actions.personalDemo'), url: `/${lang}/reserver-demo`, type: 'primary' },
          { label: trialCta, url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }

      case 'migration': {
        return createResponse(t('contextual.migrationResponse'), [
          { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }

      case 'contact': {
        const company = data?.company;
        if (company) {
          const contactText = `📞 **${t('contextual.contactUs') || 'Contactez-nous'} :**\n\n` +
            `📧 Email : ${company.email}\n` +
            `📱 ${t('contextual.phone') || 'Téléphone'} : ${company.phoneFormatted}\n` +
            `🕐 ${t('contextual.hours') || 'Horaires'} : ${company.support?.hours || 'Du lundi au vendredi, 9h-18h'}\n` +
            `⏱️ ${t('contextual.responseTime') || 'Délai de réponse'} : ${company.support?.responseTime || 'Sous 24h'}\n\n` +
            `${t('contextual.contactFormInfo') || 'Vous pouvez aussi nous contacter via le formulaire de notre page contact !'}`;
          
          return createResponse(contactText, [
            { label: t('actions.contactPage') || 'Page Contact', url: `/${lang}/contact`, type: 'primary' },
            { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'referral': {
        const referral = data?.referralProgram;
        if (referral) {
          const referralText = `${t('referral.title')}\n\n` +
            `${t('referral.intro')}\n\n` +
            `✅ ${referral.forReferrer.reward}\n` +
            `✅ ${referral.forReferrer.priorityAccess}\n\n` +
            `**${t('referral.howItWorks')}**\n` +
            `1. ${t('referral.step1')}\n` +
            `2. ${t('referral.step2')}\n` +
            `3. ${t('referral.step3')}`;
          
          return createResponse(referralText, [
            { label: t('referral.details'), url: `/${lang}/programme-parrainage`, type: 'primary' },
            { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'faq': {
        const faq = data?.faq;
        if (faq) {
          const faqText = `❓ **${t('contextual.faqTitle') || 'Questions fréquentes'} :**\n\n` +
            faq.general.slice(0, 4).map((item: { q: string; a: string }) => `**${item.q}**\n→ ${item.a}`).join('\n\n') +
            `\n\n${t('contextual.faqMore') || 'Vous avez une question spécifique ? N\'hésitez pas à me la poser !'}`;
          
          return createResponse(faqText, [
            { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'primary' },
            { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'team': {
        const company = data?.company;
        if (company) {
          const teamText = `${t('about.title')}\n\n` +
            `${company.legalName || 'SAS Biloki'}\n` +
            `📍 ${company.address}\n` +
            `👤 ${t('about.president')} : ${company.legal?.president || 'Vernay Sébastien'}\n\n` +
            `${t('about.mission')}`;
          
          return createResponse(teamText, [
            { label: t('about.ourTeam'), url: `/${lang}/equipe`, type: 'primary' },
            { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'legal': {
        const company = data?.company;
        if (company?.legal) {
          const legalText = `${t('legal.title')}\n\n` +
            `**${company.legalName}**\n` +
            `📍 ${company.address}\n` +
            `🏛️ RCS : ${company.legal.rcs}\n` +
            `💶 Capital : ${company.legal.capital}\n` +
            `🔢 TVA : ${company.legal.tva}\n\n` +
            `${t('legal.moreDetails')}`;
          
          return createResponse(legalText, [
            { label: t('legal.legalNotice'), url: `/${lang}/mentions-legales`, type: 'secondary' },
            { label: t('legal.termsOfService'), url: `/${lang}/cgv`, type: 'secondary' },
            { label: t('actions.contactPage') || 'Contact', url: `/${lang}/contact`, type: 'primary' }
          ]);
        }
        break;
      }

      case 'blog': {
        const articles = data?.blogArticles;
        if (articles) {
          const blogText = `📚 **${t('contextual.blogTitle') || 'Nos guides et articles'}**\n\n` +
            Object.values(articles).map((article: { title: string; summary: string }) => 
              `📖 **${article.title}**\n${article.summary.slice(0, 100)}...`
            ).join('\n\n');
          
          return createResponse(blogText, [
            { label: `📚 ${t('contextual.viewBlog') || 'Voir le blog'}`, url: `/${lang}/blog`, type: 'primary' },
            { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'modules': {
        const modules = data?.optionalModules;
        if (modules) {
          const modulesText = `🧩 **${t('contextual.optionalModules') || 'Modules optionnels'}**\n\n` +
            Object.values(modules).map((mod: { name: string; price: string; features: string[] }) => 
              `**${mod.name}** (${mod.price})\n` +
              mod.features.map((f: string) => `  ✅ ${f}`).join('\n')
            ).join('\n\n');
          
          return createResponse(modulesText, [
            { label: t('actions.seePricing'), url: `/${lang}/tarifs`, type: 'primary' },
            { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'included': {
        const included = data?.includedFeatures;
        if (included) {
          const includedText = `✅ **${t('contextual.includedTitle') || 'Tout ce qui est inclus dans votre forfait'} :**\n\n` +
            included.map((f: string) => `• ${f}`).join('\n') +
            `\n\n${t('contextual.andMore') || 'Et bien plus encore !'} 🚀`;
          
          return createResponse(includedText, [
            { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'primary' },
            { label: t('actions.seePricing'), url: `/${lang}/tarifs`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'benefits': {
        const metrics = data?.benefitsMetrics;
        if (metrics) {
          const benefitsText = `💪 **${t('contextual.benefitsTitle') || 'Les bénéfices concrets de Biloki'}**\n\n` +
            `⏱️ ${t('contextual.timeSaved') || 'Gain de temps'} : **${metrics.timeSaved}**\n` +
            `📉 ${t('contextual.adminReduction') || 'Réduction admin'} : **${metrics.adminReduction}**\n` +
            `🚀 Migration : **${metrics.migrationTime}**\n` +
            `💬 Support : **${metrics.supportResponse}**\n` +
            `🔒 ${t('contextual.doubleBookings') || 'Double réservation'} : **${metrics.doubleBookings}**\n` +
            `🌐 ${t('contextual.connectedPlatforms') || 'Plateformes connectées'} : **${metrics.platforms}**`;
          
          return createResponse(benefitsText, [
            { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'primary' },
            { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
          ]);
        }
        break;
      }

      case 'support': {
        return createResponse(t('contextual.supportResponse'), [
          { label: t('actions.contactPage') || 'Contact', url: `/${lang}/contact`, type: 'primary' },
          { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'secondary' }
        ]);
      }

      case 'comparison': {
        // Comparaison avec les concurrents - réponse générique
        const comparisonText = `📊 **${t('contextual.comparisonTitle') || 'Biloki vs autres solutions'}**\n\n` +
          `${t('contextual.comparisonText') || 'Biloki se distingue par sa simplicité, son prix compétitif et son support réactif. Nous proposons toutes les fonctionnalités essentielles pour gérer vos locations.'}\n\n` +
          `${t('contextual.comparisonCta') || 'Envie d\'en savoir plus sur ce qui nous différencie ?'}`;
        
        return createResponse(comparisonText, [
          { label: t('actions.bookDemo'), url: `/${lang}/reserver-demo`, type: 'primary' },
          { label: t('actions.tryFree'), url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'secondary' }
        ]);
      }
    }

    // =========================================================================
    // RÉPONSES CONTEXTUELLES (salutations, remerciements, etc.)
    // =========================================================================

    // Salutations
    const greetingKeywords = ['bonjour', 'salut', 'hello', 'hi', 'hey', 'bonsoir', 'coucou', 'hola', 'olá', 'ola'];
    if (greetingKeywords.some(kw => lowerMessage === kw || lowerMessage.startsWith(kw + ' '))) {
      return createResponse(t('initialGreeting'));
    }

    // Remerciements
    const thanksKeywordsStr = t('contextual.thanksKeywords');
    const thanksKeywords = thanksKeywordsStr !== 'contextual.thanksKeywords' ? thanksKeywordsStr.split('|') : ['merci', 'thanks', 'gracias', 'obrigado'];
    if (thanksKeywords.some(kw => lowerMessage.includes(kw))) {
      return createResponse(t('contextual.thanksResponse'));
    }

    // Accords / Confirmations
    const agreeKeywordsStr = t('demoStep.agree');
    const agreeKeywords = agreeKeywordsStr !== 'demoStep.agree' ? agreeKeywordsStr.split('|') : ['oui', 'yes', 'ok', 'd\'accord', 'parfait'];
    if (agreeKeywords.some(kw => lowerMessage.includes(kw))) {
      return createResponse(t('demoStep.agreeResponse'), [
        { label: t('actions.bookDemoShort'), url: `/${lang}/reserver-demo`, type: 'primary' }
      ]);
    }

    // Plus tard / Réfléchir
    const laterKeywordsStr = t('demoStep.later');
    const laterKeywords = laterKeywordsStr !== 'demoStep.later' ? laterKeywordsStr.split('|') : ['plus tard', 'later', 'réfléchir', 'pas maintenant'];
    if (laterKeywords.some(kw => lowerMessage.includes(kw))) {
      return createResponse(t('demoStep.laterResponse'), [
        { label: trialCtaRocket, url: `${WEBAPP_REGISTER_URL}?lang=${lang}`, type: 'primary' },
        { label: t('actions.seePricing'), url: `/${lang}/tarifs`, type: 'secondary' }
      ]);
    }

    // =========================================================================
    // RÉPONSE PAR DÉFAUT - Ne pas inventer, guider l'utilisateur
    // =========================================================================
    
    const dynamicCtas = getDynamicCTA(lang);
    return createResponse(t('contextual.defaultResponse'), [
      { label: dynamicCtas.primary.label, url: dynamicCtas.primary.url, type: 'primary' },
      { label: dynamicCtas.secondary.label, url: dynamicCtas.secondary.url, type: 'secondary' }
    ]);
  }, [conversationStep, detectTopics, getDynamicCTA, getPricingText, getFeaturesText, getIntegrationsText, currentAgentData]);

  // ============================================================================
  // SCROLL ET EFFECTS
  // ============================================================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Charger depuis localStorage et initialiser avec les données de l'API
  useEffect(() => {
    if (typeof window !== 'undefined' && agentData) {
      try {
        const savedLang = localStorage.getItem('chatbot-detected-lang');
        
        if (savedLang) {
          setDetectedLang(savedLang);
        }

        const savedMessages = localStorage.getItem('chatbot-messages');
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          } else {
            setMessages([createInitialMessage()]);
          }
        } else {
          setMessages([createInitialMessage()]);
        }

        const savedProfile = localStorage.getItem('chatbot-profile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          if (parsedProfile && typeof parsedProfile === 'object') {
            setUserProfile(parsedProfile);
          }
        }

        const savedStep = localStorage.getItem('chatbot-step');
        if (savedStep) {
          setConversationStep(savedStep as ConversationStep);
        }
      } catch (error) {
        // Si localStorage est corrompu, on nettoie tout
        console.warn('ChatBot: localStorage corrompu, réinitialisation...');
        localStorage.removeItem('chatbot-messages');
        localStorage.removeItem('chatbot-profile');
        localStorage.removeItem('chatbot-step');
        localStorage.removeItem('chatbot-detected-lang');
        setMessages([createInitialMessage()]);
      }

      setIsHydrated(true);
    }
  }, [urlLocale, currentAgentData, createInitialMessage]);

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
      localStorage.setItem('chatbot-profile', JSON.stringify(userProfile));
      localStorage.setItem('chatbot-step', conversationStep);
      localStorage.setItem('chatbot-detected-lang', detectedLang);
    }
  }, [messages, userProfile, conversationStep, isHydrated, detectedLang]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkBlueBackgroundOverlap = () => {
      const button = chatButtonRef.current;
      
      if (!button) return;
      
      const buttonRect = button.getBoundingClientRect();
      
      // Vérifier uniquement le footer
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (buttonRect.bottom > footerRect.top && buttonRect.top < footerRect.bottom) {
          setIsOverFooter(true);
          return;
        }
      }
      
      setIsOverFooter(false);
    };

    window.addEventListener('scroll', checkBlueBackgroundOverlap);
    window.addEventListener('resize', checkBlueBackgroundOverlap);
    checkBlueBackgroundOverlap();

    return () => {
      window.removeEventListener('scroll', checkBlueBackgroundOverlap);
      window.removeEventListener('resize', checkBlueBackgroundOverlap);
    };
  }, []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputValue;
    if (!messageToSend.trim()) return;

    const newLang = detectLanguage(messageToSend);
    if (newLang !== detectedLang) {
      setDetectedLang(newLang);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickReplies(false);

    // Charger les données pour la langue détectée si nécessaire
    let dataForResponse = currentAgentData;
    if (newLang !== urlLocale) {
      try {
        const response = await fetch(`/api/agent/data?locale=${newLang}`);
        const data = await response.json();
        dataForResponse = data;
        setAgentDataForLang(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données pour la langue:', error);
      }
    }

    setTimeout(() => {
      const response = generateBotResponse(messageToSend, newLang, dataForResponse);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        actions: response.actions
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      
      // Notification si le chat est fermé
      if (!isOpen) {
        setHasUnreadMessages(true);
        // Son de notification (optionnel)
        try {
          notificationSoundRef.current?.play();
        } catch (e) {
          // Ignore si le son ne peut pas être joué
        }
      }
    }, 500);
  };

  const handleQuickReply = (message: string) => {
    handleSendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className={`fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-4 w-full sm:w-96 h-[100dvh] sm:h-[500px] max-h-[100dvh] sm:max-h-[600px] bg-white sm:rounded-xl rounded-none shadow-2xl flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${
          isOpen 
            ? 'scale-100 opacity-100 pointer-events-auto' 
            : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header - Barre bleue Biloki */}
        <div className="chatbot-header text-white p-4 sm:rounded-t-xl rounded-none flex items-center justify-between shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md p-1.5">
              <img 
                src="/logos/logo.svg" 
                alt="Biloki" 
                className="w-full h-full object-contain" 
                style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(98%) saturate(1752%) hue-rotate(175deg) brightness(101%) contrast(101%)' }}
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{getT('title')}</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-xs text-white/90">{getT('online')}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Clear conversation button */}
            <button 
              onClick={clearConversation}
              className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              title="Effacer la conversation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {message.sender === 'bot' && (
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                  <span className="text-white font-bold text-xs">B</span>
                </div>
              )}
              
              <div className="max-w-[80%]">
                <div 
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-br-md shadow-md'
                      : 'bg-white text-gray-900 border border-gray-100 rounded-bl-md shadow-sm'
                  }`}
                >
                  {message.text.split('\n').map((line, idx) => (
                    <div key={idx} className={line === '' ? 'h-2' : ''}>{line}</div>
                  ))}
                </div>
                
                {/* Timestamp */}
                <p className={`text-[10px] text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </p>
                
                {/* Action buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.actions.map((action, idx) => (
                      <a
                        key={idx}
                        href={action.url}
                        className={`block text-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] ${
                          action.type === 'primary'
                            ? 'bg-primary text-white hover:bg-[#0391dd] shadow-md hover:shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl border border-gray-100 rounded-bl-md shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && messages.length <= 2 && !isLoading && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Suggestions :</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply.message)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all transform hover:scale-105"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-100 p-3 sm:p-4 bg-white sm:rounded-b-xl rounded-none">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getT('placeholder')}
              className="flex-1 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base sm:text-sm bg-white transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary text-white rounded-lg px-3 py-3 hover:bg-[#0391dd] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      {!isOpen && (
        <button
          ref={chatButtonRef}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setHasUnreadMessages(false);
          }}
          className={`fixed bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group ${
            isOverFooter 
              ? 'bg-white border-2 border-white' 
              : 'bg-primary text-white'
          } hover:scale-110`}
        >
          {/* Notification badge */}
          {hasUnreadMessages && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-[10px] font-bold">!</span>
            </span>
          )}
          
          {/* Pulse animation when closed */}
          <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isOverFooter ? 'bg-white' : 'bg-primary'}`}></span>
          
          <svg className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${isOverFooter ? 'text-primary' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
      
      {/* Tooltip on hover (desktop only) */}
      {!isOpen && (
        <div className="hidden sm:block fixed bottom-20 right-4 z-40 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            Une question ? 💬
          </div>
        </div>
      )}
    </>
  );
}
