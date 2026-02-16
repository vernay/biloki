import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente Biloki",
  description: "Découvrez les conditions générales de vente et conditions d'utilisation de Biloki.",
};

export default function CGVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
