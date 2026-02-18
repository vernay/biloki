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
      <body>
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
