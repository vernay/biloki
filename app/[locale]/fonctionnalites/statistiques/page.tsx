import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type StatisticsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: StatisticsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'statistics');
}

export default async function StatisticsPage({
  params,
}: StatisticsPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="statistics" />;
}
