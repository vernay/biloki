"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const getStableRotation = (index: number) => {
    return ((index + 1) * 7) % 21 - 10;
  };

  // Swipe tactile (mobile) : seuil de 50px pour déclencher le slide suivant/précédent
  const handleDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <motion.div
        className="relative grid grid-cols-1 gap-20 md:grid-cols-2"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div>
          <div className="relative h-80 w-full">
            {/* initial=false : évite que les 4 photos jouent leur animation d'entrée au montage (effet de défilement au scroll) */}
            <AnimatePresence initial={false}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getStableRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getStableRotation(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getStableRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="mt-12 flex items-center justify-center gap-4 md:mt-0 md:justify-start">
            <button
              onClick={handlePrev}
              aria-label="Témoignage précédent"
              className="group/button flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black transition-colors hover:bg-black/80 dark:bg-white"
            >
              <IconArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-translate-x-0.5 dark:text-black" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.src}
                  onClick={() => setActive(index)}
                  aria-label={`Voir le témoignage de ${testimonial.name}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    isActive(index) ? "w-6 bg-black dark:bg-white" : "w-2.5 bg-gray-300 dark:bg-neutral-700",
                  )}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Témoignage suivant"
              className="group/button flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black transition-colors hover:bg-black/80 dark:bg-white"
            >
              <IconArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:translate-x-0.5 dark:text-black" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
