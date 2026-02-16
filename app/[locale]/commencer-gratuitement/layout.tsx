import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essai gratuit Biloki - 14 jours sans engagement",
  description: "Testez Biloki gratuitement pendant 14 jours. Accès complet à toutes les fonctionnalités, sans carte bancaire.",
};

export default function CommencerGratuitementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
