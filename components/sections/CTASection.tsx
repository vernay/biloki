'use client';

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import WebappLink from "@/components/ui/WebappLink";
import HandDrawnUnderline from "@/components/ui/HandDrawnUnderline";
import { EvervaultCardDemo } from "@/components/ui/evervault-card-demo";

export default function CTASection() {
  const locale = useLocale();
  const tHero = useTranslations("cta.hero");

  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-2 md:mx-4 lg:mx-6">
        <div className="relative mx-auto max-w-[1540px] overflow-hidden rounded-[2rem] min-h-[470px] shadow-[0_35px_90px_rgba(2,12,27,0.55)] md:min-h-[620px] md:rounded-[2.6rem]">
          <Image
            src="/images/Gros CTA/nahide-erol-na_sPDkhveI-unsplash.jpg"
            alt="Salon moderne"
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#04162ccc] via-[#06244599] to-[#02091666]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

          <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:right-14">
            <div className="w-[390px]">
              <EvervaultCardDemo />
            </div>
          </div>

          <div className="relative z-10 h-full flex items-end md:items-center">
            <div className="w-full max-w-[760px] px-6 pb-8 pt-10 md:px-10 md:py-10 lg:px-14 lg:py-14">
              <span className="mb-4 flex w-fit items-center rounded-full border border-white/35 bg-white/20 px-4 py-1.5 text-sm font-medium text-white/95 backdrop-blur">
                {tHero("kicker")}
              </span>

              <div className="relative inline-block">
                <h2 className="text-[2.5rem] leading-[0.92] font-extrabold uppercase tracking-tight text-white sm:text-[3.2rem] md:text-[4.4rem]">
                  {tHero("title")}
                  <br />
                  {tHero("titleHighlight")}
                </h2>
                <div className="absolute -bottom-4 left-0 w-full max-w-[360px]">
                  <HandDrawnUnderline color="#01a4ff" className="w-full" width={360} height={18} />
                </div>
              </div>

              <p className="mt-8 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                {tHero("description")}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`/${locale}/reserver-demo`}
                  className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/15 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/25"
                >
                  {tHero("bookDemo")}
                </Link>

                <WebappLink
                  type="register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01A4FF] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0194e6]"
                >
                  {tHero("startTrial")}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </WebappLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
