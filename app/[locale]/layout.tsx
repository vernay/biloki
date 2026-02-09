import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientOverlays from "@/components/layout/ClientOverlays";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const headerList = await headers();
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
    metadataBase: new URL("https://www.biloki.fr"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...languages,
        "x-default": `/${defaultLocale}${basePath}`,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-canonical-path") || `/${locale}`;
  const baseUrl = "https://www.biloki.fr";
  const jsonLd = buildJsonLd({ baseUrl, locale, pathname });
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-16 md:pt-0">
        {children}
      </main>
      <Footer />
      <ClientOverlays />
    </NextIntlClientProvider>
  );
}

function buildJsonLd({
  baseUrl,
  locale,
  pathname,
}: {
  baseUrl: string;
  locale: string;
  pathname: string;
}) {
  const localePrefix = `/${locale}`;
  let basePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length)
    : pathname;

  if (basePath && !basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  const canonicalPath = `${localePrefix}${basePath}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  const breadcrumbs = buildBreadcrumbs({ baseUrl, locale, basePath });

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Biloki",
      url: baseUrl,
      logo: `${baseUrl}/logos/biloki-logo-full.png`,
      sameAs: [
        "https://www.instagram.com/bilokiofficial/",
        "https://www.linkedin.com/company/biloki/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: baseUrl,
      name: "Biloki",
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: canonicalUrl,
      name: "Biloki",
      inLanguage: locale,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
    },
  ];
}

function buildBreadcrumbs({
  baseUrl,
  locale,
  basePath,
}: {
  baseUrl: string;
  locale: string;
  basePath: string;
}) {
  const segments = basePath
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      raw: segment,
      label: humanizeSegment(segment),
    }));

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: `${baseUrl}/${locale}`,
    },
  ];

  let currentPath = `/${locale}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment.raw}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: segment.label,
      item: `${baseUrl}${currentPath}`,
    });
  });

  return items;
}

function humanizeSegment(segment: string) {
  const decoded = decodeURIComponent(segment);
  const withSpaces = decoded.replace(/[-_]+/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
