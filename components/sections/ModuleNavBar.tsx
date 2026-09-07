"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const modules = [
  {
    id: "module-reservations",
    href: "/fonctionnalites/reservations",
    labelKey: "reservations.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5m8 2V5M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "module-messagerie",
    href: "/fonctionnalites/messagerie-unifiee",
    labelKey: "messaging.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 7l3-3H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "module-missions",
    href: "/fonctionnalites/planning-missions",
    labelKey: "missions.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "module-guide-voyageur",
    href: "/fonctionnalites/interface-voyageurs?view=traveler",
    labelKey: "travelerGuide.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5a1.5 1.5 0 0 1-2.4 1.2L15 18.75l-2.6 1.95a1.5 1.5 0 0 1-1.8 0L8 18.75l-2.6 1.95A1.5 1.5 0 0 1 4 19.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h5" />
      </svg>
    ),
  },
  {
    id: "module-ventes-additionnelles",
    href: "/fonctionnalites/ventes-additionnelles",
    labelKey: "addons.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V6a3 3 0 0 1 6 0v1" />
      </svg>
    ),
  },
  {
    id: "module-serrures",
    href: "/fonctionnalites/serrures-connectees",
    labelKey: "locks.label",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v4m-4 4h8a2 2 0 002-2v-3a6 6 0 10-12 0v3a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ModuleNavBar() {
  const tModules = useTranslations("modules");
  const locale = useLocale();

  const withLocale = (href: string) => {
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
      return href;
    }
    return `/${locale}${href}`;
  };

  return (
    <div className="relative z-10 mt-4 px-4 pb-6 sm:px-6 md:-mt-8 md:pb-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-2xl shadow-2xl overflow-hidden bg-transparent border border-white/50"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-sky-200/5" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/45" />
          <div className="pointer-events-none absolute left-3 right-3 top-1 h-8 rounded-full bg-white/14 blur-sm" />
          <div className="relative z-10">
            <div className="md:hidden overflow-x-auto">
              <div className="flex min-w-max snap-x snap-mandatory divide-x divide-white/20">
                {modules.map((mod) => (
                  <Link
                    key={mod.id}
                    href={withLocale(mod.href)}
                    className="group snap-start flex min-h-[90px] min-w-[145px] flex-col items-center justify-center gap-2 px-3 py-4 text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
                  >
                    <span className="transition-colors duration-200 text-white/85 group-hover:text-white">{mod.icon}</span>
                    <span className="text-[11px] font-medium text-center leading-tight whitespace-normal drop-shadow-sm">
                      {tModules(mod.labelKey)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-6 md:divide-x md:divide-white/20">
              {modules.map((mod) => (
                <Link
                  key={mod.id}
                  href={withLocale(mod.href)}
                  className="group flex min-h-[88px] flex-col items-center justify-center gap-2 px-6 py-5 text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
                >
                  <span className="scale-100 transition-colors duration-200 text-white/85 group-hover:text-white">{mod.icon}</span>
                  <span className="text-xs font-medium text-center leading-tight whitespace-normal drop-shadow-sm">
                    {tModules(mod.labelKey)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
