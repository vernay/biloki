import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejoignez Biloki - Offres d'emploi et carrière",
  description: "Nous recrutons ! Découvrez nos offres d'emploi et rejoignez une équipe passionnée par la conciergerie.",
};

export default function CarriereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
