'use client';

import { useRef, useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import WebappLink from "@/components/ui/WebappLink";
import CanvaGlassFrame from "@/components/ui/CanvaGlassFrame";
import { locales, type Locale } from "@/lib/i18n/config";
import { MEGA_FEATURE_ITEMS } from "@/lib/header-footer-config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const partnersHeading = document.getElementById('partners-heading');

      if (partnersHeading) {
        const triggerTop = partnersHeading.getBoundingClientRect().top;
        const headerOffset = window.innerWidth >= 768 ? 120 : 84;
        setScrolled(triggerTop <= headerOffset);
        return;
      }

      const heroSection = document.getElementById('hero-section');

      if (!heroSection) {
        setScrolled(window.scrollY > 40);
        return;
      }

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const headerOffset = window.innerWidth >= 768 ? 110 : 72;
      setScrolled(heroBottom <= headerOffset);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, []);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [, startTransition] = useTransition();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const mobileLanguageRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  
  // Extraire la locale depuis le pathname (ex: /fr/tarifs -> fr)
  const pathLocale = pathname.split('/')[1] as Locale;
  const locale = locales.includes(pathLocale) ? pathLocale : 'fr';
  const normalizedPathname = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
  const isHomePage = normalizedPathname === '/' || normalizedPathname === `/${locale}`;
  const useSolidHeader = !isHomePage || scrolled;

  const withLocale = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }
    if (href === '/') {
      return `/${locale}`;
    }
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
      return href;
    }
    return `/${locale}${href}`;
  };

  // Fermer les dropdowns quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Fermer le dropdown de langue desktop
      if (languageRef.current && !languageRef.current.contains(target)) {
        setIsLanguageOpen(false);
      }

      // Fermer le méga-menu desktop
      if (featuresRef.current && !featuresRef.current.contains(target)) {
        setIsFeaturesOpen(false);
      }
      
      // Fermer le dropdown de langue mobile
      if (mobileLanguageRef.current && !mobileLanguageRef.current.contains(target)) {
        setMobileLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Utiliser la configuration partagée avec le Footer
  const megaFeatureItems = MEGA_FEATURE_ITEMS;

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    // Effacer la sélection de texte
    if (typeof window !== 'undefined' && window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }

    // Sauvegarder la position de scroll actuelle
    const scrollPosition = window.scrollY;

    startTransition(() => {
      // Construire le nouveau chemin avec le préfixe de locale
      // Regex dynamique pour toutes les locales supportées
      const localePattern = new RegExp(`^/(${locales.join('|')})`);
      const newPath = `/${nextLocale}${pathname.replace(localePattern, '')}`;
      router.replace(newPath, { scroll: false });
      
      // Restaurer la position de scroll après la navigation
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    });

    setIsLanguageOpen(false);
    setMobileLanguageOpen(false);
  };

  const languageLabel = locale.toUpperCase();
  const promoMessages = [
    t("promo.annualDiscount"),
    t("promo.onboardingSupport"),
    t("promo.freeTrial"),
  ];

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsFeaturesOpen(false);
    }, 220);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsFeaturesOpen(true);
  };

  const handleFeaturesToggle = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsFeaturesOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    document.body.style.overflow = '';
    return undefined;
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Barre Se connecter avec défilement promo */}
      <style>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .scrolling-text {
          animation: scroll-text 12s linear infinite;
          display: flex;
          width: fit-content;
        }
        .scrolling-text span {
          white-space: nowrap;
          padding-right: 3rem;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
        }
      `}</style>
      <div className="hidden md:flex relative w-full bg-green-600 items-center justify-center px-4 py-3">
        <div className="w-1/2 overflow-hidden">
          <div className="scrolling-text">
            {promoMessages.map((message, index) => (
              <span key={`promo-a-${index}`}>{message}</span>
            ))}
            {promoMessages.map((message, index) => (
              <span key={`promo-b-${index}`}>{message}</span>
            ))}
            {promoMessages.map((message, index) => (
              <span key={`promo-c-${index}`}>{message}</span>
            ))}
          </div>
        </div>
        <div className="absolute right-6">
          <WebappLink type="login" className="text-white hover:text-green-200 font-semibold text-sm whitespace-nowrap">
            {t("login")}
          </WebappLink>
        </div>
      </div>

      {/* Header pill centré */}
      <div className="flex justify-center px-3 pt-3 pb-2 md:px-4">
        <header className={`relative rounded-2xl w-full max-w-[320px] md:max-w-none md:w-auto transition-colors duration-300 ${useSolidHeader ? 'bg-primary text-white shadow-lg' : 'bg-white/12 text-white backdrop-blur-xl backdrop-saturate-150 border border-white/35 shadow-[0_14px_34px_rgba(2,10,28,0.28)]'}`}>
        <nav className="h-[64px] md:h-[72px] px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={withLocale("/")} className="-ml-0.5 shrink-0">
          <img
            src={isHomePage && !scrolled ? "/logos/biloki-logo-full.svg" : "/logos/logo-biloki.png"}
            alt="Biloki"
            className={isHomePage && !scrolled ? "h-[40px] md:h-[40px] w-auto" : "h-auto w-[116px] md:w-[132px]"}
            style={isHomePage && !scrolled ? { filter: 'brightness(0) invert(1)' } : {}}
            width={240}
            height={120}
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm ${scrolled ? 'text-white' : 'text-white'}`}>
          <Link href={withLocale("/")} className="hover:opacity-80 transition">
            {t("home")}
          </Link>
          
          {/* Fonctionnalités Mega Menu */}
          <div 
            className="relative"
            ref={featuresRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={handleFeaturesToggle}
              aria-expanded={isFeaturesOpen}
              className="hover:opacity-80 transition flex items-center gap-1"
            >
              {t("features")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`fixed left-1/2 -translate-x-1/2 mt-3 w-[min(1320px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all duration-200 ease-out z-50 ${
                isFeaturesOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{ top: '136px' }}
            >
              <div className="flex min-h-[360px]">
                <div
                  className="w-[26%] rounded-l-xl px-6 py-6 flex flex-col"
                  style={{ backgroundColor: '#01A4FF' }}
                >
                  <div>
                    <h3 className="text-white text-base font-semibold">{t('features')}</h3>
                    <svg
                      className="mt-2 block"
                      width="56"
                      height="10"
                      viewBox="0 0 56 10"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6 C 10 2, 18 10, 26 6 C 34 2, 42 10, 54 6"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-white/95 mt-2 leading-relaxed">
                    {t('megaMenu.tagline')}
                  </p>

                  <div className="mt-2">
                    <img
                      src="/images/Dropdown/Dropdown.jpg"
                      alt="Aperçu Biloki"
                      className="w-full h-48 rounded-xl object-cover object-center shadow-xl ring-1 ring-white/25"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-auto pt-5 flex justify-center">
                    <img
                      src="/logos/logo-icon-white.svg"
                      alt="Biloki"
                      className="h-24 w-24 opacity-80"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="w-[74%] bg-white">
                  <div className="grid grid-cols-3 gap-x-5 gap-y-3 px-6 py-6">
                    {megaFeatureItems.map((item) => (
                      <Link
                        key={item.key}
                        href={withLocale(item.href)}
                        onClick={() => setIsFeaturesOpen(false)}
                        className="group rounded-lg px-2 py-2 hover:bg-blue-50 transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#01A4FF' }}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1D8CE0] leading-relaxed group-hover:text-[#2196F3] transition-colors">
                              {t(`megaMenu.items.${item.key}.hook`)}
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              {t(`megaMenu.items.${item.key}.subtitle`)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center gap-8 text-sm">
                    <Link
                      href={withLocale('/fonctionnalites/reservations')}
                      onClick={() => setIsFeaturesOpen(false)}
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-[#2196F3] transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
                      </svg>
                      {t('megaMenu.viewAllFeatures')} →
                    </Link>
                    <Link
                      href={withLocale('/connexions-api')}
                      onClick={() => setIsFeaturesOpen(false)}
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-[#2196F3] transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10m-3-3l3 3-3 3M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                      </svg>
                      {t('megaMenu.viewIntegrations')} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href={withLocale("/tarifs")} className="hover:opacity-80 transition">
            {t("pricing")}
          </Link>
          <Link href={withLocale("/contact")} className="hover:opacity-80 transition">
            {t("contact")}
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="hover:opacity-80 font-semibold text-sm flex items-center gap-2 user-select-none"
            >
              <span className="text-base">{locale === 'fr' ? '🇫🇷' : locale === 'en' ? '🇬🇧' : locale === 'es' ? '🇪🇸' : '🇵🇹'}</span>
              {languageLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50 user-select-none" onMouseDown={(e) => e.preventDefault()}>
                {locales.map((lang) => {
                  const flags: Record<string, string> = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', pt: '🇵🇹' };
                  return (
                    <button
                      key={lang}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleLocaleChange(lang);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition user-select-none flex items-center gap-2 ${
                        locale === lang
                          ? 'bg-blue-50 text-primary'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                      }`}
                    >
                      <span className="text-base">{flags[lang]}</span>
                      {lang.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Link href={withLocale("/reserver-demo")} className={`hover:opacity-80 font-semibold text-sm ${scrolled ? 'text-white' : 'text-white'}`}>
            {t("demo")}
          </Link>
          <CanvaGlassFrame className="rounded-full">
            <WebappLink type="register" className={`font-semibold py-2 px-4 lg:px-6 rounded-full transition-all inline-block text-sm whitespace-nowrap ${scrolled ? 'text-white hover:text-white/85' : 'text-white hover:text-white/85'}`}>
              {t("trial")}
            </WebappLink>
          </CanvaGlassFrame>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/35 bg-white/10 transition hover:opacity-90 ${scrolled ? 'text-white' : 'text-white'}`}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute left-1/2 top-[calc(100%+0.55rem)] z-50 w-[min(92vw,430px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/25 bg-primary shadow-[0_22px_50px_rgba(2,20,38,0.4)]">
          <div className="max-h-[74vh] overflow-y-auto px-4 py-4 space-y-3">
          <Link href={withLocale("/")} onClick={() => setIsOpen(false)} className="block text-white hover:opacity-80 py-2">
            {t("home")}
          </Link>
          
          {/* Mobile Fonctionnalités */}
          <div className="text-white rounded-xl border border-white/20 bg-white/5 px-2">
            <button
              onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
              className="w-full text-left hover:opacity-80 py-2 flex items-center justify-between font-medium"
            >
              {t("features")}
              <svg 
                className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {mobileFeaturesOpen && (
              <div className="rounded-xl my-2 p-3 space-y-2" style={{ backgroundColor: '#0290d9' }}>
                <div className="space-y-1">
                  {megaFeatureItems.map((item) => (
                    <Link
                      key={item.key}
                      href={withLocale(item.href)}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileFeaturesOpen(false);
                      }}
                      className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-white/10 transition"
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#01A4FF' }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/95 text-sm font-semibold leading-tight">{t(`megaMenu.items.${item.key}.hook`)}</p>
                        <p className="text-white/75 text-xs mt-1 leading-snug">{t(`megaMenu.items.${item.key}.subtitle`)}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-white/25 space-y-1">
                  <Link
                    href={withLocale('/fonctionnalites/reservations')}
                    onClick={() => {
                      setIsOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm text-white hover:opacity-80 px-2 py-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
                    </svg>
                    {t('megaMenu.viewAllFeatures')} →
                  </Link>

                  <Link
                    href={withLocale('/connexions-api')}
                    onClick={() => {
                      setIsOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm text-white hover:opacity-80 px-2 py-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10m-3-3l3 3-3 3M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                    {t('megaMenu.viewIntegrations')} →
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link href={withLocale("/tarifs")} onClick={() => setIsOpen(false)} className="block text-white hover:opacity-80 py-2">
            {t("pricing")}
          </Link>
          <Link href={withLocale("/contact")} onClick={() => setIsOpen(false)} className="block text-white hover:opacity-80 py-2">
            {t("contact")}
          </Link>
          <hr className="border-white border-opacity-20" />
          
          {/* Mobile Language Selector */}
          <div className="text-white rounded-xl border border-white/20 bg-white/5 px-2" ref={mobileLanguageRef}>
            <button
              onClick={() => setMobileLanguageOpen(!mobileLanguageOpen)}
              className="w-full text-left hover:opacity-80 py-2 flex items-center justify-between font-medium user-select-none"
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{locale === 'fr' ? '🇫🇷' : locale === 'en' ? '🇬🇧' : locale === 'es' ? '🇪🇸' : '🇵🇹'}</span>
                {languageLabel}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${mobileLanguageOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {mobileLanguageOpen && (
              <div className="pl-4 rounded-xl my-2 py-2 space-y-2 user-select-none" style={{ backgroundColor: '#0290d9' }} onMouseDown={(e) => e.preventDefault()}>
                {locales.map((lang) => {
                  const flags: Record<string, string> = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', pt: '🇵🇹' };
                  return (
                    <button
                      key={lang}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleLocaleChange(lang);
                        setMobileLanguageOpen(false);
                      }}
                      className={`w-full text-left py-2 text-sm transition user-select-none flex items-center gap-2 ${
                        locale === lang
                          ? 'text-white font-semibold'
                          : 'text-white hover:opacity-80'
                      }`}
                    >
                      <span className="text-base">{flags[lang]}</span>
                      {lang.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <hr className="border-white border-opacity-20" />
          <Link href={withLocale("/reserver-demo")} onClick={() => setIsOpen(false)} className="block text-white hover:opacity-80 py-2 font-semibold">
            {t("demo")}
          </Link>
          <WebappLink type="login" className="block text-white hover:opacity-80 py-2 font-semibold" onClick={() => setIsOpen(false)}>
            {t("login")}
          </WebappLink>
          <CanvaGlassFrame inline={false} className="rounded-full">
            <WebappLink type="register" className="block w-full text-center text-white font-semibold py-3 rounded-full transition-all" onClick={() => setIsOpen(false)}>
              {t("trial")}
            </WebappLink>
          </CanvaGlassFrame>
          </div>
          </div>
        )}
      </header>
      </div>
    </div>
  );
}
