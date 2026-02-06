"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TeamSection() {
  const t = useTranslations("team");
  const tCommon = useTranslations("common");
  
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo à gauche - petit format */}
          <div className="flex justify-center md:justify-start">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 w-full md:w-96">
              <img 
                src="/images/blog/salon-marseille.jpg" 
                alt="Équipe Biloki au salon de Marseille" 
                className="w-full h-auto object-cover"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Titre et texte à droite */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")} <span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reserver-demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {tCommon("bookDemo")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="https://www.linkedin.com/posts/salon-conciergerie-locative_d%C3%A9couvrez-biloki-exposant-activity-7416751054299729920-jfEn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                {t("linkedinPost")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
