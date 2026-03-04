import { redirect } from 'next/navigation';
import { WEBAPP_LOGIN_URL } from '@/lib/config';

export default async function ConnexionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`${WEBAPP_LOGIN_URL}?lang=${locale}`);
}
