import FeatureMasterPage from '@/components/sections/FeatureMasterPage';
import AdditionalSalesBentoSection from '@/components/sections/AdditionalSalesBentoSection';
import { AnimatedTestimonialsDemo } from '@/components/sections/AnimatedTestimonialsDemo';
import FeatureSplitImageSection from '@/components/sections/FeatureSplitImageSection';
import ScrollStorySection from '@/components/sections/ScrollStorySection';
import PointerHighlightDemo from '@/components/sections/PointerHighlightDemo';
import ConnectivityPASection from '@/components/sections/ConnectivityPASection';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { BarChart3, Building2 } from 'lucide-react';

export const FEATURE_PAGE_KEYS = [
  'reservations',
  'planningMissions',
  'unifiedMessaging',
  'ownerInterface',
  'additionalSales',
  'statistics',
  'reviews',
  'smartLocks',
] as const;

export type FeaturePageKey = (typeof FEATURE_PAGE_KEYS)[number];

type KpiItem = { value: string; label: string };
type TextItem = { title: string; description: string };
type FaqItem = { question: string; answer: string };
type UnifiedMessagingSplitSectionItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const HERO_IMAGE_BY_PAGE: Record<FeaturePageKey, { src: string; background: string }> = {
  reservations: {
    src: '',
    background: '/images/Page réservation/Image de fond .jpg',
  },
  planningMissions: {
    src: '',
    background: '/images/Page prestataire/josue-michel-MwxsRSG1A2s-unsplash.jpg',
  },
  unifiedMessaging: {
    src: '',
    background: '/images/Messagerie unifiée/eddy-billard-M5UD_FyuDl8-unsplash.jpg',
  },
  ownerInterface: {
    src: '/images/Interface propriétaire/Interface proprio.svg',
    background: '/images/Interface propriétaire/surface-S_YOuAUMm2o-unsplash.jpg',
  },
  additionalSales: {
    src: '',
    background: '/images/Section ventes additionnelles/irvan-maulana-jRCXY5-_Sb8-unsplash.svg',
  },
  statistics: {
    src: '',
    background: '/images/Page statistiques/towfiqu-barbhuiya-nApaSgkzaxg-unsplash.jpg',
  },
  reviews: {
    src: '/images/Page réservation/Black Green Modern Gradient Liquid Glass Style Social Media Trending about Stock and Crypto Instagram Post (1).svg',
    background: '/images/Page réservation/Image de fond .jpg',
  },
  smartLocks: {
    src: '/images/serrures/Design site Biloki (4).svg',
    background: '/images/serrures/sebastian-scholz-nuki-Fh3Dtg6QX4Q-unsplash.jpg',
  },
};

export async function getLocalizedFeatureMetadata(locale: string, pageKey: FeaturePageKey) {
  const t = await getTranslations({ locale, namespace: `featureMasterPages.pages.${pageKey}` });

  return {
    title: t('metadataTitle'),
    description: t('metadataDescription'),
  };
}

type LocalizedFeatureMasterPageProps = {
  locale: string;
  pageKey: FeaturePageKey;
};

