import type { Metadata } from 'next';
import LocalizedFeatureMasterPage, {
  getLocalizedFeatureMetadata,
} from '@/components/sections/LocalizedFeatureMasterPage';

type PlanningMissionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PlanningMissionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedFeatureMetadata(locale, 'planningMissions');
}

export default async function PlanningMissionsPage({
  params,
}: PlanningMissionsPageProps) {
  const { locale } = await params;
  return <LocalizedFeatureMasterPage locale={locale} pageKey="planningMissions" />;
}
