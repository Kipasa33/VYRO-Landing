# VYRO Companion — Design & Implementation Plan

> "Your smart AI friend living on your desktop."

VYRO is a premium animated AI companion that lives in the landing hero today and is
built to graduate into the desktop (Electron) app later. This document captures the
design rationale, the component API, the animation system, the mood state machine,
accessibility notes, and integration guidance.

---

## 1. Design goals

| Goal | How it's expressed |
| --- | --- |
| Cute but not childish | Compact proportions, soft rounded shell, friendly eyes — no exaggerated cartoon features |
| Premium but friendly | Glossy white shell, dark glass face, restrained cyan accent, soft blue glow |
| Instantly recognizable | Single silhouette: oversized rounded head + small floating body + detached side arms |
| Emotionally alive | Natural blinking, cursor eye-tracking, gentle float, and six expressive moods |

### Personality references
EMO Robot, Eilik, Wall-E, Cursor's mascot polish, and Apple-level material finish.

### Explicitly avoided
Scary or human faces, generic boxy-robot looks, large empty eyes, cheap cartoon styling.

### Visual identity / palette
| Token | Value | Use |
| --- | --- | --- |
| Shell | `#ffffff → #c9d6e2` gradient | Head + body + arms |
| Glass face | `#16263f → #05080f` radial | Dark face panel |
| Cyan accent | `#22d3ee` (`#a7f3ff → #22d3ee` gradient) | Eyes, core light, status orb |
| Glow | `#38bdf8 / #22d3ee` | Soft ambient halo |

The cyan accent matches the manifest `theme_color` and the favicon V-mark so the brand
reads consistently across tab icon, hero, and desktop app.

---

## 2. Component API

`app/components/VyroCompanion.tsx` exports a single default component plus the
`VyroMood` type.

```tsx
import VyroCompanion, { type VyroMood } from "@/app/components/VyroCompanion";

<VyroCompanion
  mood="idle"            // "idle" | "happy" | "sleep" | "thinking" | "shock" | "focus"
  size={300}             // px width; height follows the 220×260 aspect ratio
  onPoke={() => {}}      // fired on click / Enter / Space
  idleToSleepMs={14000}  // ms of inactivity before auto-sleep (0 disables)
  className="..."
  ariaLabel="VYRO, your AI desktop companion"
/>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `mood` | `VyroMood` | `"idle"` | A forced mood (anything but `idle`) overrides auto-sleep |
| `size` | `number` | `280` | Width in px; SVG scales crisply at any size |
| `onPoke` | `() => void` | — | Poke callback (pointer + keyboard) |
| `idleToSleepMs` | `number` | `14000` | Inactivity-to-sleep delay; `0` disables |
| `className` | `string` | — | Extra class on the root |
| `ariaLabel` | `string` | `"VYRO, your AI desktop companion"` | Accessible label |

The art is a single inline SVG (`viewBox="0 0 220 260"`) so every part — eyes, mouth,
arms, glow, head — can be animated independently and stays sharp at any resolution.

---

## 3. Animation system

Motion is split between **CSS** (continuous, declarative) and **JS** (input-driven).

### CSS-driven (in `VyroCompanion.module.css`)
- `vyro-float` — gentle hover bob of the whole character (speeds up on hover).
- `vyro-glow` / `vyro-focus-glow` — breathing ambient halo.
- `vyro-shadow` — ground shadow scales inversely with the float for a grounded feel.
- `vyro-body`, `vyro-arm-l`, `vyro-arm-r` — body + detached arms drift with slight offset.
- `vyro-core`, `vyro-orb`, `vyro-sweep` — core light pulse, status orb pulse, glass sweep.
- Mood decorations: `vyro-think` (rising dots), `vyro-zzz` (sleep z's), `vyro-pop`
  (shock `!`), `vyro-scan` (focus scan line), plus `vyro-jolt` / `vyro-hop` /
  `vyro-breathe` mood-level character motion.

### JS-driven (in `VyroCompanion.tsx`)
- **Eye + head tracking:** a `pointermove` listener computes a normalized cursor
  offset, smooths it (`requestAnimationFrame` lerp at `0.18`), and writes CSS custom
  properties `--veye-x`, `--veye-y`, `--vtilt` on the root. The eye group translates
  and the head subtly rotates toward the cursor. rAF is only scheduled while the value
  is still settling, so it idles at zero CPU.
- **Natural blinking:** randomized interval (2.4–6.6s) with an occasional double-blink;
  suppressed during `sleep` and `shock`. Implemented with a `scaleY` transform on the
  eye group.
- **Auto-sleep:** after `idleToSleepMs` of no pointer/key/focus activity the companion
  drifts to sleep; any activity (or a poke) wakes it. Disabled when a mood is forced.

---

## 4. Mood state machine

```
                 forced mood (prop) ─────────────► happy | thinking | focus | shock | sleep
                       │ (mood !== "idle" wins)
   mood === "idle" ────┤
                       │  inactivity > idleToSleepMs ──► sleep
                       └─ activity / poke ────────────► idle
