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

  const title = seoMetadata?.trial?.title || "Biloki";
  const description = seoMetadata?.trial?.description || "";

  return {
    title,
    description,
  };
}

export default function CommencerGratuitementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
