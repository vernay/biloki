import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gagnez en parrainant avec Biloki",
  description: "Parrainez vos amis et gagnez des avantages exclusifs avec notre programme.",
};

export default function ProgrammeParrainageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
