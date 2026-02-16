import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez Biloki - Support et demandes commerciales",
  description: "Besoin d'aide ? Contactez notre équipe. Nous répondons rapidement à vos questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
