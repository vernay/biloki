import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMS Biloki - Système de gestion de propriétés",
  description: "Gérez tous vos séjours en un seul endroit. Centralisez réservations, calendriers, paiements et tâches.",
};

export default function PMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
