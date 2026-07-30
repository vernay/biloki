import type { ReactNode } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  useCanvaTexture?: boolean;
}

export default function LiquidGlass({
  children,
  className = "",
  useCanvaTexture = true,
}: LiquidGlassProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/35 bg-white/12 backdrop-blur-xl",
        "shadow-[0_10px_30px_rgba(10,19,31,0.28),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-14px_28px_rgba(255,255,255,0.07)]",
        className,
      ].join(" ")}
    >
      {useCanvaTexture ? (
        <img
          src="/images/Gros%20CTA/fujiphilm-ntW8m26em5E-unsplash.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className="pointer-events-none absolute left-2 right-2 top-1 h-8 rounded-full bg-white/45 blur-md" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}