import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales Biloki",
  description: "Mentions légales et informations juridiques concernant Biloki et son utilisation.",
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
