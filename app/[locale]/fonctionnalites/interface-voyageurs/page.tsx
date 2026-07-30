import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FeatureMasterPage from '@/components/sections/FeatureMasterPage';
import { HeroScrollDemo } from '@/components/sections/HeroScrollDemo';
import TravelerAppleCardsCarousel from '@/components/sections/TravelerAppleCardsCarousel';
import AdditionalSalesBentoSection from '@/components/sections/AdditionalSalesBentoSection';

type TravelerInterfacePageProps = {
	params: Promise<{ locale: string }>;
};

type KpiItem = {
	value: string;
	label: string;
};

type BenefitItem = {
	title: string;
	description: string;
};

type StepItem = {
	title: string;
	description: string;
};

type FaqItem = {
	question: string;
	answer: string;
};

export async function generateMetadata({ params }: TravelerInterfacePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'travelerInterfacePage' });

	return {
		title: t('metadataTitle'),
		description: t('metadataDescription'),
	};
}

export default async function TravelerInterfacePage({ params }: TravelerInterfacePageProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'travelerInterfacePage' });

	return (
		<FeatureMasterPage
			locale={locale}
			title={t('title')}
			highlight={t('highlight')}
			description={t('description')}
			heroBackgroundImageSrc="/images/Page interface voyageur/kyle-loftus-ftdfdjMOQxw-unsplash.jpg"
			heroBackgroundPosition="50% 50%"
			heroImageSrc="/images/Page interface voyageur/Iphone V2.svg"
			heroImageAlt={t('heroImageAlt')}
			primaryCtaLabel={t('primaryCtaLabel')}
			primaryCtaHref="/reserver-demo"
			secondaryCtaLabel={t('secondaryCtaLabel')}
			secondaryCtaHref="/commencer-gratuitement"
			kpis={t.raw('kpis') as KpiItem[]}
			painTitle={t('painTitle')}
			painDescription={t('painDescription')}
			painPoints={t.raw('painPoints') as string[]}
			benefitsTitle={t('benefitsTitle')}
			benefits={t.raw('benefits') as BenefitItem[]}
			stepsTitle={t('stepsTitle')}
			steps={t.raw('steps') as StepItem[]}
			sectionBeforeFinalCta={
				<>
					<TravelerAppleCardsCarousel />
					<AdditionalSalesBentoSection locale={locale} ctaHref="/fonctionnalites/ventes-additionnelles" />
					<HeroScrollDemo />
				</>
			}
			finalCtaTitle={t('finalCtaTitle')}
			finalCtaDescription={t('finalCtaDescription')}
			finalCtaBackgroundImageSrc="/images/Gros CTA/pexels-monstera-2117238.jpg"
			faqTitle={t('faqTitle')}
			faqItems={t.raw('faqItems') as FaqItem[]}
		/>
	);
}
