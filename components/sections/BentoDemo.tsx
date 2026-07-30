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

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import AnimatedBeamMultipleOutputDemo from "@/components/sections/AnimatedBeamMultipleOutputDemo";

function AnimatedListDemo({
  className,
  items,
  panelToneClassName,
  itemToneClassName,
}: {
  className?: string;
  items: string[];
  panelToneClassName?: string;
  itemToneClassName?: string;
}) {

  return (
    <div className={cn("pointer-events-none p-4", className)}>
      <div
        className={cn(
          "space-y-2 rounded-2xl border border-white/70 bg-white/62 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-lg",
          panelToneClassName,
        )}
      >
        {items.map((item, idx) => (
          <div
            key={`${idx}-${item}`}
            className={cn(
              "animate-pulse rounded-xl border border-white/70 bg-white/78 px-3 py-2 text-xs text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
              itemToneClassName,
            )}
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCalendar({
  className,
  monthLabel,
  days,
  panelToneClassName,
  dayCellToneClassName,
}: {
  className?: string;
  monthLabel: string;
  days: string[];
  panelToneClassName?: string;
  dayCellToneClassName?: string;
}) {
  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className={cn("pointer-events-none p-4", className)}>
      <div
        className={cn(
          "rounded-2xl border border-white/75 bg-white/65 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-lg",
          panelToneClassName,
        )}
      >
        <div className="mb-2 text-sm font-semibold text-slate-800">{monthLabel}</div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-500">
          {days.map((d, idx) => (
            <div key={`${idx}-${d}`}>{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center text-[10px]">
          {numbers.map((n) => (
            <div
              key={n}
              className={cn(
                "rounded-md py-1 text-slate-700",
                n === 11 ? "bg-primary text-white" : cn("bg-slate-50", dayCellToneClassName),
              )}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const files = [1, 2, 3, 4, 5].map((idx) => ({
    name: t(`files.${idx}.name`),
    body: t(`files.${idx}.body`),
  }));

  const notificationItems = [1, 2, 3, 4].map((idx) => t(`notifications.${idx}`));
  const ownerNotificationItems = [1, 2, 3, 4].map((idx) => t(`ownerNotifications.${idx}`));
  const calendarDays = [1, 2, 3, 4, 5, 6, 7].map((idx) => t(`calendar.days.${idx}`));

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
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-rose-200/28 to-orange-100/24" />
              <AnimatedBeamMultipleOutputDemo className="absolute right-0 top-[-18px] h-[260px] w-full opacity-85 [mask-image:linear-gradient(to_top,transparent_6%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
            </>
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
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-amber-50/20" />
              <Marquee
                pauseOnHover
                className="absolute top-10 opacity-85 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
              >
                {files.map((f, idx) => (
                  <figure
                    key={`${f.name}-${idx}`}
                    className={cn(
                      "relative w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-orange-200/70 bg-orange-50/68 shadow-[0_8px_18px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] hover:bg-orange-100/72",
                      "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                    )}
                  >
                    <figcaption className="text-sm font-medium text-slate-900">
                      {f.name}
                    </figcaption>
                    <blockquote className="mt-2 text-xs text-slate-700">{f.body}</blockquote>
                  </figure>
                ))}
              </Marquee>
            </>
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
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/28 to-lime-50/20" />
              <AnimatedListDemo
                items={notificationItems}
                panelToneClassName="border-emerald-200/65 bg-emerald-50/68"
                itemToneClassName="border-emerald-100/80 bg-emerald-100/65"
                className="absolute right-2 top-4 h-[300px] w-full scale-75 opacity-90 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
              />
            </>
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
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-zinc-100/24" />
              <MiniCalendar
                monthLabel={t("calendar.monthLabel")}
                days={calendarDays}
                panelToneClassName="border-slate-200/70 bg-slate-50/70"
                dayCellToneClassName="bg-slate-100"
                className="absolute right-0 top-10 origin-top scale-75 opacity-90 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
              />
            </>
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
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200/34 to-blue-100/24" />
              <AnimatedListDemo
                items={ownerNotificationItems}
                panelToneClassName="border-sky-200/65 bg-sky-50/70"
                itemToneClassName="border-sky-100/80 bg-sky-100/62"
                className="absolute right-2 top-4 h-[300px] w-full scale-75 opacity-85 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
              />
            </>
          ),
        },
      ].map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default BentoDemo;
