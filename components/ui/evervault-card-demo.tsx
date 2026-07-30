"use client";
import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { EvervaultCard } from "@/components/ui/evervault-card";

export function EvervaultCardDemo() {
  const locale = useLocale();
  const t = useTranslations("evervaultCardDemo");
  const tCommon = useTranslations("common");

  return (
    <div className="border border-white/30 bg-black/75 flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] rounded-xl backdrop-blur-sm">
      <EvervaultCard
        logoSrc="/logos/logo-biloki.png"
        logoAlt={t("logoAlt")}
        logoWidth={84}
        logoHeight={84}
      />

      <Link
        href={`/${locale}/reserver-demo`}
        className="mt-4 self-center inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white/18"
      >
        {tCommon("bookYourDemo")}
      </Link>
    </div>
  );
}
