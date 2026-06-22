"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./VyroCompanion.module.css";

/**
 * VYRO — premium animated AI desktop companion.
 *
 * Design language: oversized rounded white shell, dark glass face,
 * expressive cyan eyes, a small floating body, two detached side arms,
 * and a soft blue glow. Built as a single inline SVG so it stays crisp
 * at any size and every part can be animated independently.
 *
 * Behaviours:
 *  - Natural randomized blinking (suppressed while asleep / shocked)
 *  - Eyes (and a subtle head tilt) follow the cursor
 *  - Gentle floating hover motion + breathing glow
 *  - Mood state machine: idle · happy · sleep · thinking · shock · focus
 *  - Falls asleep after inactivity, wakes on pointer / key / focus
 *  - Honors prefers-reduced-motion (handled globally in globals.css)
 */

export type VyroMood = "idle" | "happy" | "sleep" | "thinking" | "shock" | "focus";

interface VyroCompanionProps {
  /** Forced mood. When "idle", the companion may auto-sleep after inactivity. */
  mood?: VyroMood;
  /** Pixel width; height follows the 220×260 aspect ratio. */
  size?: number;
  /** Called when the companion is poked (click / Enter / Space). */
  onPoke?: () => void;
  /** Idle time (ms) before drifting to sleep. Set 0 to disable auto-sleep. */
  idleToSleepMs?: number;
  className?: string;
  ariaLabel?: string;
}

// Face geometry in viewBox units (0 0 220 260)
const LEFT_EYE_X = 86;
const RIGHT_EYE_X = 134;
const EYE_Y = 96;

