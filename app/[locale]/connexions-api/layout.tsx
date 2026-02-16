import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexions API Biloki - Intégrations OTA et partenaires",
  description: "Connectez Biloki à vos plateformes : Airbnb, Booking, Airbnb Luxury et autres OTA.",
};

export default function ConnexionsAPILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
