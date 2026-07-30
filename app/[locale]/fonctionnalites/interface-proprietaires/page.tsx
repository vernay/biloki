import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type OwnerInterfacePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: OwnerInterfacePageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'ownerInterface');
}

export default async function OwnerInterfacePage({
  params,
}: OwnerInterfacePageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="ownerInterface" />;
}
