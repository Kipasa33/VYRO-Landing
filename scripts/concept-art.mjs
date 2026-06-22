/**
 * Generates the VYRO companion concept board.
 * Writes an SVG (vector) and a PNG (raster) to /public/concept.
 *
 *   node scripts/concept-art.mjs
 *
 * The character markup mirrors app/components/VyroCompanion.tsx so the
 * concept art stays faithful to the live implementation.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "concept");
mkdirSync(OUT, { recursive: true });

const L = 86,
  R = 134,
  EY = 96;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function characterSVG(mood) {
  let eyes;
  if (mood === "happy") {
    eyes = `<g filter="url(#g)" stroke="url(#eye)" stroke-width="7" stroke-linecap="round" fill="none">
      <path d="M${L - 12} ${EY + 5} Q ${L} ${EY - 13} ${L + 12} ${EY + 5}"/>
      <path d="M${R - 12} ${EY + 5} Q ${R} ${EY - 13} ${R + 12} ${EY + 5}"/></g>`;
  } else if (mood === "sleep") {
    eyes = `<g filter="url(#g)" stroke="#5fb8d6" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M${L - 12} ${EY} Q ${L} ${EY + 9} ${L + 12} ${EY}"/>
      <path d="M${R - 12} ${EY} Q ${R} ${EY + 9} ${R + 12} ${EY}"/></g>`;
  } else if (mood === "focus") {
    eyes = `<g filter="url(#g)" fill="url(#eye)">
      <rect x="${L - 12}" y="${EY - 4}" width="24" height="8" rx="4"/>
      <rect x="${R - 12}" y="${EY - 4}" width="24" height="8" rx="4"/></g>`;
  } else if (mood === "shock") {
    eyes = `<g filter="url(#g)" fill="url(#eye)">
      <rect x="${L - 14}" y="${EY - 16}" width="28" height="32" rx="13"/>
      <rect x="${R - 14}" y="${EY - 16}" width="28" height="32" rx="13"/>
      <circle cx="${L}" cy="${EY}" r="5" fill="#06121f" opacity="0.5"/>
      <circle cx="${R}" cy="${EY}" r="5" fill="#06121f" opacity="0.5"/></g>`;
  } else {
    const lift = mood === "thinking" ? -5 : 0;
    eyes = `<g filter="url(#g)" fill="url(#eye)" transform="translate(0 ${lift})">
      <rect x="${L - 9}" y="${EY - 17}" width="18" height="34" rx="9"/>
      <rect x="${R - 9}" y="${EY - 17}" width="18" height="34" rx="9"/>
      <circle cx="${L - 3}" cy="${EY - 8}" r="3" fill="#fff" opacity="0.65"/>
      <circle cx="${R - 3}" cy="${EY - 8}" r="3" fill="#fff" opacity="0.65"/></g>`;
  }

  let mouth;
  if (mood === "happy")
    mouth = `<path d="M101 120 Q110 129 119 120" stroke="url(#eye)" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g)"/>`;
  else if (mood === "shock")
    mouth = `<circle cx="110" cy="122" r="5" fill="none" stroke="#22d3ee" stroke-width="3.5" filter="url(#g)"/>`;
  else if (mood === "focus")
    mouth = `<rect x="103" y="121" width="14" height="3" rx="1.5" fill="#3fe0f5" opacity="0.8"/>`;
  else mouth = `<rect x="104" y="121" width="12" height="2.6" rx="1.3" fill="#3fe0f5" opacity="0.5"/>`;

  let deco = "";
  if (mood === "thinking")
    deco = `<g fill="#22d3ee"><circle cx="150" cy="50" r="3.4"/><circle cx="162" cy="42" r="4.4"/><circle cx="176" cy="32" r="5.6"/></g>`;
  if (mood === "sleep")
    deco = `<g fill="#9fd9ef" font-family="sans-serif" font-weight="700"><text x="150" y="58" font-size="13">z</text><text x="164" y="44" font-size="17">Z</text><text x="182" y="28" font-size="22">Z</text></g>`;
  if (mood === "shock")
    deco = `<text x="168" y="44" font-size="30" fill="#22d3ee" font-family="sans-serif" font-weight="900">!</text>`;
  if (mood === "focus")
    deco = `<rect x="56" y="92" width="108" height="3" rx="1.5" fill="#7df9ff" opacity="0.7"/>`;

  return `
   <ellipse cx="110" cy="146" rx="104" ry="104" fill="url(#glow)"/>
   <ellipse cx="110" cy="246" rx="56" ry="9" fill="#0b2233" opacity="0.18"/>
   <rect x="32" y="150" width="17" height="46" rx="8.5" fill="url(#arm)" stroke="#fff" stroke-opacity="0.7"/>
   <rect x="171" y="150" width="17" height="46" rx="8.5" fill="url(#arm)" stroke="#fff" stroke-opacity="0.7"/>
   <rect x="45" y="163" width="32" height="20" rx="10" fill="url(#arm)" stroke="#fff" stroke-opacity="0.55"/>
   <rect x="143" y="163" width="32" height="20" rx="10" fill="url(#arm)" stroke="#fff" stroke-opacity="0.55"/>
   <circle cx="59" cy="173" r="4.6" fill="#fff" opacity="0.55"/>
   <circle cx="161" cy="173" r="4.6" fill="#fff" opacity="0.55"/>
   <rect x="72" y="156" width="76" height="80" rx="34" fill="url(#shell)" stroke="#fff" stroke-opacity="0.8"/>
   <circle cx="110" cy="198" r="9" fill="url(#eye)" filter="url(#g)"/>
   <line x1="110" y1="36" x2="110" y2="22" stroke="#c9d6e2" stroke-width="3" stroke-linecap="round"/>
   <circle cx="110" cy="18" r="5" fill="url(#eye)" filter="url(#g)"/>
   <rect x="34" y="34" width="152" height="128" rx="50" fill="url(#shell)" stroke="#fff" stroke-opacity="0.85"/>
   <ellipse cx="96" cy="58" rx="42" ry="13" fill="#fff" opacity="0.55"/>
   <rect x="56" y="58" width="108" height="80" rx="34" fill="url(#glass)" stroke="#7dd3fc" stroke-opacity="0.35"/>
   ${eyes}${mouth}${deco}`;
}

const DEFS = `<defs>
  <linearGradient id="shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.55" stop-color="#f3f7fb"/><stop offset="1" stop-color="#c9d6e2"/></linearGradient>
  <linearGradient id="arm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cdd9e5"/></linearGradient>
  <radialGradient id="glass" cx="0.5" cy="0.32" r="0.85"><stop offset="0" stop-color="#16263f"/><stop offset="0.62" stop-color="#0a1424"/><stop offset="1" stop-color="#05080f"/></radialGradient>
  <linearGradient id="eye" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7f3ff"/><stop offset="0.5" stop-color="#3fe0f5"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#38bdf8" stop-opacity="0.55"/><stop offset="0.45" stop-color="#22d3ee" stop-opacity="0.22"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
  <filter id="g" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0f1c"/><stop offset="1" stop-color="#0c1426"/></linearGradient>
  <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dd3fc"/><stop offset="0.5" stop-color="#22d3ee"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
</defs>`;

const states = [
  ["idle", "Idle", "Blinks, breathes & follows your cursor"],
  ["happy", "Happy", "Greets you with a warm smile"],
  ["thinking", "Thinking", "Processing — eyes glance up"],
  ["focus", "Focus mode", "Heads-down, distraction-free"],
  ["shock", "Shock", "Caught delightfully off guard"],
  ["sleep", "Sleep", "Drifts off when you're away"],
];

const W = 1680;
const H = 1180;
const cols = 3;
const margin = 80;
const gap = 40;
const cardW = (W - margin * 2 - gap * (cols - 1)) / cols;
const cardH = 360;
const gridTop = 250;

let cards = "";
states.forEach(([mood, label, desc], i) => {
  const cx = margin + (i % cols) * (cardW + gap);
  const cy = gridTop + Math.floor(i / cols) * (cardH + gap);
  const charScale = 0.92;
  const charW = 220 * charScale;
  const charH = 260 * charScale;
  const tx = cx + (cardW - charW) / 2;
  const ty = cy + 18;
  cards += `
  <g>
    <rect x="${cx}" y="${cy}" width="${cardW}" height="${cardH}" rx="26" fill="#0e1830" stroke="#1f3354" stroke-opacity="0.9"/>
    <rect x="${cx}" y="${cy}" width="${cardW}" height="${cardH}" rx="26" fill="url(#glow)" opacity="0.18"/>
    <g transform="translate(${tx} ${ty}) scale(${charScale})">${characterSVG(mood)}</g>
    <text x="${cx + cardW / 2}" y="${cy + cardH - 52}" text-anchor="middle" fill="#eaf6ff" font-family="sans-serif" font-weight="700" font-size="26">${esc(label)}</text>
    <text x="${cx + cardW / 2}" y="${cy + cardH - 26}" text-anchor="middle" fill="#8fb6d6" font-family="sans-serif" font-size="15">${esc(desc)}</text>
  </g>`;
});

// palette + pillars footer
const swatches = [
  ["#0A1424", "Navy"],
  ["#05080F", "Glass"],
  ["#22D3EE", "Cyan"],
  ["#38BDF8", "Sky"],
  ["#FFFFFF", "Shell"],
];
const footY = gridTop + cardH * 2 + gap + 40;
let palette = `<text x="${margin}" y="${footY}" fill="#7fa6c8" font-family="sans-serif" font-weight="700" font-size="15" letter-spacing="2">PALETTE</text>`;
swatches.forEach(([hex, name], i) => {
  const sx = margin + i * 150;
  palette += `<rect x="${sx}" y="${footY + 14}" width="40" height="40" rx="10" fill="${hex}" stroke="#28415f"/>
  <text x="${sx + 52}" y="${footY + 32}" fill="#dfeefc" font-family="sans-serif" font-size="14" font-weight="700">${name}</text>
  <text x="${sx + 52}" y="${footY + 50}" fill="#6f93b4" font-family="sans-serif" font-size="12">${hex}</text>`;
});
const pillars = "Cute, not childish  ·  Premium &amp; friendly  ·  Instantly recognizable  ·  Apple-level polish";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${DEFS}
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<ellipse cx="${W * 0.2}" cy="120" rx="520" ry="260" fill="url(#glow)" opacity="0.4"/>
<ellipse cx="${W * 0.85}" cy="${H - 120}" rx="520" ry="300" fill="url(#glow)" opacity="0.3"/>
<text x="${margin}" y="120" fill="#5fb6e8" font-family="sans-serif" font-weight="700" font-size="16" letter-spacing="4">AI DESKTOP COMPANION — CONCEPT</text>
<text x="${margin}" y="190" fill="url(#title)" font-family="sans-serif" font-weight="800" font-size="74" letter-spacing="-2">VYRO</text>
<text x="${margin + 280}" y="190" fill="#cfe6fb" font-family="sans-serif" font-weight="400" font-size="26">"Your smart AI friend living on your desktop."</text>
${cards}
${palette}
<text x="${margin}" y="${footY + 110}" fill="#9fc1de" font-family="sans-serif" font-weight="700" font-size="18">${pillars}</text>
</svg>`;

const svgPath = join(OUT, "vyro-companion-concept.svg");
writeFileSync(svgPath, svg);
console.log("Wrote", svgPath);

// Rasterize to PNG with resvg if available.
try {
  const { Resvg } = await import("@resvg/resvg-js");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  const pngPath = join(OUT, "vyro-companion-concept.png");
  writeFileSync(pngPath, png);
  console.log("Wrote", pngPath, `(${png.length} bytes)`);
} catch (err) {
  console.warn("PNG rasterization skipped:", err?.message || err);
}
