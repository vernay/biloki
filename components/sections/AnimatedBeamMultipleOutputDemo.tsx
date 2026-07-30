"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white p-3 text-[10px] font-bold text-slate-700 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const airbnbRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const vrboRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[280px] w-full items-start justify-center overflow-hidden p-4 md:h-[320px]",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-3xl flex-row items-start justify-between gap-4 pt-2">
        <div className="flex flex-col justify-center pt-16">
          <Circle ref={hubRef} className="size-16 overflow-hidden border-primary/35 bg-[#01A4FF] p-3 text-white">
            <img
              src="/logos/logo-icon-white.svg"
              alt="Biloki"
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </Circle>
        </div>

        <div className="flex flex-col justify-start gap-2 md:gap-3">
          <Circle ref={airbnbRef} className="size-14 overflow-hidden bg-[#ff5a5f]/10 border-[#ff5a5f]/35 p-0">
            <img
              src="/images/Logo OTAS/airbnb-logo.png"
              alt="Airbnb"
              className="h-[74%] w-[74%] object-contain translate-y-[1px]"
              loading="lazy"
              decoding="async"
            />
          </Circle>
          <Circle ref={bookingRef} className="size-14 overflow-hidden bg-[#003580]/10 border-[#003580]/35 p-0">
            <img
              src="/images/Logo%20OTAS/Booking%20logo.webp"
              alt="Booking.com"
              className="h-[82%] w-[82%] object-contain"
              loading="lazy"
              decoding="async"
            />
          </Circle>
          <Circle ref={vrboRef} className="size-14 overflow-hidden bg-[#0a3f8a]/10 border-[#0a3f8a]/35 p-0">
            <img
              src="/images/Logo%20OTAS/VRBO%20logo.png"
              alt="VRBO"
              className="h-[71%] w-[71%] object-contain -translate-y-[1px]"
              loading="lazy"
              decoding="async"
            />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={airbnbRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={bookingRef} duration={3} delay={0.1} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={vrboRef} duration={3} delay={0.2} />
    </div>
  );
}

export default AnimatedBeamMultipleOutputDemo;
