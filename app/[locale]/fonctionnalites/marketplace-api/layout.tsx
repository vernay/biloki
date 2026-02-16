import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace Biloki - Connectez vos prestataires",
  description: "Connectez-vous avec des prestataires vérifiés : nettoyage, maintenance, linge, conciergerie.",
};

export default function MarketplaceAPILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
