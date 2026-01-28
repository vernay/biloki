'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="w-full py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-[48px] p-8 md:p-12 text-center text-white shadow-xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img src="/logos/logo.svg" alt="Biloki" className="h-48" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("description")}
          </p>

          {/* Features Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-sm">{tCommon("startFreeTrial")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-sm">{tCommon("noCardRequired")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-sm">{t("badges.support")}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium text-sm">{t("badges.migration")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Link
              href="/s-abonner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-110 hover:-translate-y-2 transition-all duration-300 shadow-lg"
            >
              {tCommon("subscribe")}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/commencer-gratuitement"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              {tCommon("startFreeTrial")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
