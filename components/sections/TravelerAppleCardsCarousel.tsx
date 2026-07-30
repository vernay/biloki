"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

export default function TravelerAppleCardsCarousel() {
  const t = useTranslations("travelerInterfacePage.appleCarousel");

  const data = [
    {
      category: t("cards.beforeArrival.category"),
      title: t("cards.beforeArrival.title"),
      src: "/images/Page interface voyageur/3.svg",
      imageClassName: "object-bottom",
      content: (
        <div className="rounded-3xl bg-[#F5F5F7] p-8 md:p-14">
          <p className="mx-auto max-w-3xl text-base font-sans leading-relaxed text-neutral-600 md:text-2xl dark:text-neutral-400">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {t("cards.beforeArrival.lead")}
            </span>{" "}
            {t("cards.beforeArrival.body")}
          </p>
        </div>
      ),
    },
    {
      category: t("cards.duringStay.category"),
      title: t("cards.duringStay.title"),
      src: "/images/Page interface voyageur/2.svg",
      imageClassName: "object-bottom",
      content: (
        <div className="rounded-3xl bg-[#F5F5F7] p-8 md:p-14">
          <p className="mx-auto max-w-3xl text-base font-sans leading-relaxed text-neutral-600 md:text-2xl dark:text-neutral-400">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {t("cards.duringStay.lead")}
            </span>{" "}
            {t("cards.duringStay.body")}
          </p>
        </div>
      ),
    },
    {
      category: t("cards.additionalSales.category"),
      title: t("cards.additionalSales.title"),
      src: "/images/Page interface voyageur/1.svg",
      imageClassName: "object-bottom",
      content: (
        <div className="rounded-3xl bg-[#F5F5F7] p-8 md:p-14">
          <p className="mx-auto max-w-3xl text-base font-sans leading-relaxed text-neutral-600 md:text-2xl dark:text-neutral-400">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {t("cards.additionalSales.lead")}
            </span>{" "}
            {t("cards.additionalSales.body")}
          </p>
        </div>
      ),
    },
    {
      category: t("cards.satisfaction.category"),
      title: t("cards.satisfaction.title"),
      src: "/images/Page interface voyageur/4.svg",
      imageClassName: "object-bottom",
      content: (
        <div className="rounded-3xl bg-[#F5F5F7] p-8 md:p-14">
          <p className="mx-auto max-w-3xl text-base font-sans leading-relaxed text-neutral-600 md:text-2xl dark:text-neutral-400">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {t("cards.satisfaction.lead")}
            </span>{" "}
            {t("cards.satisfaction.body")}
          </p>
        </div>
      ),
    },
  ] as const;

  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="font-sans text-2xl font-black tracking-tight text-neutral-800 md:text-5xl dark:text-neutral-200">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          {t("description")}
        </p>
      </div>
      <Carousel items={cards} />
    </section>
  );
}
