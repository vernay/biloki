"use client";

import {
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  LockKeyholeIcon,
  Share2Icon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

export function BentoDemo() {
  const t = useTranslations("bento");

  const toSingleSentence = (text: string) => {
    const clean = text.replace(/\s+/g, " ").trim();
    const firstSentenceMatch = clean.match(/^.*?[.!?](?=\s|$)/);
    const firstSentence = firstSentenceMatch ? firstSentenceMatch[0].trim() : clean;

    if (firstSentence.length <= 95) {
      return firstSentence;
    }

    return `${firstSentence.slice(0, 92).trimEnd()}...`;
  };

  return (
    <BentoGrid className="[&_.group]:bg-slate-100">
      {[
        {
          Icon: BarChart3Icon,
          name: t("cards.statistics.title"),
          description: toSingleSentence(t("cards.statistics.description")),
          href: "/fonctionnalites/reservations",
          cta: t("cards.statistics.cta"),
          className: "col-span-3 lg:col-span-1",
          innerCardClassName: "border-fuchsia-200/65 bg-fuchsia-50/48",
          innerOverlayClassName: "from-fuchsia-100/50 via-white/14 to-rose-100/12",
          iconWrapClassName: "border-fuchsia-200/70 bg-fuchsia-100/70 text-fuchsia-800",
          ctaClassName: "text-fuchsia-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-rose-200/28 to-orange-100/24" />
          ),
        },
        {
          Icon: FileTextIcon,
          name: t("cards.guideDigital.title"),
          description: toSingleSentence(t("cards.guideDigital.description")),
          href: "/fonctionnalites/interface-voyageurs?view=traveler",
          cta: t("cards.guideDigital.cta"),
          className: "col-span-3 lg:col-span-1",
          innerCardClassName: "border-orange-200/70 bg-orange-50/52",
          innerOverlayClassName: "from-orange-100/52 via-white/14 to-amber-100/12",
          iconWrapClassName: "border-orange-200/70 bg-orange-100/70 text-orange-800",
          ctaClassName: "text-orange-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-amber-50/20" />
          ),
        },
        {
          Icon: BellIcon,
          name: t("cards.notificationCenter.title"),
          description: toSingleSentence(t("cards.notificationCenter.description")),
          href: "/fonctionnalites/planning-missions",
          cta: t("cards.notificationCenter.cta"),
          className: "col-span-3 lg:col-span-1",
          innerCardClassName: "border-emerald-200/68 bg-emerald-50/50",
          innerOverlayClassName: "from-emerald-100/50 via-white/16 to-lime-100/10",
          iconWrapClassName: "border-emerald-200/70 bg-emerald-100/72 text-emerald-800",
          ctaClassName: "text-emerald-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/28 to-lime-50/20" />
          ),
        },
        {
          Icon: Share2Icon,
          name: t("cards.additionalSales.title"),
          description: toSingleSentence(t("cards.additionalSales.description")),
          href: "/fonctionnalites/ventes-additionnelles",
          cta: t("cards.additionalSales.cta"),
          className: "col-span-3 lg:col-span-1",
          innerCardClassName: "border-sky-200/68 bg-sky-50/50",
          innerOverlayClassName: "from-sky-100/50 via-white/16 to-blue-100/12",
          iconWrapClassName: "border-sky-200/70 bg-sky-100/72 text-sky-800",
          ctaClassName: "text-sky-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-blue-50/22" />
          ),
        },
        {
          Icon: CalendarIcon,
          name: t("cards.missionPlanning.title"),
          description: toSingleSentence(t("cards.missionPlanning.description")),
          className: "col-span-3 lg:col-span-1",
          href: "/fonctionnalites/marketplace-api",
          cta: t("cards.missionPlanning.cta"),
          innerCardClassName: "border-slate-200/70 bg-slate-50/55",
          innerOverlayClassName: "from-slate-100/48 via-white/14 to-zinc-100/14",
          iconWrapClassName: "border-slate-300/70 bg-slate-100/75 text-slate-700",
          ctaClassName: "text-slate-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-zinc-100/24" />
          ),
        },
        {
          Icon: LockKeyholeIcon,
          name: t("cards.connectedLocks.title"),
          description: toSingleSentence(t("cards.connectedLocks.description")),
          href: "/fonctionnalites/interface-proprietaires",
          cta: t("cards.connectedLocks.cta"),
          className: "col-span-3 lg:col-span-1",
          innerCardClassName: "border-sky-200/70 bg-sky-50/52",
          innerOverlayClassName: "from-sky-100/52 via-white/14 to-blue-100/12",
          iconWrapClassName: "border-sky-200/70 bg-sky-100/75 text-sky-800",
          ctaClassName: "text-sky-700",
          background: (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-200/34 to-blue-100/24" />
          ),
        },
      ].map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default BentoDemo;
