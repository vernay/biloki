"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations-config";
import WebappLink from "@/components/ui/WebappLink";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const tInterfaces = useTranslations("animatedInterfaces");
  const titleLine = t("title").trim();
  const highlightLine = t("titleHighlight").trim();
  
  return (
    <section className="pt-20 pb-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Contenu */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 hero-title-shine text-left"
              variants={itemVariants}
            >
              <span className="block">{titleLine}</span>
              <span className="block"><span className="text-primary">{highlightLine}</span></span>
            </motion.h1>

            <motion.div
              className="flex flex-col gap-3 text-sm text-gray-800"
              variants={itemVariants}
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-500 text-green-600">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t("trialNote")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-500 text-green-600">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Onboarding offert
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a 
                href="https://www.google.com/search?sca_esv=0ccad900ef2a9a41&sxsrf=ANbL-n6YfqBDfznGLjZ0nDaSP_EzhT30Dg:1771407903783&q=Biloki+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NTQ2MDA2MzGxMLQ0MDEyNjA028DI-IqR2ykzJz87U8GxLLN4ESsyDwCdZzewNgAAAA&rldimm=5130036448190423016&tbm=lcl&hl=fr-FR&sa=X&ved=2ahUKEwifzO3W4OKSAxVBoScCHUYdLwoQ9fQKegQILRAG&biw=1558&bih=807&dpr=1#lkt=LocalPoiReviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  src="/images/logo-partenaires/Google.svg.png"
                  alt="Google"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex items-center gap-1 text-yellow-400">
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span className="text-sm text-gray-800 ml-2">5/5</span>
                </div>
              </a>
            </motion.div>


            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <WebappLink
                  type="register"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold bg-primary hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {tCommon("startFree")} →
                </WebappLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/reserver-demo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                  {tCommon("bookYourDemo")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Maquettes de téléphones */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Conciergerie */}
              <motion.div 
                className="flex flex-col items-center space-y-2"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-[var(--biloki-blue)]">{tInterfaces("labels.concierge")}</span>
                </div>
                <div className="w-32 sm:w-40">
                  <img 
                    src="/images/interfaces/gestionnaire-ordi.svg" 
                    alt="Interface Conciergerie" 
                    className="w-full rounded-2xl shadow-2xl"
                    width={320}
                    height={640}
                  />
                </div>
              </motion.div>

              {/* Propriétaire */}
              <motion.div 
                className="flex flex-col items-center space-y-2"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-[var(--biloki-blue)]">{tInterfaces("labels.owner")}</span>
                </div>
                <div className="w-32 sm:w-40">
                  <img 
                    src="/images/interfaces/proprietaire.png" 
                    alt="Interface Propriétaire" 
                    className="w-full rounded-2xl shadow-2xl"
                    width={320}
                    height={640}
                  />
                </div>
              </motion.div>

              {/* Prestataire */}
              <motion.div 
                className="flex flex-col items-center space-y-2"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-[var(--biloki-blue)]">{tInterfaces("labels.provider")}</span>
                </div>
                <div className="w-32 sm:w-40">
                  <img 
                    src="/images/interfaces/prestataire.png" 
                    alt="Interface Prestataire" 
                    className="w-full rounded-2xl shadow-2xl"
                    width={320}
                    height={640}
                  />
                </div>
              </motion.div>

              {/* Locataire */}
              <motion.div 
                className="flex flex-col items-center space-y-2"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-[var(--biloki-blue)]">{tInterfaces("labels.tenant")}</span>
                </div>
                <div className="w-32 sm:w-40">
                  <img 
                    src="/images/interfaces/locataire.png" 
                    alt="Interface Locataire" 
                    className="w-full rounded-2xl shadow-2xl"
                    width={320}
                    height={640}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
