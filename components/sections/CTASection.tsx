'use client';

import { useTranslations } from "next-intl";
import WebappLink from "@/components/ui/WebappLink";

export default function CTASection() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="w-full py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-3xl md:rounded-[32px] p-6 md:p-8 text-center text-white shadow-xl">
          {/* Logo */}
          <div className="mb-4 md:mb-6 flex justify-center">
            <img
              src="/logos/logo-biloki.png"
              alt="Biloki"
              className="h-20 md:h-24"
              width={240}
              height={120}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            {t("description")}
          </p>

          {/* Features Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-xs md:text-sm">{tCommon("startFreeTrial")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-xs md:text-sm">{tCommon("noCardRequired")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-xs md:text-sm">{t("badges.support")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-xs md:text-sm">{t("badges.migration")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
            <WebappLink
              type="subscription"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base"
            >
              {tCommon("subscribe")}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </WebappLink>
            <WebappLink
              type="register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              {tCommon("startFreeTrial")}
            </WebappLink>
          </div>
        </div>
      </div>
    </section>
  );
}
