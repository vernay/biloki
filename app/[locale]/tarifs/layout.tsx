import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs Biloki - Plans flexibles pour conciergeries et propriétaires",
  description: "Découvrez nos plans tarifaires. Calculez le prix selon vos logements. Essai gratuit 14 jours, sans carte bancaire.",
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
