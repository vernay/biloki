import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservez une démo gratuite - Biloki",
  description: "Réservez une démonstration gratuite de Biloki avec nos experts.",
};

export default function ReserverDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
