import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Biloki — Gestion de séjours sans effort",
    template: "%s · Biloki",
  },
  description:
    "Biloki centralise, automatise et orchestre le cycle de vie des séjours pour conciergeries, propriétaires, prestataires et locataires.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#04a4ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