```

- `effectiveMood = forced ? mood : (asleep ? "sleep" : "idle")`.
- Each mood swaps the `Eyes` and `Mouth` sub-components and toggles a matching
  decoration overlay, driven by the `data-mood` attribute on the root.

| Mood | Eyes | Signature motion / decoration |
| --- | --- | --- |
| `idle` | Tall cyan capsules with catchlights | Float + blink |
| `happy` | Upward arcs (smiling eyes) | Hop + smile mouth |
| `thinking` | Capsules looking up | Rising dot trail |
| `focus` | Narrow scan-bars | Scan line sweep, tighter glow |
| `shock` | Wide round eyes + pupils | Jolt + popping `!` |
| `sleep` | Downward arcs (closed) | Slow breathe + drifting `z`'s |

In the landing page, `flashMood(mood, ms)` temporarily sets a mood then returns to
`idle`, used by both the poke handler (random happy/shock) and the demo buttons.

---

## 5. Accessibility

- Root is `role="button"`, `tabIndex={0}`, with an `aria-label`; poke works on click,
  `Enter`, and `Space`. The SVG itself is `aria-hidden`.
- `:focus-visible` shows a clear cyan focus ring.
- **`prefers-reduced-motion`** is honored: a global rule in `app/globals.css` reduces
  all animation durations/iterations, which covers every `.vyro-*` CSS animation. The
  JS smoothing degrades to a near-instant settle and adds no looping motion.
- Mood demo buttons use `aria-pressed` and a labelled `role="group"`.

---

## 6. Integration (landing page)

`app/page.tsx` › `VYROMascot()`:
- Holds `mood` state and a `flashMood(next, ms)` helper.
- Renders `<VyroCompanion mood={mood} onPoke={poke} size={300} />` inside `.vyro-stage`.
- `poke()` plays a random voice line + speech bubble (preserved from the original
  mascot) and flashes `happy`/`shock`.
- `MOOD_CONTROLS` render tasteful demo buttons (Wave / Think / Focus / Sleep / Shock).
- Stage styling (`.vyro-stage`, `.vyro-speech`, `.vyro-moods`) lives in `globals.css`;
  the legacy mascot markup and CSS were removed.

---

## 7. Concept art

`scripts/concept-art.mjs` renders a concept board to `public/concept/`
(`vyro-companion-concept.svg` + `.png`, 1680×1180) showing all six expression states,
the palette, and the design pillars. Regenerate with:

```bash
node scripts/concept-art.mjs
```

---

## 8. Future: desktop (Electron) usage

The component is self-contained (inline SVG + scoped CSS module, no external image
assets), so it ports directly into the desktop shell:
- Drive `mood` from app state (listening → `idle`/`focus`, processing → `thinking`,
  error/alert → `shock`, idle timeout → `sleep`, success → `happy`).
- Wire `onPoke` to the assistant's wake/interaction handler.
- Keep `idleToSleepMs` aligned with the desktop idle policy, or set `0` and drive sleep
  explicitly from the host.
- The transparent, edge-to-edge SVG suits a frameless always-on-top companion window.

---

## 9. File map

| File | Purpose |
| --- | --- |
| `app/components/VyroCompanion.tsx` | Animated SVG component + mood state machine |
| `app/components/VyroCompanion.module.css` | Scoped animations + keyframes |
| `app/page.tsx` | Hero integration, poke/voice, mood demo controls |
| `app/globals.css` | Stage/speech/mood-button styles, reduced-motion rule |
| `scripts/concept-art.mjs` | Concept board generator |
| `public/concept/vyro-companion-concept.{svg,png}` | Generated concept art |
| `docs/vyro-companion.md` | This document |
