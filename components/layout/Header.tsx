'use client';

import { useRef, useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";
import WebappLink from "@/components/ui/WebappLink";
import { FEATURES } from "@/lib/features-config";
import { locales, type Locale } from "@/lib/i18n/config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileExpandedFeatureItem, setMobileExpandedFeatureItem] = useState<string | null>(null);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [, startTransition] = useTransition();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const mobileLanguageRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  
  // Extraire la locale depuis le pathname (ex: /fr/tarifs -> fr)
  const pathLocale = pathname.split('/')[1] as Locale;
  const locale = locales.includes(pathLocale) ? pathLocale : 'fr';

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

  // Mapping des IDs vers les clés de traduction
  const getFeatureLabel = (id: string): string => {
    const labelMap: Record<string, string> = {
      'pms': t('featuresMenu.pms'),
      'channel-manager': t('featuresMenu.channelManager'),
      'serrures-connectees': t('featuresMenu.smartLocks'),
      '4-interfaces': t('featuresMenu.fourInterfaces'),
      'marketplace-api': t('featuresMenu.marketplaceApi'),
    };
    return labelMap[id] || id;
  };

  const getSubItemLabel = (href: string): string => {
    const labelMap: Record<string, string> = {
      '/fonctionnalites/channel-manager/calendriers': t('featuresMenu.calendarSync'),
      '/fonctionnalites/channel-manager/ota': t('featuresMenu.otaConnections'),
      '/fonctionnalites/channel-manager/tarifs': t('featuresMenu.pricing'),
    };
    return labelMap[href] || href;
  };

  // Utilise maintenant les features depuis la config centralisée
  const featuresMenu = FEATURES;

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

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsFeaturesOpen(false);
      setExpandedItem(null);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsFeaturesOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo className="h-20 md:h-24 w-auto" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white text-sm">
          <Link href={withLocale("/")} className="hover:opacity-80 transition">
            {t("home")}
          </Link>
          
          {/* Fonctionnalités Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:opacity-80 transition flex items-center gap-1">
              {t("features")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFeaturesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {featuresMenu.map((item) => (
                  <div key={item.href} className="relative group">
                    {item.subItems ? (
                      <div
                        onMouseEnter={() => setExpandedItem(item.id)}
                        onMouseLeave={() => setExpandedItem(null)}
                      >
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <Link
                            href={withLocale(item.href)}
                            className="text-gray-700 hover:text-primary transition text-sm font-medium"
                          >
                            {getFeatureLabel(item.id)}
                          </Link>
                          <svg 
                            className="w-4 h-4 text-gray-500"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        {expandedItem === item.id && (
                          <div 
                            className="absolute left-full top-0 ml-1 w-72 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50"
                            onMouseEnter={() => setExpandedItem(item.id)}
                            onMouseLeave={() => setExpandedItem(null)}
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={withLocale(subItem.href)}
                                className="block px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-primary transition text-sm"
                              >
                                {getSubItemLabel(subItem.href)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={withLocale(item.href)}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-primary transition text-sm font-medium"
                      >
                        {getFeatureLabel(item.id)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
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
              className="text-white hover:opacity-80 font-semibold text-sm flex items-center gap-1 user-select-none"
            >
              {languageLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50 user-select-none" onMouseDown={(e) => e.preventDefault()}>
                {locales.map((lang) => (
                  <button
                    key={lang}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleLocaleChange(lang);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition user-select-none ${
                      locale === lang
                        ? 'bg-blue-50 text-primary'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href={withLocale("/reserver-demo")} className="text-white hover:opacity-80 font-semibold text-sm">
            {t("demo")}
          </Link>
          <WebappLink type="login" className="text-white hover:opacity-80 font-semibold text-sm">
            {t("login")}
          </WebappLink>
          <WebappLink type="register" className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-4 lg:px-6 rounded-full transition-all inline-block text-sm">
            {t("trial")}
          </WebappLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:opacity-80"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
        <div className="md:hidden bg-primary px-4 py-4 space-y-3 border-t border-white border-opacity-20">
          <Link href={withLocale("/")} onClick={() => setIsOpen(false)} className="block text-white hover:opacity-80 py-2">
            {t("home")}
          </Link>
          
          {/* Mobile Fonctionnalités avec sous-menus */}
          <div className="text-white">
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
              <div className="pl-4 rounded my-2 py-2 space-y-2" style={{ backgroundColor: '#0290d9' }}>
                {featuresMenu.map((item) => (
                  <div key={item.href}>
                    {item.subItems ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={withLocale(item.href)}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileExpandedFeatureItem(null);
                            }}
                            className="text-white hover:opacity-80 py-2 text-sm font-medium"
                          >
                            {getFeatureLabel(item.id)}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileExpandedFeatureItem(mobileExpandedFeatureItem === item.id ? null : item.id)}
                            className="text-white hover:opacity-80 py-2 pl-4"
                            aria-label={t("features")}
                          >
                            <svg 
                              className={`w-4 h-4 transition-transform ${mobileExpandedFeatureItem === item.id ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        
                        {mobileExpandedFeatureItem === item.id && (
                          <div className="pl-4 space-y-2 my-2 rounded py-2 px-2" style={{ backgroundColor: '#0290d9' }}>
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={withLocale(subItem.href)}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileFeaturesOpen(false);
                                  setMobileExpandedFeatureItem(null);
                                }}
                                className="block text-white hover:opacity-80 text-sm py-1"
                              >
                                {getSubItemLabel(subItem.href)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={withLocale(item.href)}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileFeaturesOpen(false);
                        }}
                        className="block text-white hover:opacity-80 py-2 text-sm font-medium"
                      >
                        {getFeatureLabel(item.id)}
                      </Link>
                    )}
                  </div>
                ))}
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
          <div className="text-white" ref={mobileLanguageRef}>
            <button
              onClick={() => setMobileLanguageOpen(!mobileLanguageOpen)}
              className="w-full text-left hover:opacity-80 py-2 flex items-center justify-between font-medium user-select-none"
            >
              {languageLabel}
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
              <div className="pl-4 rounded my-2 py-2 space-y-2 user-select-none" style={{ backgroundColor: '#0290d9' }} onMouseDown={(e) => e.preventDefault()}>
                {locales.map((lang) => (
                  <button
                    key={lang}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleLocaleChange(lang);
                      setMobileLanguageOpen(false);
                    }}
                    className={`w-full text-left py-2 text-sm transition user-select-none ${
                      locale === lang
                        ? 'text-white font-semibold'
                        : 'text-white hover:opacity-80'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
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
          <WebappLink type="register" className="block w-full text-center bg-white text-primary hover:bg-gray-100 font-semibold py-3 rounded-full transition-all" onClick={() => setIsOpen(false)}>
            {t("trial")}
          </WebappLink>
        </div>
      )}
    </header>
  );
}
