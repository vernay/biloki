"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import CanvaGlassFrame from "@/components/ui/CanvaGlassFrame";
import HandDrawnUnderline from "@/components/ui/HandDrawnUnderline";

interface Module {
  id: number;
  icon: React.ReactNode;
  labelKey: string;
  headerHookKey?: string;
  descriptionKey: string;
  shortDescKey: string;
  bullet1Key: string;
  bullet2Key: string;
  bullet3Key: string;
  imagePath: string;
  mediaType?: "image" | "video";
  ctaHref: string;
}

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1" ry="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
    <path d="M9 7v0m6 0v0"/>
    <path d="M9 7V3h6v4"/>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const MODULES: Module[] = [
  {
    id: 1,
    icon: <CalendarIcon />,
    labelKey: "reservations.label",
    headerHookKey: "reservations.hook",
    descriptionKey: "reservations.description",
    shortDescKey: "reservations.short",
    bullet1Key: "reservations.bullet1",
    bullet2Key: "reservations.bullet2",
    bullet3Key: "reservations.bullet3",
    imagePath: "/images/Page réservation/2.png",
    mediaType: "image",
    ctaHref: "/fonctionnalites/reservations",
  },
  {
    id: 2,
    icon: <MessageIcon />,
    labelKey: "messaging.label",
    headerHookKey: "unifiedMessaging.hook",
    descriptionKey: "messaging.description",
    shortDescKey: "messaging.short",
    bullet1Key: "messaging.bullet1",
    bullet2Key: "messaging.bullet2",
    bullet3Key: "messaging.bullet3",
    imagePath: "/images/Messagerie unifiée/Tout centralisé.svg",
    mediaType: "image",
    ctaHref: "/fonctionnalites/messagerie-unifiee",
  },
  {
    id: 3,
    icon: <ClipboardIcon />,
    labelKey: "missions.label",
    headerHookKey: "planningMissions.hook",
    descriptionKey: "missions.description",
    shortDescKey: "missions.short",
    bullet1Key: "missions.bullet1",
    bullet2Key: "missions.bullet2",
    bullet3Key: "missions.bullet3",
    imagePath: "/images/Page prestataire/Capture d’écran 2026-07-15 à 18.44.15.png",
    ctaHref: "/fonctionnalites/planning-missions",
  },
  {
    id: 4,
    icon: <ChartIcon />,
    labelKey: "statistics.label",
    headerHookKey: "statistics.hook",
    descriptionKey: "statistics.description",
    shortDescKey: "statistics.short",
    bullet1Key: "statistics.bullet1",
    bullet2Key: "statistics.bullet2",
    bullet3Key: "statistics.bullet3",
    imagePath: "/images/modules/Statistiques.MOV",
    mediaType: "video",
    ctaHref: "/fonctionnalites/statistiques",
  },
  {
    id: 5,
    icon: <StarIcon />,
    labelKey: "reviews.label",
    headerHookKey: "reviews.hook",
    descriptionKey: "reviews.description",
    shortDescKey: "reviews.short",
    bullet1Key: "reviews.bullet1",
    bullet2Key: "reviews.bullet2",
    bullet3Key: "reviews.bullet3",
    imagePath: "/images/modules/reviews.mov",
    mediaType: "video",
    ctaHref: "/reserver-demo",
  },
  {
    id: 6,
    icon: <LockIcon />,
    labelKey: "locks.label",
    headerHookKey: "smartLocks.hook",
    descriptionKey: "locks.description",
    shortDescKey: "locks.short",
    bullet1Key: "locks.bullet1",
    bullet2Key: "locks.bullet2",
    bullet3Key: "locks.bullet3",
    imagePath: "/images/serrures/Etape 2.svg",
    ctaHref: "/fonctionnalites/serrures-connectees",
  },
  {
    id: 7,
    icon: <ShoppingBagIcon />,
    labelKey: "addons.label",
    headerHookKey: "additionalSales.hook",
    descriptionKey: "addons.description",
    shortDescKey: "addons.short",
    bullet1Key: "addons.bullet1",
    bullet2Key: "addons.bullet2",
    bullet3Key: "addons.bullet3",
    imagePath: "/images/Section ventes additionnelles/Etape 4.png",
    ctaHref: "/fonctionnalites/ventes-additionnelles",
  },
  {
    id: 8,
    icon: <UsersIcon />,
    labelKey: "team.label",
    descriptionKey: "team.description",
    shortDescKey: "team.short",
    bullet1Key: "team.bullet1",
    bullet2Key: "team.bullet2",
    bullet3Key: "team.bullet3",
    imagePath: "/images/Page prestataire/Capture d’écran 2026-07-15 à 19.02.19.png",
    ctaHref: "/fonctionnalites/planning-missions",
  },
];