export default function VyroCompanion({
  mood = "idle",
  size = 280,
  onPoke,
  idleToSleepMs = 14000,
  className,
  ariaLabel = "VYRO, your AI desktop companion",
}: VyroCompanionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);

  const [blinking, setBlinking] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const asleepRef = useRef(false);
  asleepRef.current = asleep;

  // A forced mood (anything other than idle) wins over auto-sleep.
  const forced = mood !== "idle";
  const effectiveMood: VyroMood = forced ? mood : asleep ? "sleep" : "idle";

  // ---- Eye + head cursor tracking (rAF-throttled, writes CSS vars) ----
  useEffect(() => {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      raf = 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      const root = rootRef.current;
      if (root) {
        root.style.setProperty("--veye-x", cx.toFixed(2));
        root.style.setProperty("--veye-y", cy.toFixed(2));
        root.style.setProperty("--vtilt", (cx * 0.25).toFixed(2));
      }
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(apply);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (asleepRef.current && mood === "idle") return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const faceX = r.left + r.width / 2;
      const faceY = r.top + r.height * 0.42;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const nx = clamp((e.clientX - faceX) / (window.innerWidth / 2));
      const ny = clamp((e.clientY - faceY) / (window.innerHeight / 2));
      tx = nx * 4.5;
      ty = ny * 3.2;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mood]);

  // ---- Natural blinking ----
  useEffect(() => {
    if (effectiveMood === "sleep" || effectiveMood === "shock") return;
    let blinkTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlinking(true);
        const double = Math.random() < 0.25;
        openTimeout = setTimeout(() => {
          setBlinking(false);
          if (double) {
            openTimeout = setTimeout(() => {
              setBlinking(true);
              openTimeout = setTimeout(() => setBlinking(false), 110);
            }, 150);
          }
          scheduleBlink();
        }, 130);
      }, 2400 + Math.random() * 4200);
    };

    scheduleBlink();
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(openTimeout);
      setBlinking(false);
    };
  }, [effectiveMood]);

  // ---- Auto-sleep after inactivity / wake on activity ----
  useEffect(() => {
    if (idleToSleepMs <= 0 || forced) {
      setAsleep(false);
      return;
    }
    let idleTimer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setAsleep(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setAsleep(true), idleToSleepMs);
    };
    const events: (keyof WindowEventMap)[] = ["pointermove", "pointerdown", "keydown", "focus"];
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(idleTimer);
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [idleToSleepMs, forced]);

  const handlePoke = useCallback(() => {
    setAsleep(false);
    onPoke?.();
  }, [onPoke]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePoke();
    }
  };

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-mood={effectiveMood}
      data-blinking={blinking ? "true" : "false"}
      style={{ width: size }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handlePoke}
      onKeyDown={onKeyDown}
    >
      <svg
        className={styles.character}
        viewBox="0 0 220 260"
        width={size}
        height={(size * 260) / 220}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vyroShell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f3f7fb" />
            <stop offset="1" stopColor="#c9d6e2" />
          </linearGradient>
          <linearGradient id="vyroShellArm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#cdd9e5" />
          </linearGradient>
          <radialGradient id="vyroGlass" cx="0.5" cy="0.32" r="0.85">
            <stop offset="0" stopColor="#16263f" />
            <stop offset="0.62" stopColor="#0a1424" />
            <stop offset="1" stopColor="#05080f" />
          </radialGradient>
          <linearGradient id="vyroEye" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a7f3ff" />
            <stop offset="0.5" stopColor="#3fe0f5" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <radialGradient id="vyroGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="0.45" stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="vyroSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
          <filter id="vyroEyeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft blue glow */}
        <ellipse className={styles.glow} cx="110" cy="146" rx="104" ry="104" fill="url(#vyroGlow)" />

        {/* Ground shadow */}
        <ellipse className={styles.shadow} cx="110" cy="246" rx="56" ry="9" fill="#0b2233" opacity="0.18" />

        {/* Floating side arms (detached) */}
        <g className={`${styles.arm} ${styles.armLeft}`}>
          <rect x="22" y="150" width="17" height="46" rx="8.5" fill="url(#vyroShellArm)" stroke="#ffffff" strokeOpacity="0.7" />
        </g>
        <g className={`${styles.arm} ${styles.armRight}`}>
          <rect x="181" y="150" width="17" height="46" rx="8.5" fill="url(#vyroShellArm)" stroke="#ffffff" strokeOpacity="0.7" />
        </g>

        {/* Floating body */}
        <g className={styles.body}>
          <rect x="72" y="156" width="76" height="80" rx="34" fill="url(#vyroShell)" stroke="#ffffff" strokeOpacity="0.8" />
          <ellipse cx="110" cy="176" rx="26" ry="9" fill="#ffffff" opacity="0.55" filter="url(#vyroSoft)" />
          <circle className={styles.coreLight} cx="110" cy="198" r="9" fill="url(#vyroEye)" filter="url(#vyroEyeGlow)" />
        </g>

        {/* Head + face — tilts subtly toward the cursor */}
        <g ref={headRef} className={styles.head}>
          <g className={styles.headTilt}>
            {/* status orb antenna */}
            <line x1="110" y1="36" x2="110" y2="22" stroke="#c9d6e2" strokeWidth="3" strokeLinecap="round" />
            <circle className={styles.statusOrb} cx="110" cy="18" r="5" fill="url(#vyroEye)" filter="url(#vyroEyeGlow)" />

            {/* shell */}
            <rect x="34" y="34" width="152" height="128" rx="50" fill="url(#vyroShell)" stroke="#ffffff" strokeOpacity="0.85" />
            {/* top gloss highlight */}
            <ellipse cx="96" cy="58" rx="42" ry="13" fill="#ffffff" opacity="0.6" filter="url(#vyroSoft)" />

            {/* dark glass face */}
            <rect x="56" y="58" width="108" height="80" rx="34" fill="url(#vyroGlass)" stroke="#7dd3fc" strokeOpacity="0.35" />
            {/* glass reflection sweep */}
            <path
              className={styles.glassSweep}
              d="M70 64 q40 -6 86 6 l-10 20 q-44 -10 -82 0 z"
              fill="#ffffff"
              opacity="0.06"
            />

            {/* eyes (and mouth) — translate to follow cursor */}
            <g
              ref={lookRef}
              className={styles.look}
              style={{
                transform:
                  "translate(calc(var(--veye-x, 0) * 1px), calc(var(--veye-y, 0) * 1px))",
              }}
            >
              <Eyes mood={effectiveMood} blinking={blinking} />
              <Mouth mood={effectiveMood} />
            </g>
          </g>
        </g>

        {/* Mood-specific decorations */}
        {effectiveMood === "thinking" && (
          <g className={styles.thinkDots}>
            <circle cx="150" cy="50" r="3.4" fill="#22d3ee" />
            <circle cx="162" cy="42" r="4.4" fill="#22d3ee" />
            <circle cx="176" cy="32" r="5.6" fill="#22d3ee" />
          </g>
        )}
        {effectiveMood === "sleep" && (
          <g className={styles.zzz} fill="#9fd9ef" fontFamily="var(--font-display, sans-serif)" fontWeight="700">
            <text x="150" y="58" fontSize="13">z</text>
            <text x="164" y="44" fontSize="17">Z</text>
            <text x="182" y="28" fontSize="22">Z</text>
          </g>
        )}
        {effectiveMood === "shock" && (
          <text className={styles.shockMark} x="170" y="44" fontSize="30" fill="#22d3ee" fontFamily="var(--font-display, sans-serif)" fontWeight="900">!</text>
        )}
        {effectiveMood === "focus" && (
          <rect className={styles.scanLine} x="56" y="58" width="108" height="3" rx="1.5" fill="#7df9ff" opacity="0.7" />
        )}
      </svg>
    </div>
  );
}

