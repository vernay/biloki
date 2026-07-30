"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  const t = useTranslations("travelerInterfacePage.heroScroll");

  return (
    <div className="flex flex-col overflow-hidden bg-white py-10 md:py-16">
      <ContainerScroll
        contentClassName="overflow-visible rounded-none border-0 bg-transparent shadow-none"
        titleComponent={
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-sky-100/80 bg-white/70 px-6 py-8 shadow-[0_20px_60px_rgba(14,30,57,0.10)] backdrop-blur-2xl md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-x-10 top-3 h-14 rounded-full bg-white/45 blur-2xl" />
            <div className="relative z-10">
              <h2 className="mt-3 text-4xl font-semibold text-slate-950 md:text-6xl">
                {t("title")}
                <br />
                <span className="mt-1 block font-black leading-none text-slate-950">
                  {t("highlight")}
                </span>
              </h2>
            </div>
          </div>
        }
      >
        <div className="px-2 md:px-4">
          <Image
            src="/images/Page interface voyageur/Iphone V2.svg"
            alt={t("imageAlt")}
            width={1400}
            height={720}
            className="mx-auto h-auto max-h-[820px] w-full max-w-[920px] object-contain object-top md:max-h-[920px]"
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
}