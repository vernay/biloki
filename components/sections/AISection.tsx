"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function AISection() {
  const t = useTranslations("ai");
  
  const userMessageFull = t("demo.userMessage");
  const assistantSegments = [
    t("demo.assistant1"),
    t("demo.assistant2"),
    t("demo.assistant3"),
    t("demo.assistant4"),
  ];

  const [userShown, setUserShown] = useState(0);
  const [assistantStage, setAssistantStage] = useState(0); // 0..assistantSegments.length
  const [assistantShown, setAssistantShown] = useState(0);
  const [isTypingUser, setIsTypingUser] = useState(false);
  const [isTypingAssistant, setIsTypingAssistant] = useState(false);
  const [demoStartedAt, setDemoStartedAt] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const startDemo = () => {
    setDemoStartedAt(Date.now());
  };

  // Typewriter for user message (runs when demo starts)
  useEffect(() => {
    if (demoStartedAt === null) return;

    setUserShown(0);
    setAssistantStage(0);
    setAssistantShown(0);
    setIsTypingUser(true);
    setIsTypingAssistant(false);

    const speed = 28; // ms per char
    const timer = setInterval(() => {
      setUserShown(prev => {
        const next = prev + 1;
        if (next >= userMessageFull.length) {
          clearInterval(timer);
          setIsTypingUser(false);
          // Petitte pause avant la réponse IA
          setTimeout(() => setIsTypingAssistant(true), 300);
        }
        return Math.min(next, userMessageFull.length);
      });
    }, speed);

    return () => clearInterval(timer);
  }, [demoStartedAt]);

  // Typewriter for assistant message, segment by segment
  useEffect(() => {
    if (!isTypingAssistant) return;
    if (assistantStage >= assistantSegments.length) {
      setIsTypingAssistant(false);
      return;
    }

    setAssistantShown(0);
    const segment = assistantSegments[assistantStage];
    const speed = 22; // ms per char
    const timer = setInterval(() => {
      setAssistantShown(prev => {
        const next = prev + 1;
        if (next >= segment.length) {
          clearInterval(timer);
          // pause before next segment
          setTimeout(() => setAssistantStage(s => s + 1), 250);
        }
        return Math.min(next, segment.length);
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isTypingAssistant, assistantStage]);

  // Start on each entry into viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let wasIntersecting = false;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting && !wasIntersecting) {
            startDemo();
          }
          wasIntersecting = entry.isIntersecting;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("title")} <br />
              <span className="text-[var(--biloki-blue)]">{t("titleHighlight")}</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              {t("description")}
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {(['instant', 'anomaly'] as const).map((key) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--biloki-blue)] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t(`features.${key}.title`)}</h3>
                    <p className="text-gray-600 text-sm">
                      {t(`features.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {/* Bouton retiré selon la demande (rejouer la démo) */}
          </div>

          {/* Right: Chat Interface Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--biloki-blue)] rounded-full flex items-center justify-center p-2">
                    <img src="/logos/logo.svg" alt="Biloki" className="w-full h-full" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t("chat.botName")}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {t("chat.status")}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-semibold">● {t("chat.online")}</div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 bg-gray-50 min-h-[300px]">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[var(--biloki-blue)] text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm">
                      {userMessageFull.slice(0, userShown)}
                      {isTypingUser && <span className="inline-block w-[1px] h-[1.1em] align-middle bg-white ml-0.5 animate-pulse" />}
                    </p>
                  </div>
                </div>

                {/* Bot Message */}
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                  <div className="bg-[var(--biloki-blue)] text-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    {/* Segment 0 */}
                    {assistantStage >= 0 && (
                      <p className="text-sm mb-2">
                        {assistantStage === 0
                          ? assistantSegments[0].slice(0, assistantShown)
                          : assistantSegments[0]}
                      </p>
                    )}
                    {/* Segment 1 */}
                    {assistantStage >= 1 && (
                      <p className="text-sm mb-2">
                        {assistantStage === 1
                          ? assistantSegments[1].slice(0, assistantShown)
                          : assistantSegments[1]}
                      </p>
                    )}
                    {/* Segment 2 (code block) */}
                    {assistantStage >= 2 && (
                      <div className="bg-white text-[var(--biloki-blue)] rounded-lg px-3 py-2 font-mono text-sm font-bold mb-2">
                        {assistantStage === 2
                          ? assistantSegments[2].slice(0, assistantShown)
                          : assistantSegments[2]}
                      </div>
                    )}
                    {/* Segment 3 */}
                    {assistantStage >= 3 && (
                      <p className="text-sm">
                        {assistantStage === 3
                          ? assistantSegments[3].slice(0, assistantShown)
                          : assistantSegments[3]}
                      </p>
                    )}
                    {/* Typing indicator */}
                    {isTypingAssistant && (
                      <div className="mt-2 flex items-center gap-1 opacity-80">
                        <span className="inline-block w-1 h-1 bg-white rounded-full animate-bounce"></span>
                        <span className="inline-block w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.1s]"></span>
                        <span className="inline-block w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 flex-wrap pt-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-xs hover:bg-gray-50 transition">
                    {t("chat.quickDoor")}
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-xs hover:bg-gray-50 transition">
                    {t("chat.quickCheckout")}
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-xs hover:bg-gray-50 transition">
                    {t("chat.quickRestaurants")}
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-[var(--biloki-blue)] p-4">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={t("chat.placeholder")}
                    className="flex-1 outline-none text-gray-700 text-sm"
                    disabled
                  />
                  <button className="w-8 h-8 bg-[var(--biloki-blue)] rounded-lg flex items-center justify-center text-white hover:opacity-90 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
