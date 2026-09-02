"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

type StoryStep = {
  number: number;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
};

const CANONICAL_SCROLL_IMAGES_BY_NAMESPACE: Record<string, string[]> = {
  'featureSections.additionalSalesScrollStory': [
    '/images/Section ventes additionnelles/Etape 1.png',
    '/images/Section ventes additionnelles/Etape 2.png',
    '/images/Section ventes additionnelles/Etape 4.png',
    '/images/Section ventes additionnelles/Etape 3.png',
    '/images/Section ventes additionnelles/Etape 5.png',
  ],
  'featureSections.reservationsScrollStory': [
    '/images/Page réservation/1.png',
    '/images/Page réservation/2.png',
    '/images/Page réservation/3.png',
    '/images/Page réservation/4.png',
    '/images/Page réservation/1.png',
  ],
  'featureSections.unifiedMessagingScrollStory': [
    '/images/Messagerie unifiée/Tout centralisé.svg',
    '/images/Messagerie unifiée/Contexte sous les yeux.png',
    '/images/Messagerie unifiée/TEMPLATE AUTOMATIQUE.png',
    '/images/Messagerie unifiée/Equipe.jpg',
    '/images/Messagerie unifiée/Retrouvez tout en une seconde.jpg',
  ],
  'featureSections.ownerInterfaceScrollStory': [
    '/images/Interface propriétaire/Tableau de bord.png',
    '/images/Interface propriétaire/Rôles et permissions propriétaire.png',
    '/images/Interface propriétaire/Gestion des prix.png',
    '/images/Interface propriétaire/Connexion propriétaire.png',
    '/images/Interface propriétaire/Compte proprio crée.png',
  ],
  'featureSections.scrollStory': [
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 18.47.57.png',
    '/images/Page prestataire/Capture d’écran 2026-07-27 à 11.11.35.png',
    '/images/Page prestataire/Capture d’écran 2026-07-16 à 09.39.31.png',
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 19.02.01.png',
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 19.25.19.png',
  ],
  'featureSections.planningMissionsScrollStory': [
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 18.47.57.png',
    '/images/Page prestataire/Capture d’écran 2026-07-27 à 11.11.35.png',
    '/images/Page prestataire/Capture d’écran 2026-07-16 à 09.39.31.png',
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 19.02.01.png',
    '/images/Page prestataire/Capture d’écran 2026-07-15 à 19.25.19.png',
  ],
  'featureSections.statisticsScrollStory': [
    "/images/Page statistiques/Vue d'ensemble.png",
    '/images/Page statistiques/Revenu.png',
    "/images/Page statistiques/Taux d'occupation.png",
    '/images/Page statistiques/Antiicper votre activité.png',
    '/images/Page statistiques/Nuitée par plateforme.png',
  ],
  'featureSections.smartLocksScrollStory': [
    '/images/serrures/Etape 1.png',
    '/images/serrures/Etape 2.svg',
    '/images/serrures/Etape 3.png',
    '/images/serrures/Parcours hébergement 2.svg',
    '/images/serrures/Etape 2.svg',
  ],
};

const STATISTICS_BACKDROP_IMAGES = [
  '/images/Page statistiques/pexels-jonathanborba-3255245.jpg',
  '/images/Page statistiques/pexels-monstera-1173651.jpg',
  '/images/Page statistiques/pexels-taryn-elliott-4112236.jpg',
  '/images/Page statistiques/pexels-taryn-elliott-4112236.jpg',
  '/images/Page statistiques/pexels-wendywei-2959583.jpg',
];

const PLANNING_MISSIONS_BACKDROP_IMAGES = [
  '/images/Page prestataire/johannes-andersson-UCd78vfC8vU-unsplash.jpg',
  '/images/Page prestataire/pietro-de-grandi-Q5dMq3cKqec-unsplash.jpg',
  '/images/Page prestataire/ricardo-frantz-D9lDqguxy4Y-unsplash.jpg',
  '/images/Page prestataire/sam-ferrara-dKJXkKCF2D8-unsplash.jpg',
  '/images/Page prestataire/alessio-furlan-Vw3a0HgE7AM-unsplash.jpg',
];

