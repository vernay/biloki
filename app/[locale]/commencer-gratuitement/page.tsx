import { permanentRedirect } from 'next/navigation';

export default async function CommencerGratuitementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  permanentRedirect(`https://app.biloki.fr/register?lang=${locale}`);
}
