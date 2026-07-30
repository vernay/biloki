"use client";
import { useMotionValue, type MotionValue } from "motion/react";
import React, { useState } from "react";
import { useMotionTemplate, motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  text,
  logoSrc,
  logoAlt,
  logoWidth = 72,
  logoHeight = 72,
  className,
}: {
  text?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  function onMouseEnter({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
    setIsHovering(true);
    setRandomString(generateRandomString(1500));
  }

  function onMouseLeave() {
    setIsHovering(false);
  }

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-black flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          isHovering={isHovering}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-black/[0.85] blur-sm rounded-full" />
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={logoAlt || "Biloki"}
                width={logoWidth}
                height={logoHeight}
                className="z-20 h-auto w-auto object-contain"
                priority={false}
              />
            ) : (
              <span className="text-white z-20">{text}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type CardPatternProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
  isHovering: boolean;
};

export function CardPattern({ mouseX, mouseY, randomString, isHovering }: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute -inset-3 rounded-3xl bg-cyan-400/35 blur-2xl"
        animate={{ opacity: isHovering ? 0.55 : 0 }}
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-blue-500/25"
        animate={{ opacity: isHovering ? 1 : 0 }}
        style={style}
      />
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)]"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 backdrop-blur-xl transition duration-500"
        animate={{ opacity: isHovering ? 1 : 0 }}
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-overlay"
        animate={{ opacity: isHovering ? 1 : 0 }}
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
