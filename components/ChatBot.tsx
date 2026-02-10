'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import useAgentData, {
  getUserSizeFromCount,
  type AgentDataResponse
} from '@/lib/hooks/useAgentData';

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

interface LeadData {
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
  humanReason?: string;
}

type ConversationStep = 'greeting' | 'qualification' | 'discovery' | 'product' | 'partners' | 'conversion' | 'support';

export default function ChatBot() {
  const urlLocale = useLocale();
  const supportedLocales = ['fr', 'en', 'es', 'pt'];
  
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
  const [leadData, setLeadData] = useState<LeadData>({});
  const [conversationStep, setConversationStep] = useState<ConversationStep>('greeting');
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [awaitingHumanEmail, setAwaitingHumanEmail] = useState(false);
  const [awaitingHumanReason, setAwaitingHumanReason] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasInitializedRef = useRef(false);
  const sessionIdRef = useRef<string>('');

  // Initialiser le son de notification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationSoundRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      notificationSoundRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('biloki-chat-session');
    if (stored) {
      sessionIdRef.current = stored;
      return;
    }
    const newId = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    sessionIdRef.current = newId;
    window.localStorage.setItem('biloki-chat-session', newId);
  }, []);

  // Fermer le chatbot quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
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
  const quickReplies = messages.length <= 2
    ? [
        { label: '👋 Parler à un humain', message: 'Parler à un humain' },
        { label: '🤖 Continuer avec le bot', message: 'Continuer avec le bot' },
      ]
    : [
        { label: '💰 Tarifs', message: 'Quels sont vos tarifs ?' },
        { label: '📋 Fonctionnalités', message: 'Quelles sont les fonctionnalités ?' },
        { label: '📅 Démo', message: 'Je voudrais réserver une démo' },
        { label: '👋 Parler à un humain', message: 'Parler à un humain' },
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
      localStorage.removeItem('chatbot-lead');
    }
    setMessages([createInitialMessage()]);
    setUserProfile({ type: 'unknown', size: 'unknown' });
    setLeadData({});
    setConversationStep('greeting');
    setShowQuickReplies(true);
    setAwaitingHumanEmail(false);
    setAwaitingHumanReason(false);
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

  const getPreferredLocale = useCallback((): string => {
    if (typeof navigator === 'undefined') return urlLocale;
    const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
    if (browserLang && supportedLocales.includes(browserLang)) {
      return browserLang;
    }
    return urlLocale;
  }, [urlLocale, supportedLocales]);

  const detectLanguageFromText = useCallback((text: string): string => {
    const normalized = text.toLowerCase();
    const scores: Record<string, number> = { fr: 0, en: 0, es: 0, pt: 0 };

    const bump = (lang: string, count: number) => {
      scores[lang] += count;
    };

    const words = {
      fr: ['bonjour', 'merci', 'prix', 'tarif', 'démo', 'fonctionnalité', 'contact', 'essai', 'aide'],
      en: ['hello', 'thanks', 'price', 'pricing', 'demo', 'features', 'contact', 'trial', 'help'],
      es: ['hola', 'gracias', 'precio', 'precios', 'demo', 'funcionalidades', 'contacto', 'ayuda', 'prueba'],
      pt: ['ola', 'olá', 'obrigado', 'preço', 'precos', 'preços', 'demo', 'funcionalidades', 'contato', 'ajuda', 'teste'],
    } as const;

    (Object.keys(words) as Array<keyof typeof words>).forEach((lang) => {
      words[lang].forEach((kw) => {
        if (normalized.includes(kw)) bump(lang, 2);
      });
    });

    if (/[¿¡]/.test(text) || /\b(el|la|los|las|una|unas|unos|para|por)\b/.test(normalized)) bump('es', 1);
    if (/\b(the|and|with|please|how|what|price)\b/.test(normalized)) bump('en', 1);
    if (/\b(para|com|você|voce|obrigado|preço|precos|preços)\b/.test(normalized)) bump('pt', 1);
    if (/\b(le|la|les|des|pour|merci|prix|tarif)\b/.test(normalized)) bump('fr', 1);

    const best = (Object.entries(scores) as Array<[string, number]>).sort((a, b) => b[1] - a[1])[0];
    if (best && best[1] > 0) return best[0];
    return getPreferredLocale();
  }, [getPreferredLocale]);

  const detectLanguage = useCallback((text?: string): { lang: string; confident: boolean } => {
    if (text && text.trim().length > 2) {
      const lang = detectLanguageFromText(text);
      return { lang, confident: true };
    }
    const preferred = getPreferredLocale();
    return { lang: preferred, confident: true };
  }, [getPreferredLocale, detectLanguageFromText]);


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

  const createHumanChoiceMessage = useCallback((): Message => {
    const copy = {
      fr: "Souhaitez-vous discuter avec un humain ou continuer avec le bot ?",
      en: 'Would you like to talk to a human or continue with the bot?',
      es: '¿Quieres hablar con un humano o continuar con el bot?',
      pt: 'Você quer falar com um humano ou continuar com o bot?',
    };

    const locale = (detectedLang in copy ? detectedLang : urlLocale) as keyof typeof copy;

    return {
      id: 'choice-1',
      text: copy[locale] || copy.fr,
      sender: 'bot',
      timestamp: new Date(),
    };
  }, [detectedLang, urlLocale]);

  const createHumanReasonPrompt = useCallback((): Message => {
    const copy = {
      fr: "Quel est le sujet de votre demande ? (optionnel)",
      en: 'What is your request about? (optional)',
      es: '¿Sobre qué trata tu solicitud? (opcional)',
      pt: 'Sobre o que é sua solicitação? (opcional)',
    };

    const locale = (detectedLang in copy ? detectedLang : urlLocale) as keyof typeof copy;

    return {
      id: `human-reason-${Date.now()}`,
      text: copy[locale] || copy.fr,
      sender: 'bot',
      timestamp: new Date(),
    };
  }, [detectedLang, urlLocale]);

  const createHumanEmailPrompt = useCallback((): Message => {
    const copy = {
      fr: "Pour discuter avec un humain, laissez votre numéro. En l'envoyant, vous acceptez d’être recontacté.",
      en: 'To talk to a human, leave your phone number. By sending it, you agree to be contacted.',
      es: 'Para hablar con un humano, deja tu número de teléfono. Al enviarlo, aceptas ser contactado.',
      pt: 'Para falar com um humano, deixe seu número de telefone. Ao enviá-lo, você aceita ser contactado.',
    };

    const locale = (detectedLang in copy ? detectedLang : urlLocale) as keyof typeof copy;

    return {
      id: `human-${Date.now()}`,
      text: copy[locale] || copy.fr,
      sender: 'bot',
      timestamp: new Date(),
    };
  }, [detectedLang, urlLocale]);

  const createHumanConfirmMessage = useCallback((): Message => {
    const copy = {
      fr: 'Merci, un membre de l’équipe vous recontactera rapidement.',
      en: 'Thanks! A team member will get back to you shortly.',
      es: 'Gracias. Un miembro del equipo te contactará pronto.',
      pt: 'Obrigado! Um membro da equipe entrará em contato em breve.',
    };

    const locale = (detectedLang in copy ? detectedLang : urlLocale) as keyof typeof copy;

    return {
      id: `human-confirm-${Date.now()}`,
      text: copy[locale] || copy.fr,
      sender: 'bot',
      timestamp: new Date(),
      actions: [
        {
          label: detectedLang === 'en'
            ? 'Book a demo'
            : detectedLang === 'es'
              ? 'Reservar una demo'
              : detectedLang === 'pt'
                ? 'Agendar demo'
                : 'Réserver une démo',
          url: `/${detectedLang}/reserver-demo`,
          type: 'primary',
        },
      ],
    };
  }, [detectedLang, urlLocale]);


  // ============================================================================
  // SCROLL ET EFFECTS
  // ============================================================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialiser la conversation à chaque chargement (sans persistance)
  useEffect(() => {
    if (typeof window !== 'undefined' && agentData && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      setDetectedLang(getPreferredLocale());
      setMessages([createInitialMessage(), createHumanChoiceMessage()]);
      setUserProfile({ type: 'unknown', size: 'unknown' });
      setLeadData({});
      setConversationStep('greeting');
      setIsHydrated(true);
    }
  }, [agentData, createInitialMessage, createHumanChoiceMessage, getPreferredLocale]);

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

    const languageDetection = detectLanguage(messageToSend);
    const newLang = languageDetection.lang;
    if (languageDetection.confident && newLang !== detectedLang) {
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

    const phoneMatch = messageToSend.trim().match(/^\+?[0-9][0-9\s().-]{6,}$/);
    const normalizedMessage = messageToSend.trim().toLowerCase();
    const wantsHuman =
      normalizedMessage.includes('parler à un humain') ||
      normalizedMessage.includes('parler a un humain') ||
      normalizedMessage.includes('talk to a human') ||
      normalizedMessage.includes('human') ||
      normalizedMessage.includes('agent');

    if (awaitingHumanReason) {
      if (messageToSend.trim()) {
        setLeadData((prev) => ({ ...prev, humanReason: messageToSend.trim() }));
      }
      setAwaitingHumanReason(false);
      setAwaitingHumanEmail(true);
      setMessages((prev) => [...prev, createHumanEmailPrompt()]);
      setIsLoading(false);
      return;
    }

    if (awaitingHumanEmail) {
      if (phoneMatch) {
        setLeadData((prev) => ({ ...prev, phone: messageToSend.trim(), consent: true }));
        setAwaitingHumanEmail(false);
        const confirm = createHumanConfirmMessage();
        setMessages((prev) => [...prev, confirm]);
      } else {
        const prompt = createHumanEmailPrompt();
        setMessages((prev) => [...prev, prompt]);
      }
      setIsLoading(false);
      return;
    }

    if (wantsHuman) {
      setAwaitingHumanReason(true);
      setMessages((prev) => [...prev, createHumanReasonPrompt()]);
      setIsLoading(false);
      return;
    }

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

    const history = [...messages, userMessage]
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
      .slice(-8);

    try {
      const aiResponse = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          locale: newLang,
          history,
          lead: leadData,
          sessionId: sessionIdRef.current || undefined,
        }),
      });

      const aiData = await aiResponse.json();

      if (!aiResponse.ok) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiData?.details
            ? `Erreur API: ${aiData.details}`
            : aiData?.error
              ? `Erreur API: ${aiData.error}`
              : 'Erreur API: réponse invalide',
          sender: 'bot',
          timestamp: new Date(),
          actions: [
            { label: 'Réserver une démo', url: `/${newLang}/reserver-demo`, type: 'primary' },
            { label: 'Voir les tarifs', url: `/${newLang}/tarifs`, type: 'secondary' }
          ],
        };
        setMessages((prev) => [...prev, botResponse]);
        return;
      }
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiData.reply || 'Je ne sais pas encore. Souhaitez-vous une démo ?',
        sender: 'bot',
        timestamp: new Date(),
        actions: Array.isArray(aiData.actions) ? aiData.actions : undefined,
      };

      if (aiData.lead && typeof aiData.lead === 'object') {
        setLeadData((prev) => ({ ...prev, ...aiData.lead }));

        if (aiData.lead.propertyCount && dataForResponse?.sizeThresholds) {
          const size = getUserSizeFromCount(aiData.lead.propertyCount, dataForResponse.sizeThresholds) as UserSize;
          setUserProfile((prev) => ({
            ...prev,
            propertyCount: aiData.lead.propertyCount,
            size,
          }));
          setConversationStep('product');
        }
      }

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Je rencontre un problème technique. Pouvez-vous réessayer dans quelques secondes ou réserver une démo ?',
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          { label: 'Réserver une démo', url: `/${newLang}/reserver-demo`, type: 'primary' },
          { label: 'Voir les tarifs', url: `/${newLang}/tarifs`, type: 'secondary' }
        ],
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);

      // Notification si le chat est fermé
      if (!isOpen) {
        setHasUnreadMessages(true);
        try {
          notificationSoundRef.current?.play();
        } catch (e) {
          // Ignore si le son ne peut pas être joué
        }
      }
    }
  };

  const handleQuickReply = (message: string) => {
    if (message === 'Parler à un humain') {
      setAwaitingHumanEmail(true);
      setAwaitingHumanReason(true);
      setMessages((prev) => [...prev, createHumanReasonPrompt()]);
      setShowQuickReplies(false);
      return;
    }
    if (message === 'Continuer avec le bot') {
      setAwaitingHumanEmail(false);
      setAwaitingHumanReason(false);
      setShowQuickReplies(false);
      const continueCopy = {
        fr: "Parfait, dites-moi votre question.",
        en: 'Great, tell me your question.',
        es: 'Perfecto, dime tu pregunta.',
        pt: 'Perfeito, diga sua pergunta.',
      };
      const locale = (detectedLang in continueCopy ? detectedLang : urlLocale) as keyof typeof continueCopy;
      setMessages((prev) => [
        ...prev,
        {
          id: `continue-${Date.now()}`,
          text: continueCopy[locale] || continueCopy.fr,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      return;
    }
    handleSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
                src="/logos/logo-biloki.png" 
                alt="Biloki" 
                className="w-full h-full object-contain" 
                style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(98%) saturate(1752%) hue-rotate(175deg) brightness(101%) contrast(101%)' }}
                width={40}
                height={40}
                decoding="async"
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
              aria-label="Effacer la conversation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              aria-label="Fermer le chat"
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
              onKeyDown={handleKeyDown}
              placeholder={getT('placeholder')}
              className="flex-1 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base sm:text-sm bg-white transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary text-white rounded-lg px-3 py-3 hover:bg-[#0391dd] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Envoyer le message"
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
          aria-label="Ouvrir le chat"
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
