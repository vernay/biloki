import { getTranslations } from 'next-intl/server';
import { type LucideIcon, ChartColumnIncreasing, CreditCard, Sparkles, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';

type AdditionalSalesBentoSectionProps = {
  locale: string;
  ctaHref?: string;
};

type AdditionalSalesCard = {
  Icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  cta: string;
  href?: string;
  className?: string;
  innerCardClassName?: string;
  innerOverlayClassName?: string;
  iconWrapClassName?: string;
  ctaClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  ctaWrapClassName?: string;
  hideInnerChrome?: boolean;
  background: ReactNode;
};

function withLocale(locale: string, href: string): string {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href}`;
}

function RevenuePill({ label, amount, toneClassName }: { label: string; amount: string; toneClassName: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/70 bg-white/70 px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-lg',
        toneClassName,
      )}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-black text-slate-900">{amount}</div>
    </div>
  );
}

export default async function AdditionalSalesBentoSection({
  locale,
  ctaHref = '/commencer-gratuitement',
}: AdditionalSalesBentoSectionProps) {
  const t = await getTranslations({ locale, namespace: 'featureSections.additionalSalesBento' });
  const localizedCtaHref = withLocale(locale, ctaHref);

  const cards: AdditionalSalesCard[] = [
    {
      Icon: ShoppingBag,
      title: t('cards.shop.title'),
      value: t('cards.shop.value'),
      description: t('cards.shop.description'),
      cta: t('cards.shop.cta'),
      href: localizedCtaHref,
      className: 'col-span-3 lg:col-span-2',
      innerCardClassName: 'h-full w-full max-w-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 md:w-full md:p-0',
      innerOverlayClassName: 'from-amber-100/50 via-white/14 to-orange-100/12',
      iconWrapClassName: 'border-amber-200/70 bg-amber-100/72 text-amber-800',
      ctaClassName: 'text-amber-700',
      valueClassName: 'text-amber-600 text-[3.5rem] leading-none md:text-[4.1rem]',
      titleClassName: 'max-w-[20rem] text-[1.8rem] leading-[1.02] md:text-[1.95rem]',
      descriptionClassName: 'max-w-[31rem] text-[0.98rem] leading-relaxed md:text-[1rem]',
      contentClassName: 'justify-center py-3 md:py-4',
      ctaWrapClassName: 'mt-5 pt-0',
      hideInnerChrome: true,
      background: (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/35 via-orange-50/22 to-rose-100/18" />
          <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.72),_transparent_65%)]" />
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 opacity-35 md:grid-cols-3">
            <RevenuePill label={t('cards.shop.pills.1.label')} amount={t('cards.shop.pills.1.amount')} toneClassName="border-amber-100/75 bg-amber-50/78" />
            <RevenuePill label={t('cards.shop.pills.2.label')} amount={t('cards.shop.pills.2.amount')} toneClassName="border-orange-100/75 bg-orange-50/78" />
            <RevenuePill label={t('cards.shop.pills.3.label')} amount={t('cards.shop.pills.3.amount')} toneClassName="border-rose-100/75 bg-rose-50/78" />
          </div>
        </>
      ),
    },
    {
      Icon: CreditCard,
      title: t('cards.stripe.title'),
      value: t('cards.stripe.value'),
      description: t('cards.stripe.description'),
      cta: t('cards.stripe.cta'),
      href: localizedCtaHref,
      className: 'col-span-3 lg:col-span-1',
      innerCardClassName: 'h-full w-full max-w-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 md:w-full md:p-0',
      innerOverlayClassName: 'from-sky-100/50 via-white/14 to-cyan-100/12',
      iconWrapClassName: 'border-sky-200/70 bg-sky-100/74 text-sky-800',
      ctaClassName: 'text-sky-700',
      valueClassName: 'text-sky-600 text-[3.35rem] leading-none md:text-[3.9rem]',
      titleClassName: 'max-w-[13rem] text-[1.65rem] leading-[1.02]',
      descriptionClassName: 'max-w-[15rem] text-[0.96rem] leading-relaxed',
      contentClassName: 'justify-center py-2',
      ctaWrapClassName: 'mt-4 pt-0',
      hideInnerChrome: true,
      background: (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/32 via-cyan-50/18 to-blue-100/20" />
          <div className="absolute left-5 top-20 w-[calc(100%-2.5rem)] rounded-[1.4rem] border border-white/70 bg-white/72 p-4 opacity-25 shadow-[0_16px_32px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>{t('cards.stripe.panel.label')}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">{t('cards.stripe.panel.status')}</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span>{t('cards.stripe.panel.rows.1')}</span>
                <span>+48 €</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span>{t('cards.stripe.panel.rows.2')}</span>
                <span>+22 €</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span>{t('cards.stripe.panel.rows.3')}</span>
                <span>+15 €</span>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      Icon: Sparkles,
      title: t('cards.automation.title'),
      value: t('cards.automation.value'),
      description: t('cards.automation.description'),
      cta: t('cards.automation.cta'),
      href: localizedCtaHref,
      className: 'col-span-3 lg:col-span-1',
      innerCardClassName: 'h-full w-full max-w-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 md:w-full md:p-0',
      innerOverlayClassName: 'from-emerald-100/52 via-white/14 to-lime-100/12',
      iconWrapClassName: 'border-emerald-200/70 bg-emerald-100/74 text-emerald-800',
      ctaClassName: 'text-emerald-700',
      valueClassName: 'text-emerald-600 text-[3rem] leading-none md:text-[3.5rem]',
      titleClassName: 'max-w-[13rem] text-[1.55rem] leading-[1.02]',
      descriptionClassName: 'max-w-[15rem] text-[0.96rem] leading-relaxed',
      contentClassName: 'justify-center py-2',
      ctaWrapClassName: 'mt-4 pt-0',
      hideInnerChrome: true,
      background: (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/32 via-lime-50/18 to-teal-100/18" />
          <div className="absolute left-4 right-4 top-20 space-y-3 opacity-20">
            <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.1)] backdrop-blur-lg">
              {t('cards.automation.steps.1')}
            </div>
            <div className="ml-5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.1)] backdrop-blur-lg">
              {t('cards.automation.steps.2')}
            </div>
            <div className="ml-10 rounded-2xl border border-white/70 bg-white/68 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.1)] backdrop-blur-lg">
              {t('cards.automation.steps.3')}
            </div>
          </div>
        </>
      ),
    },
    {
      Icon: ChartColumnIncreasing,
      title: t('cards.tracking.title'),
      value: t('cards.tracking.value'),
      description: t('cards.tracking.description'),
      cta: t('cards.tracking.cta'),
      href: localizedCtaHref,
      className: 'col-span-3 lg:col-span-2',
      innerCardClassName: 'h-full w-full max-w-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 md:w-full md:p-0',
      innerOverlayClassName: 'from-violet-100/52 via-white/14 to-fuchsia-100/12',
      iconWrapClassName: 'border-violet-200/70 bg-violet-100/74 text-violet-800',
      ctaClassName: 'text-violet-700',
      valueClassName: 'text-violet-600 text-[3.45rem] leading-none md:text-[4rem]',
      titleClassName: 'max-w-[18rem] text-[1.75rem] leading-[1.02] md:text-[1.9rem]',
      descriptionClassName: 'max-w-[27rem] text-[0.98rem] leading-relaxed md:text-[1rem]',
      contentClassName: 'justify-center py-3 md:py-4',
      ctaWrapClassName: 'mt-5 pt-0',
      hideInnerChrome: true,
      background: (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/32 via-fuchsia-50/18 to-slate-50/14" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/70 bg-white/72 p-4 opacity-25 shadow-[0_16px_32px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              <span>{t('cards.tracking.panel.label')}</span>
              <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">{t('cards.tracking.panel.metric')}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">{t('cards.tracking.panel.kpis.1.label')}</div>
                <div className="mt-1 text-xl font-black text-slate-900">{t('cards.tracking.panel.kpis.1.value')}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">{t('cards.tracking.panel.kpis.2.label')}</div>
                <div className="mt-1 text-xl font-black text-slate-900">{t('cards.tracking.panel.kpis.2.value')}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">{t('cards.tracking.panel.kpis.3.label')}</div>
                <div className="mt-1 text-xl font-black text-slate-900">{t('cards.tracking.panel.kpis.3.value')}</div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <section className="px-4 pb-6 pt-0 md:px-6 md:pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            {t('title')} <span className="text-primary">{t('highlight')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
            {t('description')}
          </p>
        </div>

        <BentoGrid className="mt-10 [&_.group]:bg-slate-100">
          {cards.map((card) => (
            <BentoCard key={card.title} name={card.title} {...card} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}