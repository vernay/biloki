import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serrures connectées Biloki - Gestion d'accès automatisée",
  description: "Automatisez l'accès à vos logements. Intégration avec les principales serrures connectées du marché.",
};

export default function SerruresConnecteesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
