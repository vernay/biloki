import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S'abonner à Biloki - Gestion de locations saisonnières",
  description: "Choisissez votre plan d'abonnement et commencez à gérer vos séjours efficacement.",
};

export default function SAbonnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
