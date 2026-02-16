import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies Biloki",
  description: "Informations sur l'utilisation des cookies et gestion de vos préférences.",
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
