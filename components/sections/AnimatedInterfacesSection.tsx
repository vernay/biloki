'use client';

import { useTranslations } from "next-intl";

export default function AnimatedInterfacesSection() {
  const t = useTranslations("animatedInterfaces");

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            {t("title")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("subtitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md mx-auto">
            <img src="/images/interfaces/gestionnaire.png" alt={t("labels.concierge")} className="w-full h-auto rounded-2xl shadow-2xl" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
