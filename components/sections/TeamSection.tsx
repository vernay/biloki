"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
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
            <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-96">
              <span className="-mt-2 inline-flex items-center rounded-full border border-primary bg-primary/10 px-4 py-1 text-sm font-semibold tracking-wide text-primary">
                Actualité
              </span>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 w-full">
                <Image
                  src="/images/pms/J'affiche complet.jpg"
                  alt="Biloki au salon de Paris"
                  className="w-full h-auto object-cover"
                  width={1200}
                  height={800}
                />
              </div>
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
                href="https://www.linkedin.com/posts/s%C3%A9bastien-vernay-71a27374_rdvdesprosdelalocationsaisonniaeyre-locationsaisonniere-share-7452976064642928641-Lb-_?utm_source=share&utm_medium=member_desktop&rcm=ACoAACIjrgkBCab2Qq4sd3YgaN4goMCfmzDY0io"
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
