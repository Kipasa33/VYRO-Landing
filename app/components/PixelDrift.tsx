"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type PixelMode = "onEnter" | "loop" | "static";
type PixelPosition = "top" | "middle" | "bottom";

type Props = {
  text: string;
  colors: string[];
  particleSize: number;
  particleCount: number;
  fontSize: number;
  autoFit: boolean;
  mouseEnabled: boolean;
  mouseRadius: number;
  mouseForce: number;
  mode: PixelMode;
  replay: boolean;
  position: PixelPosition;
  trackPointerOnWindow: boolean;
  transition: Transition;
  className: string;
  opacity: number;
};

const COMPONENT_DEFAULTS = {
  text: "VYRO",
  colors: ["#7DD3FC", "#22D3EE", "#8B5CF6", "#FFFFFF", "#38BDF8"],
  particleSize: 14,
  particleCount: 50,
  fontSize: 430,
  autoFit: true,
  mouseEnabled: true,
  mouseRadius: 150,
  mouseForce: 18,
  mode: "onEnter",
  replay: false,
  position: "middle",
  trackPointerOnWindow: true,
  transition: { type: "tween", duration: 1.1, ease: "easeOut" },
  className: "",
  opacity: 0.82,
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

function positionOffset(position: PixelPosition) {
  if (position === "top") return -7;
  if (position === "bottom") return 7;
  return 0;
}

function roundParticleValue(value: number) {
  return Number(value.toFixed(4));
}

export default function PixelDrift(options: Partial<Props> = {}) {
  const props = { ...COMPONENT_DEFAULTS, ...options } satisfies Props;
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const shouldAnimate = hydrated && !prefersReducedMotion && props.mode !== "static";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [pointer, setPointer] = useState({ x: -9999, y: -9999, width: 0, height: 0, active: false });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!props.mouseEnabled || prefersReducedMotion) return;

    const target: Window | HTMLDivElement | null = props.trackPointerOnWindow ? window : rootRef.current;
    if (!target) return;

    const updatePointer = (event: PointerEvent | MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPointer({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          width: rect.width,
          height: rect.height,
          active: event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom,
        });
      });
    };

    const clearPointer = () => setPointer((current) => ({ ...current, active: false }));

    target.addEventListener("pointermove", updatePointer as EventListener, { passive: true });
    target.addEventListener("mousemove", updatePointer as EventListener, { passive: true });
    window.addEventListener("pointerleave", clearPointer, { passive: true });
    window.addEventListener("mouseleave", clearPointer, { passive: true });
    window.addEventListener("blur", clearPointer);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      target.removeEventListener("pointermove", updatePointer as EventListener);
      target.removeEventListener("mousemove", updatePointer as EventListener);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("mouseleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, [prefersReducedMotion, props.mouseEnabled, props.trackPointerOnWindow]);

  const particles = useMemo(() => {
    const random = seededRandom(seedFromText(props.text) + props.particleCount + props.particleSize);
    const yOffset = positionOffset(props.position);
    return Array.from({ length: props.particleCount }, (_, index) => {
      const rowBias = Math.sin(index * 1.73) * 10;
      return {
        id: `${props.text}-${index}`,
        x: roundParticleValue(7 + random() * 86),
        y: roundParticleValue(20 + random() * 60 + rowBias + yOffset),
        driftX: roundParticleValue((random() - 0.5) * 48),
        driftY: roundParticleValue((random() - 0.5) * 36),
        color: props.colors[index % props.colors.length],
        scale: roundParticleValue(0.68 + random() * 1.28),
        delay: roundParticleValue(random() * 0.22),
        radius: random() > 0.72 ? "38%" : "22%",
      };
    });
  }, [props.colors, props.particleCount, props.particleSize, props.position, props.text]);

  const textStyle = props.autoFit
    ? { fontSize: `clamp(12rem, 36vw, ${props.fontSize}px)` }
    : { fontSize: `${props.fontSize}px` };

  return (
    <div
      ref={rootRef}
      className={`pixel-drift ${props.className}`.trim()}
      data-mouse-enabled={props.mouseEnabled ? "true" : "false"}
      data-track-window={props.trackPointerOnWindow ? "true" : "false"}
      aria-hidden="true"
      style={{ opacity: props.opacity }}
    >
      <motion.span
        className="pixel-drift__text"
        initial={shouldAnimate ? { opacity: 0, filter: "blur(14px)", scale: 0.98 } : false}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={props.transition}
        style={textStyle}
      >
        {props.text}
      </motion.span>
      <div className="pixel-drift__field">
        {particles.map((particle) => {
          let repelX = 0;
          let repelY = 0;

          if (pointer.active && pointer.width > 0 && pointer.height > 0) {
            const particleX = (particle.x / 100) * pointer.width;
            const particleY = (particle.y / 100) * pointer.height;
            const dx = particleX - pointer.x;
            const dy = particleY - pointer.y;
            const distance = Math.hypot(dx, dy) || 1;

            if (distance < props.mouseRadius) {
              const strength = (1 - distance / props.mouseRadius) * props.mouseForce;
              repelX = (dx / distance) * strength;
              repelY = (dy / distance) * strength;
            }
          }

          const settled = { opacity: 1, x: repelX, y: repelY, scale: particle.scale };

          return (
            <motion.i
              key={particle.id}
              className="pixel-drift__particle"
              initial={shouldAnimate ? { opacity: 0, x: particle.driftX, y: particle.driftY, scale: 0.2 } : false}
              animate={shouldAnimate && props.mode === "loop"
                ? { opacity: [0.35, 1, 0.45], x: [particle.driftX + repelX, repelX, -particle.driftX * 0.35 + repelX], y: [particle.driftY + repelY, repelY, -particle.driftY * 0.3 + repelY], scale: [0.65, particle.scale, 0.78] }
                : settled}
              transition={props.mode === "loop"
                ? { duration: 5.5 + particle.delay * 4, delay: particle.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                : { ...props.transition, delay: pointer.active ? 0 : particle.delay }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: props.particleSize,
                height: props.particleSize,
                borderRadius: particle.radius,
                background: particle.color,
                boxShadow: `0 0 ${props.particleSize * 2.1}px ${particle.color}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