export default function InteractiveModulesShowcase() {
  const t = useTranslations("modules");
  const tHeaderItems = useTranslations("header.megaMenu.items");
  const [activeModule, setActiveModule] = useState(0);

  const currentModule = MODULES[activeModule];
  const getDisplayLabel = (module: Module) =>
    module.headerHookKey ? tHeaderItems(module.headerHookKey) : t(module.labelKey);

  return (
    <section className="relative w-full">
      {/* Hero-style section: fixed background + scrolling foreground content */}
      <div className="relative mx-3 mb-8 min-h-[760px] overflow-hidden rounded-2xl sm:mx-4 sm:min-h-[780px] md:mx-6 md:h-[56rem] md:min-h-0 md:rounded-3xl lg:mx-8 lg:h-[980px] xl:mx-12 xl:h-[1040px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        >
          <Image
            src="/images/1%C3%A8re%20page%20photos/pexels-sumeyye-ali-253090551-15790995.webp"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/58 via-black/22 to-black/58" />

        {/* Foreground content scrolls normally over the fixed background */}
        <div className="relative z-20 flex flex-col justify-start">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-5 md:px-6 md:py-12 lg:pt-20 lg:pb-14">
            {/* Section Header */}
            <div className="mb-6 text-center md:mb-8 lg:mb-10">
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto max-w-2xl text-base text-white/75 md:text-lg">
                {t("subtitle")}
              </p>
            </div>

            {/* Mobile tabs: vertical menu */}
            <div className="mx-auto mb-5 flex w-full flex-col gap-3 md:hidden">
              {MODULES.map((module) => {
                return (
                  <Link
                    key={module.id}
                    href={module.ctaHref}
                    className="flex min-h-[72px] w-full items-center justify-between rounded-3xl border border-white/15 bg-white/2 px-5 py-4 text-left text-base font-semibold text-white shadow-[0_6px_16px_rgba(6,12,26,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-200 hover:bg-white/4"
                  >
                    <span className="pr-3 leading-tight drop-shadow-sm">{getDisplayLabel(module)}</span>
                    <svg
                      className="h-5 w-5 text-white/85"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            {/* Desktop tabs */}
            <div className="mx-auto mb-8 hidden max-w-5xl grid-cols-2 gap-3 md:grid lg:mb-10 lg:grid-cols-4">
              {MODULES.map((module, index) => {
                const isActive = activeModule === index;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(index)}
                    onMouseEnter={() => setActiveModule(index)}
                    onFocus={() => setActiveModule(index)}
                    className={`w-full min-h-[56px] flex items-center justify-center gap-2 rounded-full border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-gray-900 border-white shadow-[0_10px_24px_rgba(255,255,255,0.22)]"
                        : "bg-white/8 text-white border-white/45 hover:bg-white/14"
                    }`}
                  >
                    <span className={isActive ? "text-primary" : "text-white/80"}>{module.icon}</span>
                    <span className="text-center leading-tight">{getDisplayLabel(module)}</span>
                  </button>
                );
              })}
            </div>

        {/* Content: left text + right screenshot */}
        <div className="hidden md:block">
        <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Left: text */}
            <CanvaGlassFrame inline={false} className="flex h-full flex-col rounded-[2rem] p-2.5 backdrop-blur sm:rounded-[2.2rem] sm:p-4 lg:rounded-[2.5rem] lg:p-6">
              {/* Inner white panel with padding to show liquid glass border */}
              <div className="flex h-full flex-col rounded-[1.4rem] bg-white p-4 sm:rounded-[1.8rem] sm:p-6 lg:rounded-[2rem] lg:p-8">
                <div className="relative mb-3 inline-block sm:mb-4">
                  <h3 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
                    {getDisplayLabel(currentModule)}
                  </h3>
                  <div className="absolute -bottom-3 left-0 w-full">
                    <HandDrawnUnderline className="w-full" height={14} />
                  </div>
                </div>
                <p className="mb-6 mt-5 text-sm leading-relaxed text-black/75 sm:mb-8 sm:text-base">
                  <span className="sm:hidden">{t(currentModule.shortDescKey)}</span>
                  <span className="hidden sm:inline">{t(currentModule.descriptionKey)}</span>
                </p>

                {/* Bullet points */}
                <ul className="mb-7 space-y-2.5 sm:mb-8 sm:space-y-3">
                  {[currentModule.bullet1Key, currentModule.bullet2Key, currentModule.bullet3Key].map((key, index) => (
                    <li key={key} className={index === 2 ? "hidden items-start gap-3 sm:flex" : "flex items-start gap-3"}>
                      <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary/30 text-primary border border-primary/50 flex-shrink-0">
                        <CheckIcon />
                      </span>
                      <span className="text-sm leading-relaxed text-black/85">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href={currentModule.ctaHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#01A4FF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0194e6] hover:shadow-md"
                  >
                    En savoir plus
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </CanvaGlassFrame>
            {/* Right: screenshot card */}
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/55 bg-transparent p-3 backdrop-blur sm:rounded-[2.2rem] sm:p-4 lg:rounded-[2.5rem] lg:p-6">
                {currentModule.mediaType === "video" ? (
                  <div className="flex-1 overflow-hidden rounded-[1.6rem] bg-black sm:rounded-[1.8rem] lg:rounded-[2rem]">
                    <video
                      src={currentModule.imagePath}
                      className="w-full h-full object-contain object-center"
                      controls
                      preload="metadata"
                      muted
                      loop
                      playsInline
                    />
                  </div>
                ) : (
                  <div className="flex-1 overflow-hidden rounded-[1.6rem] bg-white p-2 sm:rounded-[1.8rem] sm:p-3 lg:rounded-[2rem]">
                    <div className="relative w-full h-full">
                      <Image
                        src={currentModule.imagePath}
                        alt={getDisplayLabel(currentModule)}
                        fill
                        className="object-contain object-center"
                        unoptimized
                        sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
