import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type AdditionalSalesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AdditionalSalesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'additionalSales');
}

export default async function AdditionalSalesPage({
  params,
}: AdditionalSalesPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="additionalSales" />;
}
