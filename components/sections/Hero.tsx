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
              className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
              variants={itemVariants}
            >
              {t("title")}{" "}
              <span className="text-primary">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-700 max-w-xl"
              variants={itemVariants}
            >
              {t("description")}
            </motion.p>

            {/* Checkboxes */}
            <motion.div className="space-y-3" variants={containerVariants}>
              <motion.div 
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-primary flex items-center justify-center bg-primary">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{t("check1")}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-primary flex items-center justify-center bg-primary">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{t("check2")}</span>
              </motion.div>
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
                    src="/images/interfaces/gestionnaire.png" 
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
