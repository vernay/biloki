import type { Metadata } from "next";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (messages as any).seoMetadata;

  const title = seoMetadata?.careers?.title || "Biloki";
  const description = seoMetadata?.careers?.description || "";

  return {
    title,
    description,
  };
}

export default function CarriereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
