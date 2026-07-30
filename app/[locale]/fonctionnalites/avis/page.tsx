import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type ReviewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ReviewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'reviews');
}

export default async function ReviewsPage({
  params,
}: ReviewsPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="reviews" />;
}
