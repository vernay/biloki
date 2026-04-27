'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyCount: string;
  role: string;
}

/**
 * ChatBot utilisant le Vercel AI SDK avec streaming et capture de leads HubSpot
 * Nouveau flow: Formulaire → 3 choix (Démo/Support/Question)
 */
export default function ChatBotAI() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(true); // Formulaire affiché dès l'ouverture
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showChoiceButtons, setShowChoiceButtons] = useState(false); // Afficher les 3 boutons après le formulaire
  const [selectedChoice, setSelectedChoice] = useState<'demo' | 'support' | 'question' | null>(null);
  const [technicalDescription, setTechnicalDescription] = useState('');
  const [leadFormData, setLeadFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyCount: '',
    role: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Charger l'état sauvegardé au montage du composant
  useEffect(() => {
    const savedState = sessionStorage.getItem('biloki-chatbot-state');
    if (savedState && savedState.trim()) {
      try {
        const parsed = JSON.parse(savedState);
        setMessages(parsed.messages || []);
        setLeadFormData(parsed.leadFormData || {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          propertyCount: '',
          role: '',
        });
        setLeadSubmitted(parsed.leadSubmitted || false);
        setShowLeadForm(!parsed.leadSubmitted); // Masquer le formulaire si déjà soumis
        setShowChoiceButtons(parsed.showChoiceButtons || false);
        
        // Si l'utilisateur avait cliqué sur "Démo" et revient, basculer en mode "question"
        // pour lui permettre de continuer à discuter
        if (parsed.selectedChoice === 'demo') {
          setSelectedChoice('question');
        } else {
          setSelectedChoice(parsed.selectedChoice || null);
        }
        
        // Scroll en bas après chargement des messages
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
        }, 100);
      } catch (error) {
        sessionStorage.removeItem('biloki-chatbot-state');
        console.error('Erreur lors du chargement de l\'état du chatbot:', error);
      }
    }
  }, []);

  // Sauvegarder l'état à chaque changement
  useEffect(() => {
    if (leadSubmitted) {
      const stateToSave = {
        messages,
        leadFormData,
        leadSubmitted,
        showChoiceButtons,
        selectedChoice,
      };
      sessionStorage.setItem('biloki-chatbot-state', JSON.stringify(stateToSave));
    }
  }, [messages, leadFormData, leadSubmitted, showChoiceButtons, selectedChoice]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showLeadForm]);

  // Scroll en bas quand le chatbot s'ouvre
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
      }, 100);
    }
  }, [isOpen]);

  const buildConversationTranscript = (conversationMessages: Message[]) => {
    return conversationMessages
      .map((m) => `${m.role === 'user' ? 'Visiteur' : 'Assistant'}: ${m.content.replace(/\[BUTTON:.*?\|.*?\]/g, '').replace(/\[LEAD_FORM\]/g, '').trim()}`)
      .join('\n\n');
  };

  const getLatestUserQuestion = (conversationMessages: Message[]) => {
    const lastUserMessage = [...conversationMessages]
      .reverse()
      .find((m) => m.role === 'user');

    if (!lastUserMessage) return '';

    return lastUserMessage.content
      .replace(/\[BUTTON:.*?\|.*?\]/g, '')
      .replace(/\[LEAD_FORM\]/g, '')
      .trim();
  };

  const syncQuestionConversationToHubSpot = async (conversationMessages: Message[]) => {
    if (selectedChoice !== 'question' || !leadFormData.email) return;

    const latestQuestion = getLatestUserQuestion(conversationMessages);
    if (!latestQuestion) return;

    const conversation = `Question utilisateur:\n${latestQuestion}`;
    if (!conversation.trim()) return;

    try {
      await fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: leadFormData.firstName,
          lastName: leadFormData.lastName,
          email: leadFormData.email,
          phone: leadFormData.phone,
          propertyCount: leadFormData.propertyCount,
          role: leadFormData.role,
          conversation: `Question générale via chatbot\n\n${conversation}`,
          source: 'chatbot',
          locale,
          requestType: 'Question générale',
        }),
      });
    } catch (error) {
      console.error('Erreur sync conversation HubSpot:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    const messagesWithUser = [...messages, userMessage];
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesWithUser.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          locale,
        }),
      });

      if (!response.ok) throw new Error('Erreur réseau');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('Pas de reader');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantMessage.content += chunk;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...assistantMessage };
          return newMessages;
        });
      }

      const finalMessages = [...messagesWithUser, assistantMessage];
      void syncQuestionConversationToHubSpot(finalMessages);

    } catch (error) {
      console.error('Erreur chat:', error);

      const errorAssistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
      };

      setMessages((prev) => [
        ...prev,
        errorAssistantMessage,
      ]);

      void syncQuestionConversationToHubSpot([...messagesWithUser, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!leadFormData.firstName || !leadFormData.lastName || !leadFormData.email) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    // Masquer le formulaire et afficher le message de bienvenue + 3 boutons
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setShowChoiceButtons(true);
    
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Merci ${leadFormData.firstName} ! 🎉 Comment puis-je vous aider aujourd'hui ?`,
      },
    ]);
  };

  const handleChoice = async (choice: 'demo' | 'support' | 'question') => {
    setSelectedChoice(choice);
    setShowChoiceButtons(false);

    // Construire le transcript de conversation
    const conversation = buildConversationTranscript(messages);

    if (choice === 'demo') {
      setIsLoading(true);
      try {
        // 📅 Demander une démo
        // 1. Créer le contact HubSpot
        await fetch('/api/hubspot/create-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: leadFormData.firstName,
            lastName: leadFormData.lastName,
            email: leadFormData.email,
            phone: leadFormData.phone,
            propertyCount: leadFormData.propertyCount,
            role: leadFormData.role,
            conversation: `Demande de démo via chatbot\n\n${conversation}`,
            source: 'chatbot',
            locale,
            requestType: 'Demande de démo',
          }),
        });

        // 2. Rediriger vers la page de réservation de démo
        window.location.href = `/${locale}/reserver-demo`;
        
      } catch (error) {
        console.error('Erreur lors de la demande de démo:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }

    } else if (choice === 'support') {
      // 🛠 Problème technique - afficher le champ de description immédiatement
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Je vous mets en relation avec notre équipe technique. Pouvez-vous décrire votre problème ci-dessous ? (Optionnel mais recommandé pour accélérer la résolution)`,
        },
      ]);

    } else if (choice === 'question') {
      // ❓ Poser une question - afficher immédiatement le champ de saisie
      // Message de bienvenue affiché immédiatement
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Je suis là pour répondre à toutes vos questions sur Biloki ! 💬 N'hésitez pas à me demander ce que vous voulez savoir.`,
        },
      ]);

      // Créer le contact HubSpot en arrière-plan (non bloquant)
      fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: leadFormData.firstName,
          lastName: leadFormData.lastName,
          email: leadFormData.email,
          phone: leadFormData.phone,
          propertyCount: leadFormData.propertyCount,
          role: leadFormData.role,
          source: 'chatbot',
          locale,
          requestType: 'Question générale',
        }),
      }).catch(error => {
        console.error('Erreur création contact HubSpot (arrière-plan):', error);
        // On ne bloque pas l'utilisateur même si ça échoue
      });
    }
  };

  const handleTechnicalSupportSubmit = async () => {
    setIsLoading(true);

    try {
      // Construire le transcript de conversation
      const conversation = buildConversationTranscript(messages);

      const problemDescription = technicalDescription.trim() || 'Non spécifié';

      console.log('📤 Envoi demande support technique:', {
        firstName: leadFormData.firstName,
        lastName: leadFormData.lastName,
        email: leadFormData.email,
        phone: leadFormData.phone,
        problemDescription,
      });

      // Créer le contact + tâche urgente
      const response = await fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: leadFormData.firstName,
          lastName: leadFormData.lastName,
          email: leadFormData.email,
          phone: leadFormData.phone,
          propertyCount: leadFormData.propertyCount,
          role: leadFormData.role,
          conversation: `🛠 SUPPORT TECHNIQUE\n\nProblème décrit:\n${problemDescription}\n\n${conversation}`,
          source: 'chatbot',
          locale,
          requestType: 'Support technique',
          problemDescription,
          urgent: true,
        }),
      });

      console.log('📥 Réponse serveur:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API HubSpot:', errorData);
        throw new Error(`Erreur HubSpot: ${errorData.error || 'Erreur inconnue'}`);
      }

      const result = await response.json();
      console.log('✅ Contact HubSpot créé avec succès:', result);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Parfait ! 🛠 Notre équipe technique a bien reçu votre demande et vous contactera dans les meilleurs délais.\n\nComment puis-je vous aider d'autre ?`,
        },
      ]);

      setTechnicalDescription('');
      // Réafficher les 3 boutons de choix pour permettre une autre action
      setSelectedChoice(null);
      setShowChoiceButtons(true);

    } catch (error) {
      console.error('Erreur support technique:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Réafficher les 3 boutons de choix
    setSelectedChoice(null);
    setShowChoiceButtons(true);
    setTechnicalDescription('');
    
    // Message pour guider l'utilisateur
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Pas de problème ! Comment puis-je vous aider autrement ?`,
      },
    ]);
  };

  const handleTransferToHuman = async () => {
    // Cette fonction n'est plus utilisée - remplacée par le système de choix
  };

  return (
    <>
      {/* Bouton flottant avec bulle de texte */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-3">
        {/* Bulle de texte à côté du bouton (visible uniquement si le chat est fermé) */}
        {!isOpen && (
          <div className="hidden md:block bg-primary text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium whitespace-nowrap animate-[fadeIn_0.3s_ease-in-out]">
            💬 Parlez à notre chatbot Biloki
          </div>
        )}
        
        {/* Bouton principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-white text-primary shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-2xl border-2 border-primary"
          aria-label="Ouvrir le chat"
        >
          💬
        </button>
      </div>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50 md:w-96 md:h-[500px] bg-white md:rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 md:rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logos/logo-icon-white.svg" alt="Biloki" className="h-7 w-7" />
              <div>
                <h3 className="font-bold text-sm md:text-base">Assistant Biloki</h3>
                <p className="text-xs opacity-90">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 text-lg md:text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
            {messages.length === 0 && !showLeadForm && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm md:text-base">👋 Bonjour ! Comment puis-je vous aider ?</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-xs md:text-sm whitespace-pre-wrap">
                        {message.content.replace(/\[BUTTON:.*?\|.*?\]/g, '').replace(/\[LEAD_FORM\]/g, '').trim()}
                      </p>
                      {/* Boutons extraits */}
                      <div className="flex flex-col gap-2">
                        {(() => {
                          const buttonRegex = /\[BUTTON:(.*?)\|(.*?)\]/g;
                          const buttons = [];
                          let match;
                          while ((match = buttonRegex.exec(message.content)) !== null) {
                            buttons.push({ text: match[1], url: match[2] });
                          }
                          return buttons.map((btn, i) => (
                            <a
                              key={i}
                              href={btn.url}
                              className="inline-block bg-[#01a4ff] hover:bg-[#0190e0] text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-lg transition-colors text-center"
                            >
                              {btn.text}
                            </a>
                          ));
                        })()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs md:text-sm">{message.content}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Formulaire de qualification initial */}
            {showLeadForm && !leadSubmitted && (
              <div className="flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-md border border-blue-100">
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-2 text-center">
                    👋 Bonjour ! Pour mieux vous aider, puis-je avoir quelques informations ?
                  </h4>
                  <form onSubmit={handleLeadSubmit} className="space-y-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Prénom *"
                        value={leadFormData.firstName}
                        onChange={(e) => setLeadFormData({ ...leadFormData, firstName: e.target.value })}
                        className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff]"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Nom *"
                        value={leadFormData.lastName}
                        onChange={(e) => setLeadFormData({ ...leadFormData, lastName: e.target.value })}
                        className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff]"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={leadFormData.email}
                      onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone (optionnel)"
                      value={leadFormData.phone}
                      onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff]"
                    />
                    <input
                      type="number"
                      placeholder="Nombre de logements"
                      value={leadFormData.propertyCount}
                      onChange={(e) => setLeadFormData({ ...leadFormData, propertyCount: e.target.value })}
                      className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff]"
                    />
                    <select
                      value={leadFormData.role}
                      onChange={(e) => setLeadFormData({ ...leadFormData, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#01a4ff] bg-white"
                    >
                      <option value="">Vous êtes... (optionnel)</option>
                      <option value="Gestionnaire">Gestionnaire</option>
                      <option value="Particulier">Particulier</option>
                      <option value="Autre">Autre</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-[#01a4ff] hover:bg-[#0190e0] text-white text-xs md:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Continuer
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 3 boutons de choix après le formulaire */}
            {showChoiceButtons && (
              <div className="flex justify-center">
                <div className="w-full max-w-md space-y-2">
                  <button
                    onClick={() => handleChoice('demo')}
                    disabled={isLoading}
                    className="w-full bg-[#01a4ff] hover:bg-[#0190e0] text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>📅</span>
                    <span>Demander une démo</span>
                  </button>
                  <button
                    onClick={() => handleChoice('support')}
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>🛠</span>
                    <span>Problème technique</span>
                  </button>
                  <button
                    onClick={() => handleChoice('question')}
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>❓</span>
                    <span>Poser une question</span>
                  </button>
                </div>
              </div>
            )}

            {/* Champ de description pour le support technique */}
            {selectedChoice === 'support' && !isLoading && (
              <div className="flex justify-center">
                <div className="w-full max-w-md bg-orange-50 rounded-2xl p-4 shadow-md border border-orange-200">
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-3">
                    🛠 Décrivez votre problème
                  </h4>
                  <textarea
                    value={technicalDescription}
                    onChange={(e) => setTechnicalDescription(e.target.value)}
                    placeholder="Décrivez votre problème technique (optionnel mais recommandé)..."
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 min-h-[100px] resize-none"
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleTechnicalSupportSubmit}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Envoyer
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <span className="animate-pulse">●●●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input - visible uniquement si l'utilisateur a choisi "Poser une question" */}
          {selectedChoice === 'question' && (
            <div className="border-t">
              <form onSubmit={handleSubmit} className="p-3 md:p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 rounded-full border border-gray-300 px-3 md:px-4 py-2 text-xs md:text-sm focus:outline-none focus:border-primary"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary text-white rounded-full px-4 md:px-6 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
                  >
                    →
                  </button>
                </div>
              </form>
              <div className="px-3 md:px-4 pb-3 md:pb-4">
                <button
                  onClick={() => {
                    setSelectedChoice(null);
                    setShowChoiceButtons(true);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: 'Parfait ! Comment puis-je vous aider autrement ?',
                      },
                    ]);
                  }}
                  className="text-xs text-gray-500 hover:text-primary transition-colors underline"
                >
                  ← Retour aux options (Démo, Support technique)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
