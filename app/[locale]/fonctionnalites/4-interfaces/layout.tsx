import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interface Biloki - Design moderne et intuitif",
  description: "Découvrez l'interface épurée et intuitive de Biloki. Conçue pour la productivité et l'efficacité.",
};

export default function InterfacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
