"use client";
import { useMotionValue } from "motion/react";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function updatePointer(currentTarget: EventTarget & HTMLDivElement, clientX: number, clientY: number) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  function onMouseEnter({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const rect = currentTarget.getBoundingClientRect();
    updatePointer(currentTarget, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    updatePointer(currentTarget, clientX, clientY);
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
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-black border border-white/20 hover:border-cyan-300/70 flex items-center justify-center h-full transition-colors duration-300"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-black/80 blur-md rounded-full" />
            <span className="text-white z-20">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  let spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(56,189,248,0.36), rgba(37,99,235,0.18) 45%, transparent 72%)`;

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover/card:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute -inset-6 rounded-3xl opacity-0 blur-3xl transition duration-500 group-hover/card:opacity-70"
        style={style}
      >
        <div className="h-full w-full bg-cyan-400/35" />
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-600 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
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

export const Icon = ({ className, ...rest }: any) => {
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
