import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type BentoGridProps = {
  className?: string;
  children: React.ReactNode;
};

type BentoCardProps = {
  Icon: LucideIcon;
  name: string;
  value?: string;
  description: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: React.ReactNode;
  innerCardClassName?: string;
  innerOverlayClassName?: string;
  iconWrapClassName?: string;
  ctaClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  hideInnerChrome?: boolean;
  contentClassName?: string;
  ctaWrapClassName?: string;
};

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("grid auto-rows-fr grid-cols-3 gap-4 md:gap-6", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  Icon,
  name,
  value,
  description,
  href,
  cta = "En savoir plus",
  className,
  background,
  innerCardClassName,
  innerOverlayClassName,
  iconWrapClassName,
  ctaClassName,
  valueClassName,
  titleClassName,
  descriptionClassName,
  hideInnerChrome = false,
  contentClassName,
  ctaWrapClassName,
}: BentoCardProps) {
  const layoutClassName = cn("col-span-3", className);

  const content = (
    <article
      className={cn(
        "group relative h-full min-h-[19.5rem] overflow-hidden rounded-3xl border border-white/60 bg-white/45 p-6 backdrop-blur-xl md:min-h-[20.5rem]",
        "shadow-[0_12px_34px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-18px_32px_rgba(255,255,255,0.18)]",
        "transition-all duration-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-22px_34px_rgba(255,255,255,0.22)]",
      )}
    >
      {background ? (
        <div className="pointer-events-none absolute inset-0">{background}</div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/18 via-white/30 to-white/58" />
      <div className="pointer-events-none absolute left-3 right-3 top-2 h-10 rounded-full bg-white/55 blur-md" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/65 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/45" />

      <div className="absolute inset-0 z-10 flex items-center justify-center p-5 md:p-6">
        <div
          className={cn(
            "relative mx-auto flex h-[92%] w-[96%] max-w-2xl flex-col rounded-2xl border border-white/60 bg-white/40 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[30px] md:w-[92%] md:p-5",
            innerCardClassName,
          )}
        >
          {!hideInnerChrome ? (
            <>
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/42 via-white/16 to-white/6",
                  innerOverlayClassName,
                )}
              />
              <div className="pointer-events-none absolute left-3 right-3 top-2 h-8 rounded-full bg-white/35 blur-lg" />
            </>
          ) : null}

          <div className={cn("relative z-10 flex h-full flex-col", contentClassName)}>
            <div
              className={cn(
                "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/65 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-lg",
                iconWrapClassName,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className={cn("text-xl font-black text-slate-950", titleClassName)}>{name}</h3>
            {value ? (
              <p
                className={cn(
                  'mt-3 text-5xl font-black tracking-tight text-slate-950 md:text-6xl',
                  valueClassName,
                )}
              >
                {value}
              </p>
            ) : null}
            <p className={cn("mt-2 max-w-md text-sm leading-relaxed text-slate-700 md:text-base", descriptionClassName)}>
              {description}
            </p>
            {href ? (
              <span
                className={cn(
                  "inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary/95",
                  ctaWrapClassName ?? 'mt-auto',
                  ctaClassName,
                )}
              >
                {cta}
                {/[→\-›»]\s*$/.test(cta) ? null : <span aria-hidden="true">→</span>}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );

  if (!href) {
    return <div className={layoutClassName}>{content}</div>;
  }

  return (
    <Link href={href} className={cn("block focus:outline-none", layoutClassName)}>
      {content}
    </Link>
  );
}
