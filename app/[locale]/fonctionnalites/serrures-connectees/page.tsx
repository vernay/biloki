import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type SmartLocksPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: SmartLocksPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'smartLocks');
}

export default async function SmartLocksPage({
  params,
}: SmartLocksPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="smartLocks" />;
}
