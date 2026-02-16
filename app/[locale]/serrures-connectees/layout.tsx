import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serrures connectées Biloki - Gestion d'accès automatisée",
  description: "Automatisez l'accès à vos logements avec nos intégrations de serrures connectées.",
};

export default function SerrruresConnecteesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
