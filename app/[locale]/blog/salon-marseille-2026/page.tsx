import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import SalonContent from "./_components/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (messages as any).seoMetadata;

  const title = seoMetadata?.["blog-salon"]?.title || "Biloki";
  const description = seoMetadata?.["blog-salon"]?.description || "";

  return {
    title,
    description,
  };
}

export default function SalonMarseille2026Page() {
  return <SalonContent />;
}
