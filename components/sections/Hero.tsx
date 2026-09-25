"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations-config";
import WebappLink from "@/components/ui/WebappLink";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const titleLine = t("title").trim();
  const titleHighlight = t("titleHighlight").trim();
  
  return (
    <section id="hero-section" className="overflow-x-hidden px-4 pb-10 pt-52 sm:px-6 md:pt-48">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Colonne gauche - Contenu */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div
              className="flex flex-col gap-6"
            >
            <motion.h1 
                className="flex-1 max-w-5xl text-center font-sans text-2xl leading-tight md:text-3xl md:leading-relaxed lg:text-left lg:text-4xl"
              >
                  <span className="block break-words text-[2rem] font-black text-slate-900 md:text-4xl lg:text-5xl">
                  {titleLine}
                </span>
                <div className="relative inline-block mt-3">
                  <span className="block text-base md:text-lg lg:text-xl font-normal text-gray-500">
                    {titleHighlight}
                  </span>
                </div>
              </motion.h1>
            </motion.div>

            <motion.div
              className="mt-2 flex flex-col gap-3 text-sm text-slate-700"
            >
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t("trialNote")}
              </span>
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t("onboardingNote")}
              </span>
            </motion.div>

            <motion.div>
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
                  <span className="text-sm text-slate-900 ml-2">5/5</span>
                </div>
              </a>
            </motion.div>


            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.div>
                <WebappLink
                  type="register"
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[#01A4FF] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#0194e6] sm:w-auto"
                >
                  {tCommon("startFree")} →
                </WebappLink>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Visuel */}
          <motion.div className="relative mx-auto w-full max-w-[480px] lg:max-w-none lg:scale-105 lg:origin-center">
            <img
              src="/images/Page%20r%C3%A9servation/Page%20d%27acceuil%20V2.svg"
              alt="Interface Biloki"
              className="w-full h-auto object-contain"
              width={900}
              height={700}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
