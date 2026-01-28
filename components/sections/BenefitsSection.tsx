"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BenefitsSection() {
  const t = useTranslations("common");
  const tBenefits = useTranslations("benefits");
  
  const iconMap: { [key: string]: React.ReactNode } = {
    time: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    revenue: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    star: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    money: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    target: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    chart: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="12" width="4" height="8" stroke="currentColor" strokeWidth="2"/>
        <rect x="10" y="6" width="4" height="14" stroke="currentColor" strokeWidth="2"/>
        <rect x="17" y="2" width="4" height="18" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  };

  const benefitKeys = ["time", "revenue", "star", "money", "target", "chart"];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {tBenefits("title")} <span className="text-primary">{tBenefits("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {tBenefits("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitKeys.map((key, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[key]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tBenefits(`items.${key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tBenefits(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/commencer-gratuitement"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            {t("discoverBenefits")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
