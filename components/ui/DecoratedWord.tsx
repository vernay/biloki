import React from "react";
import EyelashesDecor from "./EyelashesDecor";

interface DecoratedWordProps {
  word: string;
  color?: string;
  letterWithDecor?: string;
}

export default function DecoratedWord({
  word,
  color = "#01a4ff",
  letterWithDecor = "i",
}: DecoratedWordProps) {
  // Split word by the letter with decor
  const parts = word.split(letterWithDecor);

  return (
    <span className="inline-block">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <span className="relative inline-block">
              <span className="opacity-0">{letterWithDecor}</span>
              <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                <EyelashesDecor color={color} />
              </span>
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
