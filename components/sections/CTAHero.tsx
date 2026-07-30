"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WebappLink from "@/components/ui/WebappLink";
import { locales, type Locale } from "@/lib/i18n/config";

export default function CTAHero() {
  const t = useTranslations("cta");
  const pathname = usePathname();
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

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/1%C3%A8re%20page%20photos/Es%20vedra.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(2, 144, 217, 0.85) 0%, rgba(1, 164, 255, 0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-white/90 text-sm md:text-base font-semibold mb-3 md:mb-4">
                  {t('hero.kicker')}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {t('hero.title')}
                  <span className="block text-yellow-300">{t('hero.titleHighlight')}</span>
                </h2>
              </div>

              <p className="text-white/95 text-base md:text-lg leading-relaxed">
                {t('hero.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                <Link
                  href={withLocale("/reserver-demo")}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 border border-white/40 backdrop-blur"
                >
                  {t('hero.bookDemo')}
                </Link>

                <WebappLink
                  type="register"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-primary font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('hero.startTrial')}
                </WebappLink>
              </div>

              {/* Features */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90 text-sm md:text-base font-medium">{t('hero.bullet1')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90 text-sm md:text-base font-medium">{t('hero.bullet2')}</span>
                </div>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/1%C3%A8re%20page%20photos/Photo%20principale.svg')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-white to-transparent" />
    </section>
  );
}
