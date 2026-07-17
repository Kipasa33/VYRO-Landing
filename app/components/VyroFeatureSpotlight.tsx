import { AnimatedTestimonials, type AnimatedTestimonialItem } from "@/components/ui/animated-testimonials";

const vyroFeatures: AnimatedTestimonialItem[] = [
  {
    name: "Always by your side",
    designation: "Desktop companion",
    quote: "VYRO floats on your desktop, ready to listen, react, and help when you need it.",
    src: "/showcase/vyro-always.png",
  },
  {
    name: "Voice commands",
    designation: "Hands-free control",
    quote: "Open apps, search, and control supported Windows actions with natural voice commands.",
    src: "/showcase/vyro-voice.png",
  },
  {
    name: "Open apps instantly",
    designation: "Fast desktop actions",
    quote: "Launch your favorite apps and websites without breaking your flow.",
    src: "/showcase/vyro-open-apps.png",
  },
  {
    name: "Emotions & personality",
    designation: "A companion that reacts",
    quote: "VYRO can show moods, react naturally, and make your desktop feel more alive.",
    src: "/showcase/vyro-emotions.png",
  },
  {
    name: "Focus with VYRO",
    designation: "Deep work mode",
    quote: "Start focus sessions, keep distractions quiet, and stay locked in while you work.",
    src: "/showcase/vyro-focus.png",
  },
  {
    name: "Fully customizable",
    designation: "Personal settings",
    quote: "Adjust voice, emotions, startup behavior, sounds, and the way VYRO fits your desktop.",
    src: "/showcase/vyro-customizable.png",
  },
];

export default function VyroFeatureSpotlight() {
  return (
    <section className="relative mx-auto w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-[linear-gradient(145deg,rgba(255,255,255,.82),rgba(231,249,255,.76)_52%,rgba(241,237,255,.78))] px-4 py-10 shadow-[0_28px_80px_rgba(44,66,105,0.12)] sm:px-7 sm:py-12 lg:px-10" aria-labelledby="feature-spotlight-title">
      <div className="pointer-events-none absolute -left-24 top-6 size-64 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-violet-400/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <span className="inline-flex min-h-7 items-center rounded-full border border-slate-900/10 bg-white/70 px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm">
          Feature spotlight
        </span>
        <h2 id="feature-spotlight-title" className="mt-4 font-sans text-[clamp(2.25rem,7vw,4.6rem)] font-black leading-[.98] tracking-[-0.065em] text-slate-950">
          Explore what VYRO can do.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base font-medium leading-7 text-slate-600">
          A closer look at the desktop companion, voice commands, emotions, focus mode, and customization.
        </p>
      </div>
      <div className="relative">
        <AnimatedTestimonials testimonials={vyroFeatures} autoplay />
      </div>
    </section>
  );
}
