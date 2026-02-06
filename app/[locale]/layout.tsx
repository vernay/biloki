import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import CookieBanner from "@/components/CookieBanner";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const headerList = headers();
  const pathname = headerList.get("x-canonical-path") || `/${locale}`;

  const localePrefix = `/${locale}`;
  let basePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length)
    : pathname;

  if (basePath && !basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  const canonicalPath = `${localePrefix}${basePath}`;
  const languages = Object.fromEntries(
    locales.map((loc) => [loc, `/${loc}${basePath}`])
  );

  return {
    metadataBase: new URL("https://biloki.fr"),
    alternates: {
      canonical: canonicalPath,
      languages,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
      <ChatBot />
    </NextIntlClientProvider>
  );
}