export default async function LocalizedFeatureMasterPage({ locale, pageKey }: LocalizedFeatureMasterPageProps) {
  const pageT = await getTranslations({ locale, namespace: `featureMasterPages.pages.${pageKey}` });
  const commonT = await getTranslations({ locale, namespace: 'featureMasterPages.common' });

  const kpis = commonT.raw('kpis') as KpiItem[];
  const painPoints = pageT.has('painPoints')
    ? (pageT.raw('painPoints') as string[])
    : (commonT.raw('painPoints') as string[]);
  const benefits = commonT.raw('benefits') as TextItem[];
  const steps = commonT.raw('steps') as TextItem[];
  const faqTitle = pageT.has('faqTitle') ? pageT('faqTitle') : commonT('faqTitle');
  const faqItems = pageT.has('faqItems') ? (pageT.raw('faqItems') as FaqItem[]) : (commonT.raw('faqItems') as FaqItem[]);
  const finalCtaTitle = pageT.has('finalCtaTitle') ? pageT('finalCtaTitle') : commonT('finalCtaTitle');
  const finalCtaDescription = pageT.has('finalCtaDescription')
    ? pageT('finalCtaDescription')
    : commonT('finalCtaDescription');

  const statisticsSplitSection = pageKey === 'statistics'
    ? {
        badge: undefined,
        title: pageT('splitTitle'),
        description: pageT('splitDescription'),
        image: '/images/Page statistiques/pexels-burst-374085.jpg',
        imageAlt: pageT('splitImageAlt'),
        imageClassName: 'object-cover object-center scale-[1.08] md:scale-[1.12]',
        imageViewportClassName: 'bg-white',
        cta: {
          label: pageT('splitCtaLabel'),
          href: '/reserver-demo',
        },
        points: [
          {
            icon: <BarChart3 className="h-5 w-5" />,
            title: pageT('splitPoints.0.title'),
            description: pageT('splitPoints.0.description'),
          },
          {
            icon: <Building2 className="h-5 w-5" />,
            title: pageT('splitPoints.1.title'),
            description: pageT('splitPoints.1.description'),
          },
        ],
      }
    : null;

  const statisticsSplitSectionSecondary = pageKey === 'statistics'
    ? {
        badge: undefined,
        title: pageT('split2Title'),
        description: pageT('split2Description'),
        image: '/images/Page statistiques/pexels-jessica-olivella-555697728-37809796.jpg',
        imageAlt: pageT('split2ImageAlt'),
        imageClassName: 'object-cover object-center scale-[1.08] md:scale-[1.12]',
        imageViewportClassName: 'bg-white',
        cta: {
          label: pageT('split2CtaLabel'),
          href: '/reserver-demo',
        },
        points: [
          {
            icon: <BarChart3 className="h-5 w-5" />,
            title: pageT('split2Points.0.title'),
            description: pageT('split2Points.0.description'),
          },
          {
            icon: <Building2 className="h-5 w-5" />,
            title: pageT('split2Points.1.title'),
            description: pageT('split2Points.1.description'),
          },
        ],
      }
    : null;

  const ownerInterfaceSplitSection = pageKey === 'ownerInterface'
    ? {
        introTitle: pageT('ownerSplitTitle'),
        introDescription: pageT('ownerSplitDescription'),
        introCtaLabel: pageT('ownerSplitCtaLabel'),
        sections: [
          {
            title: pageT('ownerSplitPoints.0.title'),
            description: pageT('ownerSplitPoints.0.description'),
            image: '/images/Interface propriétaire/Revenu claire.png',
            imageAlt: pageT('ownerSplitImageAlt'),
            imageClassName: 'object-contain bg-white',
            cta: {
              label: pageT('ownerSplitCtaLabel'),
              href: '/reserver-demo',
            },
          },
          {
            title: pageT('ownerSplitPoints.1.title'),
            description: pageT('ownerSplitPoints.1.description'),
            image: '/images/Interface propriétaire/priscilla-du-preez-vOeB66Yoriw-unsplash (1).jpg',
            imageAlt: pageT('ownerSplitImageAlt'),
            cta: {
              label: pageT('ownerSplitCtaLabel'),
              href: '/reserver-demo',
            },
          },
          {
            title: pageT('ownerSplitPoints.2.title'),
            description: pageT('ownerSplitPoints.2.description'),
            image: '/images/Interface propriétaire/surface-X1GZqv-F7Tw-unsplash (1).jpg',
            imageAlt: pageT('ownerSplitImageAlt'),
            cta: {
              label: pageT('ownerSplitCtaLabel'),
              href: '/reserver-demo',
            },
          },
        ],
      }
    : null;

  const smartLocksSplitSection = pageKey === 'smartLocks'
    ? (() => {
        const rawPoints = pageT.raw('locksSplitPoints') as Array<{
          title: string;
          description: string;
          bullets?: string[];
        }>;
        const pointsToRender = locale.startsWith('fr') ? rawPoints : rawPoints.slice(0, 3);
        const images = [
          '/images/serrures/Capture d’écran 2026-07-29 à 14.05.20.png',
          '/images/Page prestataire/Capture d’écran 2026-07-15 à 19.02.01.png',
          '/images/serrures/Etape 2.svg',
        ];
        return {
          introTitle: pageT('locksSplitTitle'),
          introDescription: pageT('locksSplitDescription'),
          introCtaLabel: pageT('locksSplitCtaLabel'),
          sections: pointsToRender.map((point, index) => ({
            title: point.title,
            description: point.description,
            bullets: point.bullets ?? [],
            image: images[index] ?? images[0],
            imageAlt: pageT('locksSplitImageAlt'),
            imageClassName: index === 1
              ? 'object-contain object-center bg-white p-2 md:p-3'
              : 'object-contain bg-white',
            cta: {
              label: pageT('locksSplitCtaLabel'),
              href: '/connexions-api',
            },
          })),
        };
      })()
    : null;

  const unifiedMessagingSplitSections = pageKey === 'unifiedMessaging'
    ? (() => {
        if (!pageT.has('unifiedMessagingSplitSections')) {
          return [] as UnifiedMessagingSplitSectionItem[];
        }

        const rawSections = pageT.raw('unifiedMessagingSplitSections');
        return Array.isArray(rawSections)
          ? (rawSections as UnifiedMessagingSplitSectionItem[])
          : ([] as UnifiedMessagingSplitSectionItem[]);
      })()
    : null;

  const hero = HERO_IMAGE_BY_PAGE[pageKey];
  const heroBackgroundPosition = pageKey === 'additionalSales' ? '74% 18%' : undefined;
  const heroTopRightLogoSrc = pageKey === 'additionalSales' ? '/logos/logo-biloki.png' : undefined;

  return (
    <FeatureMasterPage
      locale={locale}
      title={pageT('title')}
      highlight={pageT('highlight')}
      description={pageT('description')}
      heroBackgroundImageSrc={hero.background}
      heroBackgroundPosition={heroBackgroundPosition}
      heroTopRightLogoSrc={heroTopRightLogoSrc}
      heroTopRightLogoAlt="Biloki"
      heroImageSrc={hero.src}
      heroImageAlt={pageT('heroImageAlt')}
      heroImageClassName={
        pageKey === 'ownerInterface'
          ? 'md:translate-x-2 md:scale-[1.6] lg:translate-x-6 lg:scale-[1.95] xl:scale-[2.1]'
          : pageKey === 'smartLocks'
            ? 'md:!translate-x-7 md:!scale-[1.6] lg:!translate-x-11 lg:!scale-[1.85] xl:!translate-x-15 xl:!scale-[2.05]'
          : undefined
      }
      primaryCtaLabel={commonT('primaryCtaLabel')}
      primaryCtaHref="/reserver-demo"
      secondaryCtaLabel={commonT('secondaryCtaLabel')}
      secondaryCtaHref="/commencer-gratuitement"
      kpis={kpis}
      painTitle={commonT('painTitle')}
      painDescription={commonT('painDescription')}
      painPoints={painPoints}
      benefitsTitle={commonT('benefitsTitle')}
      benefits={benefits}
      stepsTitle={commonT('stepsTitle')}
      steps={steps}
      finalCtaTitle={finalCtaTitle}
      finalCtaDescription={finalCtaDescription}
      finalCtaBackgroundImageSrc={
        pageKey === 'statistics'
          ? '/images/Page statistiques/pexels-pripicart-2346091.jpg'
        : pageKey === 'additionalSales'
          ? '/images/Section ventes additionnelles/blake-wisz-Xn5FbEM9564-unsplash.jpg'
          : pageKey === 'unifiedMessaging'
            ? '/images/Messagerie unifiée/pexels-vafphotos-14990520.jpg'
          : pageKey === 'ownerInterface'
            ? '/images/Interface propriétaire/pexels-ken123films-635017.jpg'
          : pageKey === 'planningMissions'
              ? '/images/Page prestataire/pexels-jan-van-der-wolf-11680885-15794320.jpg'
          : pageKey === 'reservations'
            ? '/images/Page réservation/danilo-rios-AgK_XAqSbfk-unsplash.jpg'
          : '/images/Gros CTA/riley-brockett-vHSpG5kgUVE-unsplash.jpg'
      }
      faqTitle={faqTitle}
      faqItems={faqItems}
      sectionBeforeFinalCta={
        <>
          {pageKey === 'additionalSales' ? <AdditionalSalesBentoSection locale={locale} /> : null}
          {unifiedMessagingSplitSections
            ? unifiedMessagingSplitSections.map((section, index) => (
                <FeatureSplitImageSection
                  key={section.title}
                  locale={locale}
                  title={section.title}
                  description={section.description}
                  image={section.imageSrc}
                  imageAlt={section.imageAlt}
                  imageFrameClassName="bg-white"
                  imageViewportClassName="aspect-[16/10]"
                  imageClassName={index === 1 ? 'object-cover' : 'object-contain p-3 md:p-4'}
                  twoToneTitle
                  cta={{
                    label: commonT('primaryCtaLabel'),
                    href: '/reserver-demo',
                  }}
                  reversed={index % 2 === 1}
                />
              ))
            : null}
          <ScrollStorySection
            key={`scroll-story-${pageKey}`}
            namespace={
              pageKey === 'additionalSales'
                ? 'featureSections.additionalSalesScrollStory'
                : pageKey === 'statistics'
                  ? 'featureSections.statisticsScrollStory'
                  : pageKey === 'reservations'
                    ? 'featureSections.reservationsScrollStory'
                    : pageKey === 'unifiedMessaging'
                      ? 'featureSections.unifiedMessagingScrollStory'
                      : pageKey === 'ownerInterface'
                        ? 'featureSections.ownerInterfaceScrollStory'
                        : pageKey === 'smartLocks'
                          ? 'featureSections.smartLocksScrollStory'
                          : 'featureSections.scrollStory'
            }
            backdropVariant={
              pageKey === 'planningMissions'
                ? 'planningMissions'
                : pageKey === 'unifiedMessaging'
                  ? 'unifiedMessaging'
                  : undefined
            }
          />
          {ownerInterfaceSplitSection ? (
            <>
              <section className="w-full bg-white px-4 pt-16 md:px-6 md:pt-20">
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                    {ownerInterfaceSplitSection.introTitle}
                  </h2>
                  <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
                    {ownerInterfaceSplitSection.introDescription}
                  </p>
                  <div className="mt-8">
                    <Link
                      href={`/${locale}/reserver-demo`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(4,164,255,0.24)] transition hover:bg-primary/90"
                    >
                      {ownerInterfaceSplitSection.introCtaLabel}
                    </Link>
                  </div>
                </div>
              </section>

              {ownerInterfaceSplitSection.sections.map((section, index) => (
                <FeatureSplitImageSection
                  key={section.title}
                  locale={locale}
                  title={section.title}
                  description={section.description}
                  image={section.image}
                  imageAlt={section.imageAlt}
                  imageClassName={section.imageClassName}
                  cta={section.cta}
                  reversed={index % 2 === 1}
                />
              ))}
            </>
          ) : null}
          {smartLocksSplitSection ? (
            <>
              <section className="w-full bg-white px-4 pt-16 md:px-6 md:pt-20">
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                    {smartLocksSplitSection.introTitle}
                  </h2>
                  <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
                    {smartLocksSplitSection.introDescription}
                  </p>
                  <div className="mt-8">
                    <Link
                      href={`/${locale}/connexions-api`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(4,164,255,0.24)] transition hover:bg-primary/90"
                    >
                      {smartLocksSplitSection.introCtaLabel}
                    </Link>
                  </div>
                </div>
              </section>

              {smartLocksSplitSection.sections.map((section, index) => (
                <FeatureSplitImageSection
                  key={section.title}
                  locale={locale}
                  title={section.title}
                  description={section.description}
                  bullets={section.bullets}
                  image={section.image}
                  imageAlt={section.imageAlt}
                  imageClassName={section.imageClassName}
                  cta={section.cta}
                  reversed={index % 2 === 1}
                />
              ))}
            </>
          ) : null}
          {pageKey === 'reservations' ? <ConnectivityPASection /> : null}
          {statisticsSplitSection ? (
            <FeatureSplitImageSection
              locale={locale}
              badge={statisticsSplitSection.badge}
              title={statisticsSplitSection.title}
              description={statisticsSplitSection.description}
              descriptionClassName="text-sm leading-relaxed md:text-[0.98rem] lg:text-base"
              image={statisticsSplitSection.image}
              imageAlt={statisticsSplitSection.imageAlt}
              imageClassName={statisticsSplitSection.imageClassName}
              imageViewportClassName={statisticsSplitSection.imageViewportClassName}
              points={statisticsSplitSection.points}
              cta={statisticsSplitSection.cta}
            />
          ) : null}
          {statisticsSplitSectionSecondary ? (
            <FeatureSplitImageSection
              locale={locale}
              badge={statisticsSplitSectionSecondary.badge}
              title={statisticsSplitSectionSecondary.title}
              description={statisticsSplitSectionSecondary.description}
              descriptionClassName="text-sm leading-relaxed md:text-[0.98rem] lg:text-base"
              image={statisticsSplitSectionSecondary.image}
              imageAlt={statisticsSplitSectionSecondary.imageAlt}
              imageClassName={statisticsSplitSectionSecondary.imageClassName}
              imageViewportClassName={statisticsSplitSectionSecondary.imageViewportClassName}
              points={statisticsSplitSectionSecondary.points}
              cta={statisticsSplitSectionSecondary.cta}
              reversed
            />
          ) : null}
          {pageKey !== 'unifiedMessaging' ? (
            <PointerHighlightDemo
              namespace={
                pageKey === 'additionalSales'
                  ? 'featureSections.additionalSalesPointerHighlight'
                  : pageKey === 'statistics'
                    ? 'featureSections.statisticsPointerHighlight'
                  : pageKey === 'reservations'
                    ? 'featureSections.reservationsPointerHighlight'
                  : pageKey === 'smartLocks'
                    ? 'featureSections.smartLocksPointerHighlight'
                  : pageKey === 'ownerInterface'
                    ? 'featureSections.ownerInterfacePointerHighlight'
                  : 'featureSections.pointerHighlight'
              }
            />
          ) : null}
          {pageKey === 'additionalSales' ? (
            <AnimatedTestimonialsDemo
              namespace="testimonialsAdditionalSales"
              showNote={false}
            />
          ) : null}
        </>
      }
    />
  );
}
