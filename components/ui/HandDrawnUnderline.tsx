import React from "react";

interface HandDrawnUnderlineProps {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
  gradient?: boolean;
}

export default function HandDrawnUnderline({
  color = "#01a4ff",
  className = "",
  width = 280,
  height = 20,
  gradient = false,
}: HandDrawnUnderlineProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <filter id="handDrawnFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        
        {gradient && (
          <linearGradient id="frenchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055B8" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EF4135" />
          </linearGradient>
        )}
      </defs>

      {gradient ? (
        <>
          {/* Base stroke avec gradient français */}
          <path
            d={`M ${width * 0.05},${height * 0.6} Q ${width * 0.2},${height * 0.4} ${width * 0.35},${height * 0.55} T ${width * 0.65},${height * 0.5} T ${width * 0.95},${height * 0.65}`}
            stroke="url(#frenchGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.9"
          />

          {/* Couche secondaire pour effet feutre/épaisseur variable */}
          <path
            d={`M ${width * 0.03},${height * 0.65} Q ${width * 0.22},${height * 0.35} ${width * 0.38},${height * 0.58} T ${width * 0.68},${height * 0.48} T ${width * 0.98},${height * 0.62}`}
            stroke="url(#frenchGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.7"
          />

          {/* Couche de relief léger */}
          <path
            d={`M ${width * 0.06},${height * 0.55} Q ${width * 0.18},${height * 0.45} ${width * 0.32},${height * 0.52} T ${width * 0.62},${height * 0.52} T ${width * 0.94},${height * 0.68}`}
            stroke="url(#frenchGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.5"
          />
        </>
      ) : (
        <>
          {/* Base stroke avec effet hand-drawn */}
          <path
            d={`M ${width * 0.05},${height * 0.6} Q ${width * 0.2},${height * 0.4} ${width * 0.35},${height * 0.55} T ${width * 0.65},${height * 0.5} T ${width * 0.95},${height * 0.65}`}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.85"
          />

          {/* Couche secondaire pour effet feutre/épaisseur variable */}
          <path
            d={`M ${width * 0.03},${height * 0.65} Q ${width * 0.22},${height * 0.35} ${width * 0.38},${height * 0.58} T ${width * 0.68},${height * 0.48} T ${width * 0.98},${height * 0.62}`}
            stroke={color}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.7"
          />

          {/* Couche de relief léger */}
          <path
            d={`M ${width * 0.06},${height * 0.55} Q ${width * 0.18},${height * 0.45} ${width * 0.32},${height * 0.52} T ${width * 0.62},${height * 0.52} T ${width * 0.94},${height * 0.68}`}
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handDrawnFilter)"
            opacity="0.5"
          />
        </>
      )}
    </svg>
  );
}