function Eyes({ mood, blinking }: { mood: VyroMood; blinking: boolean }) {
  const blink = blinking && mood !== "sleep" && mood !== "shock";

  if (mood === "happy") {
    return (
      <g filter="url(#vyroEyeGlow)" stroke="url(#vyroEye)" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d={`M${LEFT_EYE_X - 12} ${EYE_Y + 5} Q ${LEFT_EYE_X} ${EYE_Y - 13} ${LEFT_EYE_X + 12} ${EYE_Y + 5}`} />
        <path d={`M${RIGHT_EYE_X - 12} ${EYE_Y + 5} Q ${RIGHT_EYE_X} ${EYE_Y - 13} ${RIGHT_EYE_X + 12} ${EYE_Y + 5}`} />
      </g>
    );
  }

  if (mood === "sleep") {
    return (
      <g filter="url(#vyroEyeGlow)" stroke="#5fb8d6" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85">
        <path d={`M${LEFT_EYE_X - 12} ${EYE_Y} Q ${LEFT_EYE_X} ${EYE_Y + 9} ${LEFT_EYE_X + 12} ${EYE_Y}`} />
        <path d={`M${RIGHT_EYE_X - 12} ${EYE_Y} Q ${RIGHT_EYE_X} ${EYE_Y + 9} ${RIGHT_EYE_X + 12} ${EYE_Y}`} />
      </g>
    );
  }

  if (mood === "focus") {
    return (
      <g filter="url(#vyroEyeGlow)" fill="url(#vyroEye)">
        <rect x={LEFT_EYE_X - 12} y={EYE_Y - 4} width="24" height="8" rx="4" />
        <rect x={RIGHT_EYE_X - 12} y={EYE_Y - 4} width="24" height="8" rx="4" />
      </g>
    );
  }

  if (mood === "shock") {
    return (
      <g filter="url(#vyroEyeGlow)" fill="url(#vyroEye)">
        <rect x={LEFT_EYE_X - 14} y={EYE_Y - 16} width="28" height="32" rx="13" />
        <rect x={RIGHT_EYE_X - 14} y={EYE_Y - 16} width="28" height="32" rx="13" />
        <circle cx={LEFT_EYE_X} cy={EYE_Y} r="5" fill="#06121f" opacity="0.5" />
        <circle cx={RIGHT_EYE_X} cy={EYE_Y} r="5" fill="#06121f" opacity="0.5" />
      </g>
    );
  }

  // idle / thinking — tall rounded capsules; thinking looks up a touch
  const lift = mood === "thinking" ? -5 : 0;
  return (
    <g
      filter="url(#vyroEyeGlow)"
      fill="url(#vyroEye)"
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        transform: `translateY(${lift}px) scaleY(${blink ? 0.12 : 1})`,
        transition: "transform 90ms ease",
      }}
    >
      <rect x={LEFT_EYE_X - 9} y={EYE_Y - 17} width="18" height="34" rx="9" />
      <rect x={RIGHT_EYE_X - 9} y={EYE_Y - 17} width="18" height="34" rx="9" />
      <circle cx={LEFT_EYE_X - 3} cy={EYE_Y - 8} r="3" fill="#ffffff" opacity="0.65" />
      <circle cx={RIGHT_EYE_X - 3} cy={EYE_Y - 8} r="3" fill="#ffffff" opacity="0.65" />
    </g>
  );
}

function Mouth({ mood }: { mood: VyroMood }) {
  if (mood === "happy") {
    return (
      <path
        d="M101 120 Q110 129 119 120"
        stroke="url(#vyroEye)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#vyroEyeGlow)"
      />
    );
  }
  if (mood === "shock") {
    return <circle cx="110" cy="122" r="5" fill="none" stroke="#22d3ee" strokeWidth="3.5" filter="url(#vyroEyeGlow)" />;
  }
  if (mood === "focus") {
    return <rect x="103" y="121" width="14" height="3" rx="1.5" fill="#3fe0f5" opacity="0.8" />;
  }
  // idle / thinking / sleep: subtle neutral hint
  return <rect x="104" y="121" width="12" height="2.6" rx="1.3" fill="#3fe0f5" opacity="0.5" />;
}
