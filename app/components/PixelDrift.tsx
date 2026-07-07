"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useMemo } from "react";

type PixelMode = "onEnter" | "loop" | "static";

type Props = {
  text: string;
  colors: string[];
  particleSize: number;
  particleCount: number;
  fontSize: number;
  autoFit: boolean;
  mouseEnabled: boolean;
  mode: PixelMode;
  replay: boolean;
  transition: Transition;
  className: string;
  opacity: number;
};

const COMPONENT_DEFAULTS = {
  text: "VYRO",
  colors: ["#7DD3FC", "#22D3EE", "#8B5CF6", "#FFFFFF"],
  particleSize: 10,
  particleCount: 44,
  fontSize: 250,
  autoFit: true,
  mouseEnabled: false,
  mode: "onEnter",
  replay: false,
  transition: { type: "tween", duration: 1.2, ease: "easeOut" },
  className: "",
  opacity: 0.48,
} satisfies Props;

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function seedFromText(text: string) {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 2166136261);
}

export default function PixelDrift(options: Partial<Props> = {}) {
  const props = { ...COMPONENT_DEFAULTS, ...options } satisfies Props;
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion && props.mode !== "static";

  const particles = useMemo(() => {
    const random = seededRandom(seedFromText(props.text) + props.particleCount + props.particleSize);
    return Array.from({ length: props.particleCount }, (_, index) => {
      const rowBias = Math.sin(index * 1.73) * 10;
      return {
        id: `${props.text}-${index}`,
        x: 8 + random() * 84,
        y: 21 + random() * 58 + rowBias,
        driftX: (random() - 0.5) * 34,
        driftY: (random() - 0.5) * 26,
        color: props.colors[index % props.colors.length],
        scale: 0.62 + random() * 1.15,
        delay: random() * 0.26,
        radius: random() > 0.72 ? "38%" : "22%",
      };
    });
  }, [props.colors, props.particleCount, props.particleSize, props.text]);

  const textStyle = props.autoFit
    ? { fontSize: "clamp(7rem, 18vw, 17rem)" }
    : { fontSize: `${props.fontSize}px` };

  return (
    <div
      className={`pixel-drift ${props.className}`.trim()}
      data-mouse-enabled={props.mouseEnabled ? "true" : "false"}
      aria-hidden="true"
      style={{ opacity: props.opacity }}
    >
      <motion.span
        className="pixel-drift__text"
        initial={shouldAnimate ? { opacity: 0, filter: "blur(18px)", scale: 0.98 } : false}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={props.transition}
        style={textStyle}
      >
        {props.text}
      </motion.span>
      <div className="pixel-drift__field">
        {particles.map((particle) => (
          <motion.i
            key={particle.id}
            className="pixel-drift__particle"
            initial={shouldAnimate ? { opacity: 0, x: particle.driftX, y: particle.driftY, scale: 0.2 } : false}
            animate={shouldAnimate && props.mode === "loop"
              ? { opacity: [0.2, 0.9, 0.35], x: [particle.driftX, 0, -particle.driftX * 0.35], y: [particle.driftY, 0, -particle.driftY * 0.3], scale: [0.65, particle.scale, 0.78] }
              : { opacity: 0.9, x: 0, y: 0, scale: particle.scale }}
            transition={props.mode === "loop"
              ? { duration: 5.5 + particle.delay * 4, delay: particle.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
              : { ...props.transition, delay: particle.delay }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: props.particleSize,
              height: props.particleSize,
              borderRadius: particle.radius,
              background: particle.color,
              boxShadow: `0 0 ${props.particleSize * 1.8}px ${particle.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
