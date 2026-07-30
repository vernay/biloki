import Image from 'next/image';
import type { ReactNode } from 'react';
import Link from 'next/link';

export type FeatureSplitPoint = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type FeatureSplitCta = {
  label: string;
  href: string;
};

type FeatureSplitImageSectionProps = {
  badge?: string;
  title: string;
  description: string;
  descriptionClassName?: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  imageFrameClassName?: string;
  imageViewportClassName?: string;
  bullets?: string[];
  points?: FeatureSplitPoint[];
  cta?: FeatureSplitCta;
  twoToneTitle?: boolean;
  reversed?: boolean;
  locale?: string;
  className?: string;
};

function withLocale(href: string, locale?: string) {
  if (!href.startsWith('/')) return href;
  if (!locale) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href}`;
}

export default function FeatureSplitImageSection({
  badge,
  title,
  description,
  descriptionClassName,
  image,
  imageAlt,
  imageClassName,
  imageFrameClassName,
  imageViewportClassName,
  bullets = [],
  points = [],
  cta,
  twoToneTitle = false,
  reversed = false,
  locale,
  className = '',
}: FeatureSplitImageSectionProps) {
  const textColumnOrder = reversed ? 'md:order-1' : 'md:order-2';
  const imageColumnOrder = reversed ? 'md:order-2' : 'md:order-1';
  const hasPoints = points.length > 0;
  const hasBullets = bullets.length > 0;
  const titleWords = title.trim().split(/\s+/);
  const splitIndex = Math.max(1, Math.ceil(titleWords.length / 2));
  const titleFirstPart = titleWords.slice(0, splitIndex).join(' ');
  const titleSecondPart = titleWords.slice(splitIndex).join(' ');

  return (
    <section className={`w-full bg-white px-4 py-12 md:px-6 md:py-16 ${className}`.trim()}>
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
        <div className={imageColumnOrder}>
          <div className={[
            'relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.08)]',
            imageFrameClassName ?? '',
          ].join(' ').trim()}>
            <div className={[
              'relative aspect-[4/3] w-full md:aspect-[5/4] lg:aspect-[6/5]',
              imageViewportClassName ?? '',
            ].join(' ').trim()}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={imageClassName ?? 'object-cover'}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>

        <div className={textColumnOrder}>
          <div className="max-w-xl">
            {badge ? (
              <p className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                {badge}
              </p>
            ) : null}

            <h2 className={`${badge ? 'mt-5' : ''} text-3xl font-black tracking-tight md:text-4xl lg:text-5xl`.trim()}>
              {twoToneTitle ? (
                <>
                  <span className="text-slate-950">{titleFirstPart}</span>
                  {titleSecondPart ? <span className="text-primary"> {titleSecondPart}</span> : null}
                </>
              ) : (
                <span className="text-slate-950">{title}</span>
              )}
            </h2>

            <p className={`mt-4 text-base leading-relaxed text-slate-600 md:text-lg ${descriptionClassName ?? ''}`.trim()}>
              {description}
            </p>

            {hasBullets ? (
              <ul className="mt-5 space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700 md:text-base">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {hasPoints ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {points.map((point) => (
                  <article
                    key={`${point.title}-${point.description}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-slate-200">
                        {point.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-950">{point.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{point.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {cta ? (
              <div className="mt-8">
                <Link
                  href={withLocale(cta.href, locale)}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(4,164,255,0.24)] transition hover:bg-primary/90"
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}