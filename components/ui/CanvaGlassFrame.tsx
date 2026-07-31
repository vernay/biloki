import type { ReactNode } from "react";
import Image from "next/image";

interface CanvaGlassFrameProps {
  children: ReactNode;
  className?: string;
  inline?: boolean;
}

export default function CanvaGlassFrame({
  children,
  className = "",
  inline = true,
}: CanvaGlassFrameProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[2.5rem]",
        inline ? "inline-flex" : "block",
        "border border-white/55 bg-transparent",
        "shadow-[0_6px_18px_rgba(10,19,31,0.14),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-8px_16px_rgba(255,255,255,0.08)]",
        className,
      ].join(" ")}
    >
      <Image
        src="/images/Gros%20CTA/fujiphilm-ntW8m26em5E-unsplash.webp"
        alt=""
        aria-hidden="true"
        fill
        className="pointer-events-none object-cover opacity-8"
        sizes="(min-width: 1280px) 560px, (min-width: 768px) 70vw, 100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-sky-200/2" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/50" />
      <div className="pointer-events-none absolute left-2 right-2 top-1 h-7 rounded-full bg-white/18 blur-sm" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/4 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}