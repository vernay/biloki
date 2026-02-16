import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channel Manager Biloki - Synchronisation multi-plateformes",
  description: "Synchronisez vos calendriers et tarifs sur Airbnb, Booking, Vrbo et autres OTA en temps réel.",
};

export default function ChannelManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
