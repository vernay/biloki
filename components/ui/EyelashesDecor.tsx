import React from "react";

interface EyelashesDecorProps {
  color?: string;
  className?: string;
  count?: number;
}

export default function EyelashesDecor({
  color = "#01a4ff",
  className = "",
  count = 3,
}: EyelashesDecorProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      preserveAspectRatio="none"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <filter id="eyelashFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="2"
            result="noise"
            seed="3"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Centre dot */}
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.8" />

      {/* Top eyelashes */}
      <path
        d="M 8,12 Q 7,8 6,5"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.9"
      />
      <path
        d="M 12,12 Q 12,7 12,3"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.9"
      />
      <path
        d="M 16,12 Q 17,8 18,5"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.9"
      />

      {/* Bottom eyelashes */}
      <path
        d="M 8,12 Q 7,16 6,19"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.75"
      />
      <path
        d="M 12,12 Q 12,17 12,21"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.75"
      />
      <path
        d="M 16,12 Q 17,16 18,19"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        filter="url(#eyelashFilter)"
        opacity="0.75"
      />
    </svg>
  );
}
