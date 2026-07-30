import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type UnifiedMessagingPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: UnifiedMessagingPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'unifiedMessaging');
}

export default async function UnifiedMessagingPage({
  params,
}: UnifiedMessagingPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="unifiedMessaging" />;
}
