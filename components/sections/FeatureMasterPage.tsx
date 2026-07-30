import Link from 'next/link';
import type { ReactNode } from 'react';

type FeaturePoint = {
  title: string;
  description: string;
};

type FeatureStep = {
  title: string;
  description: string;
};

type FeatureKpi = {
  value: string;
  label: string;
};

type FeatureFaqItem = {
  question: string;
  answer: string;
};

type FeatureMasterPageProps = {
  locale: string;
  title: string;
  highlight?: string;
  description: string;
  heroBackgroundImageSrc?: string;
  heroBackgroundPosition?: string;
  heroTopRightLogoSrc?: string;
  heroTopRightLogoAlt?: string;
  heroVisual?: ReactNode;
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImageClassName?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  kpis: FeatureKpi[];
  painTitle: string;
  painDescription: string;
  painPoints: string[];
  benefitsTitle: string;
  benefits: FeaturePoint[];
  stepsTitle: string;
  steps: FeatureStep[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  sectionBeforeFinalCta?: ReactNode;
  finalCtaBackgroundImageSrc?: string;
  faqTitle?: string;
  faqItems?: FeatureFaqItem[];
};

function withLocale(locale: string, href: string): string {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href}`;
}

export default function FeatureMasterPage({
  locale,
  title,
  highlight,
  description,
  heroBackgroundImageSrc,
  heroBackgroundPosition,
  heroTopRightLogoSrc,
  heroTopRightLogoAlt,
  heroVisual,
  heroImageSrc,
  heroImageAlt,
  heroImageClassName,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  painPoints,
  finalCtaTitle,
  finalCtaDescription,
  sectionBeforeFinalCta,
  finalCtaBackgroundImageSrc,
  faqTitle,
  faqItems = [],
}: FeatureMasterPageProps) {
  const hasHeroBackgroundImage = Boolean(heroBackgroundImageSrc);

  return (
    <main className="bg-white text-slate-900">
      <section className="px-4 pb-16 pt-44 md:px-6 md:pb-20 md:pt-52">
        <div
          className="relative mx-auto max-w-[1320px] rounded-[36px] border border-sky-100 bg-white bg-cover bg-center bg-no-repeat p-6 shadow-[0_24px_60px_rgba(148,163,184,0.16)] md:p-8 lg:p-10"
          style={heroBackgroundImageSrc ? {
            backgroundImage: `linear-gradient(90deg, rgba(7, 17, 34, 0.82) 0%, rgba(7, 17, 34, 0.66) 38%, rgba(7, 17, 34, 0.32) 68%, rgba(7, 17, 34, 0.14) 100%), url('${heroBackgroundImageSrc}')`,
            backgroundPosition: heroBackgroundPosition,
          } : undefined}
        >
          {heroTopRightLogoSrc ? (
            <img
              src={heroTopRightLogoSrc}
              alt={heroTopRightLogoAlt ?? 'Logo'}
              className="pointer-events-none absolute right-5 top-2 z-20 h-auto w-28 opacity-95 md:right-7 md:top-3 md:w-32 lg:w-36"
              loading="eager"
              decoding="async"
            />
          ) : null}

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className={`max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl md:leading-[1.02] ${hasHeroBackgroundImage ? 'text-white drop-shadow-[0_8px_24px_rgba(15,23,42,0.45)]' : ''}`}>
                {title}{' '}
                {highlight ? <span className="text-primary">{highlight}</span> : null}
              </h1>

              <p className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-xl ${hasHeroBackgroundImage ? 'text-white/92 drop-shadow-[0_4px_18px_rgba(15,23,42,0.4)]' : 'text-slate-700'}`}>
                {description}
              </p>

              <ul className="mt-6 space-y-2">
                {painPoints.slice(0, 3).map((point) => (
                  <li key={point} className={`flex items-start gap-3 text-sm md:text-base ${hasHeroBackgroundImage ? 'text-white/92 drop-shadow-[0_4px_18px_rgba(15,23,42,0.4)]' : 'text-slate-700'}`}>
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-black text-white">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={withLocale(locale, primaryCtaHref)}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/55 bg-white/16 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(15,23,42,0.22)] backdrop-blur-md transition hover:bg-white/22"
                >
                  {primaryCtaLabel}
                </Link>
                <Link
                  href={withLocale(locale, secondaryCtaHref)}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/55 bg-white/12 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(15,23,42,0.16)] backdrop-blur-md transition hover:bg-white/20"
                >
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>

            {heroVisual ? (
              <div className="flex justify-center lg:justify-center">
                {heroVisual}
              </div>
            ) : heroImageSrc ? (
              <div className="flex justify-center lg:justify-center">
                <div className="w-full max-w-[560px] overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none md:max-w-[620px] md:p-0 lg:max-w-none">
                  <img
                    src={heroImageSrc}
                    alt={heroImageAlt ?? title}
                    className={[
                      "mx-auto block h-auto w-full transform origin-center scale-100 md:-translate-x-4 md:scale-[1.24] lg:-translate-x-8 lg:scale-[1.38]",
                      heroImageClassName ?? "",
                    ].join(" ")}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {sectionBeforeFinalCta ?? null}

      <section className="px-4 pb-16 pt-6 md:px-6 md:pb-24">
        <div
          className="mx-auto max-w-5xl rounded-3xl bg-primary bg-cover bg-center bg-no-repeat p-8 text-center text-white shadow-xl shadow-primary/20 md:p-12"
          style={finalCtaBackgroundImageSrc ? {
            backgroundImage: `linear-gradient(0deg, rgba(2, 11, 28, 0.62), rgba(2, 11, 28, 0.62)), url('${finalCtaBackgroundImageSrc}')`,
          } : undefined}
        >
          <h2 className="text-3xl font-black md:text-4xl">{finalCtaTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/90">{finalCtaDescription}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={withLocale(locale, primaryCtaHref)}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-slate-100"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={withLocale(locale, secondaryCtaHref)}
              className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {faqItems.length > 0 ? (
        <section className="px-4 pb-20 md:px-6 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-4xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
              {faqTitle}
            </h2>

            <div className="mt-10 space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  name="feature-faq-accordion"
                  className="group rounded-3xl border border-white/55 bg-white/38 px-6 py-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white/46"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl font-semibold text-slate-900 marker:content-none">
                    <span>{item.question}</span>
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/45 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.1)] backdrop-blur-md transition group-open:rotate-180">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 max-w-5xl text-lg leading-relaxed text-slate-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}