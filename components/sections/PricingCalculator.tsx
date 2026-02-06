"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { calculatePrice, BillingPeriod, CUSTOM_PRICING_THRESHOLD, VAT_RATE, FREE_TRIAL_DAYS, ANNUAL_DISCOUNT } from "@/lib/pricing-config";
import { COLORS } from "@/lib/design-config";
import WebappLink from "@/components/ui/WebappLink";

export default function PricingCalculator() {
  const tCommon = useTranslations("common");
  const t = useTranslations("pricingCalculator");
  const [dwellings, setDwellings] = useState(5);
  const [dwellingsInput, setDwellingsInput] = useState("5");
  const [billingCycle, setBillingCycle] = useState<BillingPeriod>("monthly");
  const [isParticulier, setIsParticulier] = useState(false);

  const monthlyData = calculatePrice(dwellings, "monthly", {
    isParticulier
  });
  const annualData = calculatePrice(dwellings, "annual", {
    isParticulier
  });
  const isCustomPricing = dwellings > CUSTOM_PRICING_THRESHOLD || !monthlyData || !annualData;
  
  // Utiliser les données de la config centralisée
  const totalMonthly = monthlyData?.totalMonth ?? 0;
  const totalAnnualDiscounted = (annualData?.totalMonth ?? 0) * 12;
  const totalAnnualFull = totalMonthly * 12;
  const totalMonthlyForDisplay = billingCycle === "annual"
    ? (annualData?.totalMonth ?? 0)
    : totalMonthly;
  
  const totalMonthlyDisplay = isCustomPricing ? null : totalMonthlyForDisplay * (isParticulier ? 1 + VAT_RATE : 1);
  const totalAnnualDisplay = isCustomPricing
    ? null
    : (billingCycle === "annual" ? totalAnnualDiscounted : totalAnnualFull) * (isParticulier ? 1 + VAT_RATE : 1);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(1, Number(e.target.value));
    setDwellings(next);
    setDwellingsInput(String(next));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      setDwellingsInput("");
      return;
    }
    const val = Number(raw);
    if (!isNaN(val)) {
      setDwellingsInput(raw);
      setDwellings(Math.max(1, val));
    }
  };

  const handleInputBlur = () => {
    const val = Number(dwellingsInput);
    if (!dwellingsInput || isNaN(val)) {
      setDwellings(1);
      setDwellingsInput("1");
      return;
    }
    const clamped = Math.max(1, val);
    setDwellings(clamped);
    setDwellingsInput(String(clamped));
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center">
      {/* Décoration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-biloki-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-biloki-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto w-full px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-biloki-blue text-white font-semibold text-sm rounded-full mb-4">
            {t("title")}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 leading-tight">
            {t("subtitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Calculateur principal */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Toggle Mensuel/Annuel */}
          <div className="px-8 md:px-12 py-8 border-b border-gray-200/50 bg-primary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {t("billingCycle")}
                </h3>
                <p className="text-sm text-white/90">
                  {billingCycle === "annual" && t("saveAnnual", { percent: ANNUAL_DISCOUNT * 100 })}
                  {billingCycle === "monthly" && t("payMonthly")}
                </p>
              </div>

              {/* Boutons Toggle */}
              <div className="flex rounded-xl bg-gray-100 p-1.5 border border-gray-200">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 md:px-8 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-white text-biloki-blue shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tCommon("monthly")}
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-6 md:px-8 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 relative ${
                    billingCycle === "annual"
                      ? "bg-white text-biloki-blue shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tCommon("annual")}
                  {billingCycle === "annual" && (
                    <span className="absolute -top-2.5 right-2 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{ANNUAL_DISCOUNT * 100}%
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="px-8 md:px-12 py-12">
            {/* Sélecteur de logements */}
            <div className="mb-12">
              <div className="flex items-baseline justify-between mb-6">
                <label htmlFor="dwellings-range" className="text-lg font-semibold text-gray-900">
                  {t("numberOfProperties")}
                </label>
                <div className="text-right">
                  <p className="text-4xl font-bold text-biloki-blue">{dwellings}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {dwellings === 1 ? tCommon("property") : tCommon("properties")}
                  </p>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                id="dwellings-range"
                min="1"
                max="250"
                value={Math.min(dwellings, 250)}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer pricing-slider accent-biloki-blue transition-shadow focus:shadow-lg focus:shadow-biloki-blue/30 mb-6"
                style={{
                  background: `linear-gradient(to right, ${COLORS.primary} 0%, ${COLORS.primary} ${((Math.min(dwellings, 250) - 1) / 249) * 100}%, #e5e7eb ${((Math.min(dwellings, 250) - 1) / 249) * 100}%, #e5e7eb 100%)`
                }}
              />

              {/* Input + labels */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Min</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
                <div className="flex justify-center">
                  <label htmlFor="dwellings-input" className="sr-only">
                    {t("numberOfProperties")}
                  </label>
                  <input
                    type="number"
                    id="dwellings-input"
                    min="1"
                    value={dwellingsInput}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-24 px-4 py-3 text-center text-2xl font-bold border-2 border-biloki-blue/20 rounded-xl focus:outline-none focus:border-biloki-blue focus:shadow-lg focus:shadow-biloki-blue/20 transition-all"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Max</p>
                  <p className="text-xl font-bold text-gray-900">200+</p>
                </div>
              </div>
            </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-900 mb-3">{t("clientType")}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                      !isParticulier
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-800 hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type-client"
                      checked={!isParticulier}
                      onChange={() => setIsParticulier(false)}
                      className="sr-only"
                    />
                    {t("professional")}
                  </label>
                  <label
                    className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                      isParticulier
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-800 hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type-client"
                      checked={isParticulier}
                      onChange={() => setIsParticulier(true)}
                      className="sr-only"
                    />
                    {t("individual")}
                  </label>
                </div>
              </div>

              {/* Séparateur */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"></div>

              {/* Affichage des prix */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Total mensuel */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t("totalPerMonth")} ({isParticulier ? t("includingVat") : t("excludingVat")})
                  </p>
                  <div className="space-y-2">
                    {isCustomPricing ? (
                      <>
                        <p className="text-4xl md:text-5xl font-black text-primary">
                          {t("customQuote")}
                        </p>
                        <p className="text-sm text-gray-600">{t("customPricing")}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-4xl md:text-5xl font-black text-primary">
                          {totalMonthlyDisplay?.toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-600">
                          {dwellings} {dwellings > 1 ? tCommon("properties") : tCommon("property")}
                        </p>
                        <p className="text-xs text-gray-500 pt-2">{t("monthlyBilling")}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Total annuel */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t("annualTotal")} ({isParticulier ? t("includingVat") : t("excludingVat")})
                  </p>
                  <div className="space-y-2">
                    {isCustomPricing ? (
                      <>
                        <p className="text-4xl md:text-5xl font-black text-primary">
                          {t("customQuote")}
                        </p>
                        <p className="text-sm text-gray-600">{dwellings} {dwellings > 1 ? tCommon("properties") : tCommon("property")}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-4xl md:text-5xl font-black text-primary">
                          {totalAnnualDisplay?.toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-600">
                          {dwellings} {dwellings > 1 ? tCommon("properties") : tCommon("property")}
                        </p>
                        <p className="text-xs text-gray-500 pt-2">{t("annualBilling", { percent: ANNUAL_DISCOUNT * 100 })}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Message et CTA pour devis */}
              {isCustomPricing ? (
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  {tCommon("customQuoteMessage")}
                </p>
                <button className="bg-primary hover:opacity-90 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg">
                  {tCommon("requestCustomQuote")}
                </button>
              </div>
            ) : null}

            {/* CTA */}
              {!isCustomPricing && dwellings <= 200 && (
              <div className="mt-12 text-center">
                <WebappLink type="register" className="inline-block bg-primary text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg">
                  {tCommon("tryFree")}
                </WebappLink>
                <p className="text-sm text-gray-600 mt-4">
                  {tCommon("noCardRequired", { days: FREE_TRIAL_DAYS })} • {tCommon("fullAccess14Days", { days: FREE_TRIAL_DAYS })}
                </p>
              </div>
            )}
          </div>

          {/* Grille de paliers */}
          
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-biloki-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-biloki-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a2 2 0 012-2h6a2 2 0 012 2v2m0 0a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm0 0V5a2 2 0 012-2h6a2 2 0 012 2v4m0 0a2 2 0 00-2-2H7a2 2 0 00-2 2m0 0V9m0 0a2 2 0 002 2h6a2 2 0 002-2" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t("noHiddenFees")}</h4>
            <p className="text-sm text-gray-600">{t("clearPricing")}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-biloki-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-biloki-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM14 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t("flexible")}</h4>
            <p className="text-sm text-gray-600">{t("changePlan")}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-biloki-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-biloki-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2h10a1 1 0 100-2 2 2 0 00-2 2v9a2 2 0 002 2 1 1 0 100 2H6a1 1 0 100-2 2 2 0 01-2-2V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t("responsiveSupport")}</h4>
            <p className="text-sm text-gray-600">{t("teamAvailable")}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${COLORS.primary};
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(4, 164, 255, 0.4);
          border: 3px solid white;
          transition: all 0.2s;
        }

        .pricing-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(4, 164, 255, 0.5);
        }

        .pricing-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${COLORS.primary};
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(4, 164, 255, 0.4);
          border: 3px solid white;
          transition: all 0.2s;
        }

        .pricing-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(4, 164, 255, 0.5);
        }

        .pricing-slider::-moz-range-track {
          background: transparent;
          border: none;
        }

        .pricing-slider:focus {
          outline: none;
        }
      `}</style>
    </section>
  );
}
