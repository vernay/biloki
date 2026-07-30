"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function ContainerScroll({
  titleComponent,
  children,
  className,
  contentClassName,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [16, 6, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 0.97, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [48, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.5, 1, 1]);

  return (
    <section ref={containerRef} className={cn("relative h-[120vh]", className)}>
      <div className="sticky top-20 overflow-hidden py-10 md:top-24 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
          {titleComponent}
        </div>

        <motion.div
          style={{
            rotateX,
            scale,
            y: translateY,
            opacity,
            transformPerspective: 1200,
          }}
          className="mx-auto mt-3 max-w-6xl px-4 md:mt-6 md:px-6"
        >
          <div
            className={cn(
              "overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]",
              contentClassName,
            )}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}