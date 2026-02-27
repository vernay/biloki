import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.biloki.fr"),
  title: {
    default: "Biloki — Gestion de séjours sans effort",
    template: "%s · Biloki",
  },
  description:
    "Biloki centralise, automatise et orchestre le cycle de vie des séjours pour conciergeries, propriétaires, prestataires et locataires.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#04a4ff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K8Z2WL7B');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8Z2WL7B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* Script HubSpot temporairement commenté pour tester le nouveau chatbot AI
        <Script
          id="hs-script-loader"
          async
          defer
          src="//js-eu1.hs-scripts.com/145156681.js"
        />
        */}
      </body>
    </html>
  );
}
