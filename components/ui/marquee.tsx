"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  className?: string;
  children: React.ReactNode;
  pauseOnHover?: boolean;
  durationSeconds?: number;
};

export function Marquee({
  className,
  children,
  pauseOnHover = false,
  durationSeconds = 20,
}: MarqueeProps) {
  return (
    <div className={cn("marquee-root relative h-full w-full overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex flex-col gap-3",
          pauseOnHover ? "hover:[animation-play-state:paused]" : "",
        )}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {children}
        {children}
      </div>

      <style jsx>{`
        .marquee-track {
          animation-name: marquee-vertical;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes marquee-vertical {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
