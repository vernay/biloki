import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Se connecter à Biloki",
  description: "Connectez-vous à votre compte Biloki pour accéder à votre tableau de bord.",
};

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
