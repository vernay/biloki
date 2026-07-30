import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type ReservationsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ReservationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'reservations');
}

export default async function ReservationsPage({ params }: ReservationsPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="reservations" />;
}
