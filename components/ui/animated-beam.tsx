"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useId, useState } from "react";

type BeamRef = React.RefObject<HTMLElement | null>;

type AnimatedBeamProps = {
  containerRef: BeamRef;
  fromRef: BeamRef;
  toRef: BeamRef;
  className?: string;
  duration?: number;
  delay?: number;
  curvature?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  duration = 2.6,
  delay = 0,
  curvature = 80,
  pathColor = "#1d4ed8",
  pathWidth = 2,
  pathOpacity = 0.2,
}: AnimatedBeamProps) {
  const gradientId = useId().replace(/:/g, "");
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updatePath = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const containerRect = container.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left + toRect.width / 2 - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;

    const midpointX = (fromX + toX) / 2;
    const dynamicCurve = Math.max(curvature, Math.abs(toX - fromX) * 0.1);
    const controlY = Math.min(fromY, toY) - dynamicCurve;

    setSize({ width: containerRect.width, height: containerRect.height });
    setPath(`M ${fromX} ${fromY} Q ${midpointX} ${controlY} ${toX} ${toY}`);
  }, [containerRef, curvature, fromRef, toRef]);

  useEffect(() => {
    updatePath();

    const onViewportUpdate = () => updatePath();
    window.addEventListener("resize", onViewportUpdate);

    const ro = new ResizeObserver(() => updatePath());
    if (containerRef.current) ro.observe(containerRef.current);
    if (fromRef.current) ro.observe(fromRef.current);
    if (toRef.current) ro.observe(toRef.current);

    return () => {
      window.removeEventListener("resize", onViewportUpdate);
      ro.disconnect();
    };
  }, [containerRef, fromRef, toRef, updatePath]);

  if (!path) return null;

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0", className)}
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={pathColor} stopOpacity="0" />
          <stop offset="50%" stopColor={pathColor} stopOpacity="1" />
          <stop offset="100%" stopColor={pathColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />

      <motion.path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth + 0.6}
        strokeLinecap="round"
        strokeDasharray="12 10"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -44 }}
        transition={{
          duration,
          delay,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </svg>
  );
}

export default AnimatedBeam;
