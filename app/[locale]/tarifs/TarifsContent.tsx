'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  BillingPeriod,
  CUSTOM_PRICING_THRESHOLD,
  VAT_RATE,
  calculatePrice,
  getTierRange,
} from '@/lib/pricing-config';
import { COLORS } from '@/lib/design-config';
import WebappLink from '@/components/ui/WebappLink';

function formatEuro(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function TarifsContent() {
  const t = useTranslations('pricingPage');
  const common = useTranslations('common');
  const locale = useLocale();

  const [logements, setLogements] = useState(1);
  const [logementsInput, setLogementsInput] = useState('1');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual');
  const [isParticulier, setIsParticulier] = useState(false);

  const clampLogements = (value: number) => Math.min(250, Math.max(1, value));

  const updateLogements = (value: number) => {
    const nextValue = clampLogements(value);
    setLogements(nextValue);
    setLogementsInput(String(nextValue));
  };

  const handleLogementsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === '') {
      setLogementsInput('');
      return;
    }

    const parsedValue = Number.parseInt(rawValue, 10);
    if (!Number.isNaN(parsedValue)) {
      setLogementsInput(rawValue);
      updateLogements(parsedValue);
    }
  };

  const handleLogementsInputBlur = () => {
    if (!logementsInput || Number.isNaN(Number.parseInt(logementsInput, 10))) {
      updateLogements(1);
      return;
    }

    updateLogements(Number.parseInt(logementsInput, 10));
  };

  const monthlyData = calculatePrice(logements, 'monthly', { isParticulier });
  const annualData = calculatePrice(logements, 'annual', { isParticulier });
  const isCustomPricing = logements > CUSTOM_PRICING_THRESHOLD || !monthlyData || !annualData;

  const factor = isParticulier ? 1 + VAT_RATE : 1;
  const currentMonthlyTotal =
    billingPeriod === 'annual' ? (annualData?.totalMonth ?? 0) * factor : (monthlyData?.totalMonth ?? 0) * factor;
  const referenceMonthlyTotal = (monthlyData?.totalMonth ?? 0) * factor;
  const yearlySaving = Math.max(0, referenceMonthlyTotal * 12 - currentMonthlyTotal * 12);

  const heroTitleLine1 = t('heroTitleLine1');
  const heroTitleLine2 = t('heroTitleLine2');
  const heroDescription = t('heroDescription');
  const reduceLabel = t('reduce');
  const increaseLabel = t('increase');
  const propertyInputAriaLabel = t('propertyInputAriaLabel');
  const summaryTitle = t('summaryTitle');
  const summaryDescription = t('summaryDescription');
  const zeroCommissionLabel = t('zeroCommission');
  const professionalLabel = t('buttonProfessional');
  const individualLabel = t('buttonIndividual');
  const discountBadgeLabel = t('discountBadge');

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t('schemaName'),
    description: t('schemaDescription'),
    brand: {
      '@type': 'Brand',
      name: 'Biloki',
    },
  };

  const includedFeatures = [
    {
      title: t('featureReservationsTitle'),
      items: [
        t('featureReservationsItem1'),
        t('featureReservationsItem2'),
        t('featureReservationsItem3'),
      ],
    },
    {
      title: t('featureCommunicationTitle'),
      items: [t('featureCommunicationItem1')],
    },
    {
      title: t('featureGuideTitle'),
      items: [
        t('featureGuideItem1'),
        t('featureGuideItem2'),
        t('featureGuideItem3'),
      ],
    },
    {
      title: t('featureSalesTitle'),
      items: [
        t('featureSalesItem1'),
        t('featureSalesItem2'),
        t('featureSalesItem3'),
      ],
    },
    {
      title: t('featureOperationsTitle'),
      items: [t('featureOperationsItem1')],
    },
    {
      title: t('featurePilotageTitle'),
      items: [t('featurePilotageItem1'), t('featurePilotageItem2')],
    },
    {
      title: t('featureSoonTitle'),
      items: [t('featureSoonItem1')],
    },
  ];

  return (
    <main className="bg-white py-2 text-white md:py-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section
        className="relative mx-auto min-h-[calc(100vh-1rem)] w-[calc(100%-0.75rem)] overflow-hidden rounded-[36px] border border-black/10 md:min-h-[calc(100vh-1.5rem)] md:w-[calc(100%-1.5rem)]"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(2,6,23,0.62) 0%, rgba(2,6,23,0.5) 36%, rgba(2,6,23,0.35) 62%, rgba(2,6,23,0.2) 100%), url('/images/Tarifs/jason-leung-7UuSEPW2LrM-unsplash%20(1).jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative px-5 pb-8 pt-32 sm:px-8 md:px-10 md:pb-12 md:pt-36 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-7xl">
              {heroTitleLine1}
              <br />
              {heroTitleLine2}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg">
              {heroDescription}
            </p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-[1120px] gap-3 rounded-2xl border border-white/65 bg-white/8 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm md:grid-cols-3 md:items-start md:justify-items-center md:gap-4 md:p-4">
            <div className="text-center">
              <p className="mb-2 text-xs font-normal uppercase tracking-[0.1em] text-white">{t('numberOfProperties')}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateLogements(logements - 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/28 text-lg font-bold shadow-[0_4px_12px_rgba(15,23,42,0.12)] hover:bg-white/38"
                  aria-label={reduceLabel}
                >
                  -
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="250"
                  value={logementsInput}
                  onChange={handleLogementsInputChange}
                  onBlur={handleLogementsInputBlur}
                  className="w-20 rounded-full border border-white/55 bg-white/28 px-3 py-2 text-center text-lg font-black text-white outline-none placeholder:text-white/70"
                  aria-label={propertyInputAriaLabel}
                />
                <button
                  type="button"
                  onClick={() => updateLogements(logements + 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/28 text-lg font-bold shadow-[0_4px_12px_rgba(15,23,42,0.12)] hover:bg-white/38"
                  aria-label={increaseLabel}
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-xs text-white/75">{getTierRange(logements, locale)}</p>
            </div>

            <div className="text-center">
              <p className="mb-2 text-xs font-normal uppercase tracking-[0.1em] text-white">{t('billingPeriod')}</p>
              <div className="inline-flex rounded-full border border-white/55 bg-white/22 p-1 shadow-[0_4px_14px_rgba(15,23,42,0.12)]">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('monthly')}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    billingPeriod === 'monthly' ? 'bg-white text-slate-900' : 'text-white/92 hover:bg-white/28'
                  }`}
                >
                  {t('monthly')}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('annual')}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    billingPeriod === 'annual'
                      ? 'bg-white text-slate-900'
                      : 'text-white/92 hover:bg-white/28'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>{t('annual')}</span>
                    {billingPeriod === 'annual' ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold leading-none text-emerald-700">
                        {discountBadgeLabel}
                      </span>
                    ) : null}
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-2 text-xs font-normal uppercase tracking-[0.1em] text-white">{t('clientType')}</p>
              <div className="inline-flex rounded-full border border-white/55 bg-white/22 p-1 shadow-[0_4px_14px_rgba(15,23,42,0.12)]">
                <button
                  type="button"
                  onClick={() => setIsParticulier(false)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    !isParticulier ? 'bg-white text-slate-900' : 'text-white/92 hover:bg-white/28'
                  }`}
                >
                  {professionalLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setIsParticulier(true)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    isParticulier ? 'bg-white text-slate-900' : 'text-white/92 hover:bg-white/28'
                  }`}
                >
                  {individualLabel}
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[1120px] rounded-[32px] border border-white/35 bg-white/12 p-2 shadow-[0_24px_65px_rgba(2,6,23,0.35),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-md">
          <div className="rounded-[28px] border border-white/25 bg-white/95 p-5 text-slate-900 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black md:text-4xl">{summaryTitle}</h2>
                <p className="mt-2 max-w-2xl text-slate-600">{summaryDescription}</p>
              </div>
            </div>

            <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                {isCustomPricing ? (
                  <div className="mt-1">
                    <p className="text-4xl font-black text-slate-900">{t('customQuote')}</p>
                    <p className="mt-1 text-slate-600">{t('customPricing')}</p>
                  </div>
                ) : (
                  <div className="mt-1 flex flex-wrap items-end gap-3">
                    <p className="text-4xl font-black text-slate-900">{formatEuro(currentMonthlyTotal, locale)}</p>
                    <p className="pb-1 text-base font-normal text-slate-500">/ {t('perMonth')}</p>
                  </div>
                )}
                {!isCustomPricing && billingPeriod === 'annual' ? (
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    {formatEuro(yearlySaving, locale)} {t('savedAnnually')}
                  </p>
                ) : null}
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[260px]">
                <WebappLink
                  type="register"
                  className="inline-flex items-center justify-center rounded-full bg-[#04a4ff] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[#0292e6]"
                >
                  {common('startFreeTrial')}
                </WebappLink>
                <Link
                  href={`/${locale}/reserver-demo`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-3.5 text-base font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  {common('bookDemo')}
                </Link>
              </div>
            </div>

            <div className="mt-0 flex flex-col gap-2 text-sm text-slate-700">
              <p>✓ {t('infoNoCommitment')}</p>
              <p>✓ {zeroCommissionLabel}</p>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-6">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-600">{t('includedFeatures')}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {includedFeatures.map((section) => (
                  <div key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <h3 className="mb-3 text-base font-black text-slate-900 md:text-[1.08rem]">{section.title}</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {section.items.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="pricing-feature-check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#04a4ff] text-[11px] font-bold text-white">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>

          <div className="mx-auto mt-6 flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/45 bg-white/6 px-4 py-3 text-sm text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-sm">
            <p>{t('readyToStart')}</p>
            <p>
              {t('noCreditCard')} • {t('cancelAnytime')}
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: ${COLORS.primary};
          border: 2px solid #fff;
          box-shadow: 0 6px 18px rgba(4, 164, 255, 0.35);
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
