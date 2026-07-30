"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations-config";
import WebappLink from "@/components/ui/WebappLink";
import CanvaGlassFrame from "@/components/ui/CanvaGlassFrame";

export default function BenefitsSection() {
  const t = useTranslations("benefits");

  const benefits = [
    { id: 1, icon: "📦" },
    { id: 2, icon: "🌐" },
    { id: 3, icon: "👥" },
    { id: 4, icon: "💰" },
    { id: 5, icon: "⭐" },
    { id: 6, icon: "📊" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white via-white to-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Benefits Grid - Alternating Layout */}
        <div className="space-y-12 md:space-y-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 lg:gap-16 items-center`}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Left Content */}
              <motion.div
                className="flex-1"
                variants={itemVariants}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-4xl mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {t(`item${benefit.id}.title`)}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t(`item${benefit.id}.description`)}
                  </p>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex items-center justify-center"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">{benefit.icon}</div>
                  <p className="text-gray-400 text-sm">
                    Illustration {benefit.id}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-block"
          >
            <CanvaGlassFrame className="rounded-xl">
              <WebappLink
                type="register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t("cta")} →
              </WebappLink>
            </CanvaGlassFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
