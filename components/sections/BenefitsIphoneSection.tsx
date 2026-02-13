"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CardRef = HTMLDivElement | null;

export default function BenefitsIphoneSection() {
  const tBenefits = useTranslations("benefits");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const finalTitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<CardRef[]>([]);

  const benefitKeys = useMemo(() => ["time", "revenue", "star", "money"] as const, []);

  // Icônes personnalisées par bénéfice
  const iconMap: Record<string, React.ReactNode> = {
    time: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    revenue: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    star: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    money: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  };

  // Coins arrondis par position pour former un iPhone
  // haut-gauche: coins ext TL, haut-droite: coins ext TR, etc.
  const cardRounding = [
    "rounded-tl-[2.8rem] rounded-tr-lg rounded-bl-lg rounded-br-lg",
    "rounded-tr-[2.8rem] rounded-tl-lg rounded-bl-lg rounded-br-lg",
    "rounded-bl-[2.8rem] rounded-tl-lg rounded-tr-lg rounded-br-lg",
    "rounded-br-[2.8rem] rounded-tl-lg rounded-tr-lg rounded-bl-lg"
  ];

  // Taille des cartes
  const CARD_W = 158;
  const CARD_H = 248;
  const GAP = 6;

  // Taille du mockup iPhone (même taille que les cartes assemblées)
  const PHONE_W = CARD_W * 2 + GAP;
  const PHONE_H = CARD_H * 2 + GAP;

  // Positions des cartes : end = collées en forme d'iPhone
  const cardPositions = [
    { start: { x: -350, y: -220 }, end: { x: -(CARD_W / 2 + GAP / 2), y: -(CARD_H / 2 + GAP / 2) } },
    { start: { x: 350, y: -220 }, end: { x:  (CARD_W / 2 + GAP / 2), y: -(CARD_H / 2 + GAP / 2) } },
    { start: { x: -350, y:  220 }, end: { x: -(CARD_W / 2 + GAP / 2), y:  (CARD_H / 2 + GAP / 2) } },
    { start: { x: 350, y:  220 }, end: { x:  (CARD_W / 2 + GAP / 2), y:  (CARD_H / 2 + GAP / 2) } }
  ];

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        // État initial
        cards.forEach((card, i) => {
          gsap.set(card, { x: cardPositions[i].start.x, y: cardPositions[i].start.y, opacity: 1, scale: 1 });
        });
        gsap.set(phoneRef.current, { opacity: 0, scale: 0.5 });
        gsap.set(titleRef.current, { opacity: 1, y: 0 });
        gsap.set(finalTitleRef.current, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 0.8,
            pin: sectionRef.current,
            pinSpacing: true,
            anticipatePin: 1
          }
        });

        // 0→0.35 : cartes se rapprochent pour former l'iPhone
        cards.forEach((card, i) => {
          tl.to(card, {
            x: cardPositions[i].end.x,
            y: cardPositions[i].end.y,
            ease: "power2.inOut",
            duration: 0.35
          }, 0);
        });

        // 0.35→0.5 : titre disparait
        tl.to(titleRef.current, {
          opacity: 0,
          y: -20,
          ease: "power2.out",
          duration: 0.15
        }, 0.35);

        // 0.5→0.65 : cartes disparaissent
        cards.forEach((card) => {
          tl.to(card, {
            opacity: 0,
            scale: 0.95,
            ease: "power2.inOut",
            duration: 0.1
          }, 0.45);
        });

        // 0.45→0.75 : iPhone apparait petit puis zoome
        tl.to(phoneRef.current, {
          opacity: 1,
          scale: 3.2,
          ease: "power2.out",
          duration: 0.35
        }, 0.45);

        // 0.5→0.7 : titre final apparait
        tl.to(finalTitleRef.current, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.2
        }, 0.5);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Version mobile - statique, en dehors du wrapper GSAP */}
      <div className="block md:hidden py-12 px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {tBenefits("title")} <span className="text-primary">{tBenefits("titleHighlight")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {benefitKeys.map((key, index) => (
              <div
                key={key}
                className={`bg-primary p-5 flex flex-col justify-center items-center ${cardRounding[index]}`}
              >
                <div className="text-white/80 mb-2">
                  {iconMap[key]}
                </div>
                <h3 className="text-sm font-bold text-white text-center leading-tight">
                  {tBenefits(`items.${key}.title`)}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-[220px]">
              <img
                src="/images/interfaces/Animation-iphone.svg"
                alt="Biloki app"
                className="w-full h-auto drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p className="text-center text-xl font-bold text-primary">
            {tBenefits("finalTitle")}
          </p>
        </div>
      </div>

      {/* Version desktop - animation GSAP */}
      <div ref={wrapperRef} className="hidden md:block">
        <div ref={sectionRef} className="h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="relative h-[700px]">

              {/* Titre au centre des 4 cartes */}
              <div
                ref={titleRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none whitespace-nowrap"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  {tBenefits("title")} <span className="text-primary">{tBenefits("titleHighlight")}</span>
                </h2>
              </div>

              {/* Les 4 cartes - forment un iPhone */}
              {benefitKeys.map((key, index) => (
                <div
                  key={key}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-6 flex flex-col justify-center items-center shadow-lg ${cardRounding[index]}`}
                  style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
                >
                  <div className="text-white/80 mb-3">
                    {iconMap[key]}
                  </div>
                  <h3 className="text-lg font-bold text-white text-center leading-tight">
                    {tBenefits(`items.${key}.title`)}
                  </h3>
                </div>
              ))}

              {/* Titre final avec l'iPhone */}
              <div
                ref={finalTitleRef}
                className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
                style={{ top: "0%" }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary whitespace-nowrap">
                  {tBenefits("finalTitle")}
                </h2>
              </div>

              {/* iPhone SVG */}
              <div
                ref={phoneRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: `${PHONE_W}px`, height: `${PHONE_H}px` }}
              >
                <img
                  src="/images/interfaces/Animation-iphone.svg"
                  alt="Biloki app"
                  className="h-full w-full object-contain drop-shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
