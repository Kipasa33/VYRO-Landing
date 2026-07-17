"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export type AnimatedTestimonialItem = {
  name: string;
  designation: string;
  quote: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: AnimatedTestimonialItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  autoplayDelay = 5200,
  className,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const showNext = useCallback(() => {
    setActive((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  const showPrevious = useCallback(() => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay || isPaused || shouldReduceMotion || testimonials.length < 2) return;
    const timer = window.setInterval(showNext, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, isPaused, shouldReduceMotion, showNext, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const };

  return (
    <div
      className={cn("mx-auto grid w-full max-w-6xl items-center gap-7 md:grid-cols-[1.08fr_.92fr] md:gap-10", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className="relative h-[15rem] sm:h-[22rem] lg:h-[25rem]" aria-live="polite">
        {testimonials.map((item, index) => {
          const isActive = index === active;
          const rotation = index % 2 === 0 ? -1.5 : 1.5;

          return (
            <motion.div
              key={item.src}
              className="absolute inset-0 origin-bottom"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.96,
                rotate: isActive ? 0 : rotation,
                zIndex: isActive ? 2 : 1,
              }}
              transition={transition}
              aria-hidden={!isActive}
            >
              <div className="h-full overflow-hidden rounded-[1.35rem] border border-slate-900/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:rounded-[1.75rem]">
                <Image
                  src={item.src}
                  alt={`${item.name} VYRO feature preview`}
                  width={1535}
                  height={1086}
                  sizes="(max-width: 767px) calc(100vw - 3rem), 54vw"
                  className="h-full w-full object-contain"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex min-h-[16rem] flex-col justify-center rounded-[1.35rem] border border-slate-900/10 bg-white/75 p-5 shadow-[0_20px_60px_rgba(34,54,84,0.09)] backdrop-blur-xl sm:p-7 md:min-h-[20rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={transition}
          >
            <span className="inline-flex rounded-full border border-cyan-900/10 bg-cyan-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-cyan-900">
              {current.designation}
            </span>
            <h3 className="mt-5 font-sans text-3xl font-black leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-4xl">
              {current.name}
            </h3>
            <p className="mt-4 max-w-xl font-sans text-base font-medium leading-7 text-slate-600">
              {current.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="font-sans text-sm font-bold tabular-nums text-slate-500" aria-label={`Feature ${active + 1} of ${testimonials.length}`}>
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={showPrevious}
              className="grid size-11 place-items-center rounded-full border border-slate-900/10 bg-white text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              aria-label="Show previous VYRO feature"
            >
              <IconArrowLeft size={20} stroke={2} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="grid size-11 place-items-center rounded-full bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-950 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              aria-label="Show next VYRO feature"
            >
              <IconArrowRight size={20} stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
