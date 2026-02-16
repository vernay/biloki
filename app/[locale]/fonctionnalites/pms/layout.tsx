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

  const title = seoMetadata?.pms?.title || "Biloki";
  const description = seoMetadata?.pms?.description || "";

  return {
    title,
    description,
  };
}

export default function PMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
