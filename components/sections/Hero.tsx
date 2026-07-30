"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations-config";
import WebappLink from "@/components/ui/WebappLink";
import HandDrawnUnderline from "@/components/ui/HandDrawnUnderline";
import { LiquidButton } from "@/components/ui/LiquidButton";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const titleLine = t("title").trim();
  const titleHighlight = t("titleHighlight").trim();
  
  return (
    <section id="hero-section" className="overflow-x-hidden px-4 pb-4 pt-20 sm:px-6 md:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-4 items-center">
          {/* Colonne gauche - Contenu */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="flex flex-col gap-6 lg:block"
              variants={itemVariants}
            >
            <motion.h1 
                className="flex-1 max-w-5xl text-center text-2xl font-semibold leading-tight tracking-tight md:text-3xl md:leading-relaxed lg:text-left lg:text-4xl"
                variants={itemVariants}
              >
                <span className="block text-[2rem] md:text-4xl lg:text-5xl font-semibold break-words text-white">
                  {titleLine}
                </span>
                <div className="relative inline-block mt-3">
                  <span className="block text-lg md:text-xl lg:text-2xl font-medium text-primary">
                    {titleHighlight}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full">
                    <HandDrawnUnderline color="#01a4ff" className="w-full" width={200} height={16} />
                  </div>
                </div>
              </motion.h1>

              <div className="mx-auto w-full max-w-[340px] lg:hidden sm:w-[70%] sm:min-w-[220px] sm:mt-2">
                <img
                  src="/images/1%C3%A8re%20page%20photos/Photo%20principale.svg"
                  alt="Interface Biloki"
                  className="w-full h-auto object-contain"
                  width={900}
                  height={700}
                />
              </div>
            </motion.div>

            <motion.div
              className="mt-2 flex flex-col gap-3 text-sm text-white/90"
              variants={itemVariants}
            >
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/80 text-white">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t("trialNote")}
              </span>
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/80 text-white">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t("onboardingNote")}
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a 
                href="https://www.google.com/search?sca_esv=0ccad900ef2a9a41&sxsrf=ANbL-n6YfqBDfznGLjZ0nDaSP_EzhT30Dg:1771407903783&q=Biloki+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NTQ2MDA2MzGxMLQ0MDEyNjA028DI-IqR2ykzJz87U8GxLLN4ESsyDwCdZzewNgAAAA&rldimm=5130036448190423016&tbm=lcl&hl=fr-FR&sa=X&ved=2ahUKEwifzO3W4OKSAxVBoScCHUYdLwoQ9fQKegQILRAG&biw=1558&bih=807&dpr=1#lkt=LocalPoiReviews"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex w-fit items-center gap-3 cursor-pointer transition-opacity hover:opacity-80 lg:mx-0"
              >
                <img
                  src="/images/logo-partenaires/Google.svg.png"
                  alt="Google"
                  className="h-4 w-auto"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex items-center gap-1 text-yellow-300">
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span aria-hidden="true">★</span>
                  <span className="text-sm text-white ml-2">5/5</span>
                </div>
              </a>
            </motion.div>


            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center lg:justify-start"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <WebappLink
                  type="register"
                  className="inline-block w-full rounded-full focus-visible:outline-none sm:w-auto"
                >
                  <LiquidButton size="xl" className="w-full justify-center whitespace-nowrap">{tCommon("startFree")} →</LiquidButton>
                </WebappLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href={`/${locale}/reserver-demo`}
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/55 hover:bg-white/18 hover:shadow-[0_10px_30px_rgba(255,255,255,0.14)] sm:w-auto"
                >
                  {tCommon("bookYourDemo")}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-center text-[11px] leading-tight text-white/70 sm:text-xs lg:justify-start lg:text-left"
              variants={itemVariants}
            >
              <span>{t("hostingNote")}</span>
              <span className="inline-flex items-center rounded px-1.5 py-0.5 border border-white/30 bg-white/5" aria-label="Logo Scaleway">
                <svg className="h-3.5 w-3.5 text-white/65" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 1H6V6H1V1ZM1 8H6V13H1V8ZM8 1H13V6H8V1Z" fill="currentColor"/>
                </svg>
              </span>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Mockup principal */}
          <div className="relative hidden lg:flex lg:h-[800px] items-center justify-end lg:pl-24 lg:-mr-8">
            <motion.div
              className="w-full max-w-[1500px] lg:translate-x-4 lg:scale-[1.5] origin-center"
              variants={itemVariants}
              initial="hidden"
              animate="show"
            >
              <img
                src="/images/1%C3%A8re%20page%20photos/Photo%20principale.svg"
                alt="Interface Biloki"
                className="w-full h-auto"
                width={900}
                height={700}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
