import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reporting Biloki - Analyses et insights",
  description: "Analysez vos données de gestion. Dashboards détaillés, KPI en temps réel et rapports personnalisés.",
};

export default function ReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