const UNIFIED_MESSAGING_BACKDROP_IMAGES = [
  '/images/Messagerie unifiée/evgeniya-ivchenko-pet9WfLXbt4-unsplash.jpg',
  '/images/Messagerie unifiée/alec-krum-Hl3fvUU48Lw-unsplash.jpg',
  '/images/Messagerie unifiée/kelly-sikkema-qpHXDG_rVlc-unsplash.jpg',
  '/images/Messagerie unifiée/kevs-vO1evxrCPFE-unsplash.jpg',
  '/images/Messagerie unifiée/jazmin-wong-Q0GRwR2-hgY-unsplash.jpg',
];

const clampIndex = (value: number, max: number) => {
  if (value < 0) return 0;
  if (value > max) return max;
  return value;
};

function withLocale(locale: string, href: string): string {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href}`;
}

type ScrollStorySectionProps = {
  namespace?: string;
  backdropVariant?: 'planningMissions' | 'unifiedMessaging';
};

export default function ScrollStorySection({ namespace = 'featureSections.scrollStory', backdropVariant }: ScrollStorySectionProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const pathname = usePathname();
  const shouldContainStepImages =
    namespace === 'featureSections.additionalSalesScrollStory' ||
    namespace === 'featureSections.reservationsScrollStory' ||
    namespace === 'featureSections.unifiedMessagingScrollStory' ||
    namespace === 'featureSections.statisticsScrollStory' ||
    namespace === 'featureSections.scrollStory' ||
    namespace === 'featureSections.planningMissionsScrollStory' ||
    namespace === 'featureSections.ownerInterfaceScrollStory' ||
    namespace === 'featureSections.smartLocksScrollStory';
  const sectionRef = useRef<HTMLElement | null>(null);
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const rawSteps = t.raw('steps') as StoryStep[];
  const canonicalImages = CANONICAL_SCROLL_IMAGES_BY_NAMESPACE[namespace];
  const steps = rawSteps.map((step, idx) => ({
    ...step,
    imageSrc: canonicalImages?.[idx] ?? step.imageSrc,
    imageClassName:
      namespace === 'featureSections.smartLocksScrollStory' && idx === 1
        ? 'scale-[1.2] md:scale-[1.24]'
        : namespace === 'featureSections.smartLocksScrollStory' && idx === 4
          ? 'scale-[1.12] md:scale-[1.16]'
        : namespace === 'featureSections.unifiedMessagingScrollStory' && (idx === 3 || idx === 4)
          ? '!object-contain object-center bg-white p-2 md:p-3'
        : step.imageClassName,
  }));
  const sectionTitle = t.has('title') ? t('title') : null;
  const sectionDescription = t.has('description') ? t('description') : null;
  const showStepMetaPrefix = t.has('showStepMetaPrefix') ? Boolean(t.raw('showStepMetaPrefix')) : true;
  const reservationsBackdropSources = [
    "/images/Page réservation/aniket-deole-M6XC789HLe8-unsplash.jpg",
    "/images/Page réservation/cristina-gottardi-CSpjU6hYo_0-unsplash.jpg",
    "/images/Page réservation/garrett-parker-DlkF4-dbCOU-unsplash.jpg",
    "/images/Page réservation/johannes-plenio-RwHv7LgeC7s-unsplash.jpg",
    "/images/Page réservation/masaaki-komori-6EfKUoRTe8I-unsplash.jpg",
  ];

  const renderStepMeta = (step: StoryStep) => {
    if (!showStepMetaPrefix) {
      return step.label;
    }

    return `${t('stepPrefix')} ${step.number} · ${step.label}`;
  };

  const syncActiveStepFromViewport = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!isDesktopViewport) return;
    if (steps.length === 0) return;

    const section = sectionRef.current;
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
      return;
    }

    let candidate = activeIndex;
    let bestDistance = Number.POSITIVE_INFINITY;
    const targetLine = window.innerHeight * 0.42;

    articleRefs.current.forEach((article, idx) => {
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleFocusLine = rect.top + rect.height * 0.35;
      const distance = Math.abs(articleFocusLine - targetLine);

      if (distance < bestDistance) {
        bestDistance = distance;
        candidate = idx;
      }
    });

    const nextIndex = clampIndex(candidate, steps.length - 1);
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  }, [activeIndex, isDesktopViewport, steps.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktopViewport(media.matches);
    syncViewport();

    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;
    if (!isDesktopViewport) return;

    let frameId: number | null = null;

    const scheduleSync = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        syncActiveStepFromViewport();
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleSync();
      }
    };

    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });
    window.addEventListener("pageshow", scheduleSync);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isDesktopViewport, pathname, prefersReducedMotion, syncActiveStepFromViewport]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isDesktopViewport) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) return;

        const nextIndex = Number(visibleEntries[0].target.getAttribute("data-step-index"));
        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(clampIndex(nextIndex, steps.length - 1));
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-18% 0px -38% 0px",
      }
    );

    articleRefs.current.forEach((article) => {
      if (article) {
        observer.observe(article);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isDesktopViewport, pathname, prefersReducedMotion, steps.length]);

  useEffect(() => {
    if (isDesktopViewport) return;
    setActiveIndex(0);
  }, [isDesktopViewport]);
  const hasSteps = steps.length > 0;
  if (!hasSteps) {
    return null;
  }

  const safeActiveIndex = clampIndex(activeIndex, steps.length - 1);
  const activeStep = steps[safeActiveIndex];
  const visualBackdropSrc =
    namespace === "featureSections.reservationsScrollStory"
      ? reservationsBackdropSources[safeActiveIndex] ?? reservationsBackdropSources[0]
      : namespace === "featureSections.statisticsScrollStory"
        ? STATISTICS_BACKDROP_IMAGES[safeActiveIndex] ?? STATISTICS_BACKDROP_IMAGES[0]
      : backdropVariant === "planningMissions"
        ? PLANNING_MISSIONS_BACKDROP_IMAGES[safeActiveIndex] ?? PLANNING_MISSIONS_BACKDROP_IMAGES[0]
      : backdropVariant === "unifiedMessaging"
        ? UNIFIED_MESSAGING_BACKDROP_IMAGES[safeActiveIndex] ?? UNIFIED_MESSAGING_BACKDROP_IMAGES[0]
      : "/images/Page réservation/Image de fond .jpg";
  const backdropFrameHeightClassName = "lg:h-[calc(100vh-23rem)] lg:min-h-[350px]";
  const insetCardWrapperClassName = "w-full max-w-[520px] rounded-[28px] border border-white/50 bg-white/22 p-2 shadow-[0_25px_55px_rgba(15,23,42,0.25)] backdrop-blur-xl md:max-w-[560px] md:p-3 lg:max-w-[500px] xl:max-w-[540px]";
  const insetCardImageHeightClassName = "h-72 w-full md:h-[20rem] lg:h-[390px] xl:h-[420px]";

  const handleStepClick = (idx: number) => {
    setActiveIndex(idx);
    const target = articleRefs.current[idx];
    if (!target) return;

    const stickyOffset = 260;
    const nextTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
    window.scrollTo({
      top: nextTop,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Reduced-motion mode: no sticky, no timeline animation, simple sequential layout.
  if (prefersReducedMotion) {
    return (
      <section ref={sectionRef} className="bg-white px-4 py-16 text-slate-900 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          {sectionTitle || sectionDescription ? (
            <div className="mx-auto mb-10 max-w-4xl text-center">
              {sectionTitle ? (
                <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  {sectionTitle}
                </h2>
              ) : null}
              {sectionDescription ? (
                <p className="mt-4 text-lg leading-relaxed text-slate-600 md:text-xl">
                  {sectionDescription}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mb-8 flex flex-wrap gap-2">
            {steps.map((step) => (
              <span
                key={step.number}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold"
              >
                {step.number}. {step.label}
              </span>
            ))}
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
              >
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  className={[
                    "h-56 w-full md:h-72",
                    shouldContainStepImages ? "object-contain bg-white" : "object-cover",
                    step.imageClassName ?? "",
                  ].join(" ")}
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                      {renderStepMeta(step)}
                  </p>
                  <h3 className="mt-3 text-2xl font-black md:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-white px-4 py-16 text-slate-900 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {sectionTitle || sectionDescription ? (
          <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
            {sectionTitle ? (
              <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                {sectionTitle}
              </h2>
            ) : null}
            {sectionDescription ? (
              <p className="mt-4 text-lg leading-relaxed text-slate-600 md:text-xl">
                {sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="md:hidden">
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isOpen = mobileOpenIndex === idx;
              return (
                <div
                  key={`mobile-step-${step.number}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setMobileOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                  >
                    <span className="text-base font-semibold text-slate-900">
                      {step.number}. {step.label}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-500"
                    >
                      <IconChevronRight className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-4 pb-5 pt-4">
                          <div className="overflow-hidden rounded-2xl bg-slate-100">
                            <img
                              src={step.imageSrc}
                              alt={step.imageAlt}
                              className={[
                                "h-48 w-full",
                                shouldContainStepImages ? "object-contain bg-white" : "object-cover",
                                step.imageClassName ?? "",
                              ].join(" ")}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <p className="mt-4 text-base leading-relaxed text-slate-600">
                            {step.description}
                          </p>
                          <div className="mt-5">
                            <Link
                              href={withLocale(locale, '/commencer-gratuitement')}
                              className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)]"
                            >
                              <span>{t('ctaPrimary')}</span>
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/14 text-lg leading-none text-white">
                                →
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="sticky top-[9.75rem] z-30 mb-7 md:mb-8">
            <div className="mx-auto flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full bg-white/95 px-2 py-1 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur">
              {steps.map((step, idx) => {
                const isActive = idx === safeActiveIndex;
                return (
                  <motion.button
                    key={step.number}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    aria-current={isActive ? "step" : undefined}
                    layout
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={[
                      "flex h-10 cursor-pointer items-center rounded-full border px-2.5 outline-none focus:outline-none focus-visible:outline-none",
                      isActive ? "border-primary/35 bg-primary/10" : "border-slate-200 bg-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                        isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-700",
                      ].join(" ")}
                    >
                      {step.number}
                    </span>
                    <AnimatePresence initial={false} mode="wait">
                      {isActive ? (
                        <motion.span
                          key={`label-${step.number}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="ml-2 pr-2 whitespace-nowrap text-sm font-semibold text-slate-800"
                        >
                          {step.label}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 pt-3 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="lg:sticky lg:top-[14.5rem] lg:self-start">
              <div
                className={[
                  "relative overflow-hidden rounded-[36px] border border-slate-200 bg-slate-100",
                  backdropFrameHeightClassName,
                ].join(" ")}
              >
                <img
                  src={visualBackdropSrc}
                  alt={t('backgroundAlt')}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/15" />

                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                  <div className={insetCardWrapperClassName}>
                    <div className="overflow-hidden rounded-[22px] border border-white/60 bg-white/90">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeStep.imageSrc}
                          src={activeStep.imageSrc}
                          alt={activeStep.imageAlt}
                          className={[
                            insetCardImageHeightClassName,
                            shouldContainStepImages ? "object-contain bg-white" : "object-cover",
                            activeStep.imageClassName ?? "",
                          ].join(" ")}
                          initial={{ opacity: 0, scale: 1.015 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.985 }}
                          transition={{ duration: 0.38, ease: "easeOut" }}
                          loading="lazy"
                          decoding="async"
                        />
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-8 lg:space-y-10">
              {steps.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <article
                    key={`rail-${step.number}`}
                    ref={(el) => {
                      articleRefs.current[idx] = el;
                    }}
                    data-step-index={idx}
                    className={[
                      "min-h-[78vh] scroll-mt-56 px-2 py-7 transition-all duration-300 md:scroll-mt-64 md:px-4 md:py-9 lg:scroll-mt-72",
                      isActive ? "opacity-100 blur-0" : "opacity-20 blur-[1px]",
                    ].join(" ")}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                      {renderStepMeta(step)}
                    </p>
                    <AnimatePresence initial={false} mode="wait">
                      {isActive ? (
                        <motion.h4
                          key={`title-${step.number}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-3 max-w-xl text-4xl font-black leading-[1.05] md:text-6xl"
                        >
                          {step.title}
                        </motion.h4>
                      ) : (
                        <h4 className="mt-3 max-w-xl text-4xl font-black leading-[1.05] md:text-6xl">
                          {step.title}
                        </h4>
                      )}
                    </AnimatePresence>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg md:leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-8">
                      <Link
                        href={withLocale(locale, '/commencer-gratuitement')}
                        className="inline-flex items-center gap-0"
                      >
                        <span className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.01]">
                          {t('ctaPrimary')}
                        </span>
                        <span className="-ml-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white transition-transform duration-200 hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
