"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Moon, Play, Sun, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { startPolarCheckout } from "./lib/polar-checkout";
import VyroCompanion, { type VyroMood } from "./components/VyroCompanion";

const voiceReactions = [
  { src: "/audio/robot_click_01.mp3", line: "Bro, I’m listening." },
  { src: "/audio/robot_click_02.mp3", line: "Don’t poke me. I’m sensitive." },
];

const features = [
  { icon: "◉", title: "Listens", text: "Say it out loud. Typing is very 2025.", color: "var(--pink)" },
  { icon: "↗", title: "Talks", text: "Useful answers. Questionable attitude.", color: "var(--blue)" },
  { icon: "⌘", title: "Opens apps", text: "Chrome, Spotify, and your 47th tab.", color: "var(--yellow)" },
  { icon: "✦", title: "Remembers you", text: "Your habits. Your apps. Your crimes.", color: "var(--green)" },
];

const faqs = [
  ["Is VYRO for Windows?", "Yep. VYRO lives happily on Windows 10 and 11."],
  ["Does it use voice?", "Yes. Talk naturally and VYRO talks back, sometimes with opinions."],
  ["Can it open apps?", "Absolutely. Ask it to open apps, files, websites, and more."],
  ["Do I need an internet connection?", "Some features work offline. Advanced AI and cloud features may require an internet connection."],
  ["Does VYRO have emotions?", "Kind of. VYRO can get happy, bored, sleepy, excited, shocked, and occasionally dramatic."],
  ["Does VYRO sleep?", "Yes. If you ignore VYRO for too long, it may get bored, complain, and fall asleep until you come back."],
  ["What makes VYRO different?", "Most assistants live inside a chat window. VYRO Desktop Assistant lives on your desktop as a playful Desktop AI Robot with a personality."],
];

const socialProofMessages = [
  "Someone just downloaded VYRO 🤖",
  "Another desktop gained a personality ✨",
  "VYRO moved into a new PC 🏠",
  "A new user adopted VYRO 💜",
  "Someone just unlocked Pro 🚀",
];

const roadmapItems = [
  { badge: "current", icon: "✅", title: "Desktop Companion", description: "Voice commands, app launching, emotions, sleep mode, focus mode, quiet mode, and funny reactions.", tone: "current" },
  { badge: "coming soon", icon: "🎙️", title: "Custom Voice Packs", description: "Add new VYRO voices, robot sounds, funny reactions, and custom personality packs.", tone: "soon" },
  { badge: "coming soon", icon: "🧠", title: "Smart Memory", description: "VYRO will remember your name, favorite mode, habits, and small personal preferences.", tone: "soon" },
  { badge: "future", icon: "👁️", title: "Screen Awareness", description: "VYRO will understand broad desktop context without reading private data.", tone: "future" },
  { badge: "future", icon: "🤖", title: "Agent Mode", description: "Let VYRO help with tasks, research, reminders, and workflow automation.", tone: "future" },
];

function SocialProofToast() {
  const [message, setMessage] = useState<string | null>(null);
  const lastMessageRef = useRef(-1);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      showTimer = setTimeout(() => {
        let nextIndex = Math.floor(Math.random() * socialProofMessages.length);
        if (nextIndex === lastMessageRef.current) nextIndex = (nextIndex + 1) % socialProofMessages.length;
        lastMessageRef.current = nextIndex;
        setMessage(socialProofMessages[nextIndex]);
        hideTimer = setTimeout(() => {
          setMessage(null);
          scheduleNext();
        }, 4000);
      }, 30000 + Math.random() * 30000);
    };

    scheduleNext();
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.aside className="social-proof-toast" initial={{ opacity: 0, x: -24, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: -14, y: 8 }} transition={{ duration: .35, ease: "easeOut" }} aria-live="polite">
          <span className="social-proof-dot" />
          <p><b>VYRO UPDATE</b>{message}</p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

const MOOD_CONTROLS: { label: string; mood: VyroMood; emoji: string }[] = [
  { label: "Wave", mood: "happy", emoji: "👋" },
  { label: "Think", mood: "thinking", emoji: "💭" },
  { label: "Focus", mood: "focus", emoji: "🎯" },
  { label: "Sleep", mood: "sleep", emoji: "😴" },
  { label: "Shock", mood: "shock", emoji: "⚡" },
];

function VYROMascot() {
  const [line, setLine] = useState("");
  const [showLine, setShowLine] = useState(false);
  const [mood, setMood] = useState<VyroMood>("idle");
  const nextVoiceRef = useRef(0);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const moodTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      activeAudioRef.current?.pause();
      clearTimeout(moodTimerRef.current);
    };
  }, []);

  function flashMood(next: VyroMood, ms: number) {
    setMood(next);
    clearTimeout(moodTimerRef.current);
    moodTimerRef.current = setTimeout(() => setMood("idle"), ms);
  }

  function poke() {
    const reaction = voiceReactions[nextVoiceRef.current];
    nextVoiceRef.current = (nextVoiceRef.current + 1) % voiceReactions.length;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(reaction.src);
    activeAudioRef.current = audio;
    audio.addEventListener("ended", () => {
      if (activeAudioRef.current === audio) {
        activeAudioRef.current = null;
        setShowLine(false);
      }
    }, { once: true });

    setLine(reaction.line);
    setShowLine(true);
    void audio.play().catch(() => {});

    flashMood(Math.random() < 0.3 ? "shock" : "happy", 1000);
  }

  return (
    <div className="vyro-stage">
      <AnimatePresence>
        {showLine && (
          <motion.button aria-label="Close VYRO speech bubble" className="vyro-speech" initial={{ opacity: 0, scale: .8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} onClick={() => setShowLine(false)}>
            {line}<X size={13} />
          </motion.button>
        )}
      </AnimatePresence>

      <VyroCompanion mood={mood} onPoke={poke} size={300} ariaLabel="Poke VYRO, your AI desktop companion" />

      <div className="vyro-moods" role="group" aria-label="Try VYRO's moods">
        {MOOD_CONTROLS.map((control) => (
          <button
            key={control.label}
            type="button"
            className={mood === control.mood ? "is-active" : ""}
            aria-pressed={mood === control.mood}
            onClick={() => flashMood(control.mood, control.mood === "sleep" ? 4500 : 2800)}
          >
            <span aria-hidden="true">{control.emoji}</span>{control.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceCard() {
  return (
    <motion.article className="price-card accent" whileHover={{ y: -8 }}>
      <span className="popular">ONE-TIME</span>
      <h3>VYRO</h3><p className="price">$19</p><p className="price-note">One-time purchase</p>
      <ul>
        <li><Check size={16} /> Voice Commands</li>
        <li><Check size={16} /> Open Apps</li>
        <li><Check size={16} /> Emotions &amp; Reactions</li>
        <li><Check size={16} /> Floating Desktop Companion</li>
        <li><Check size={16} /> Future Updates</li>
      </ul>
      <button onClick={() => startPolarCheckout()}>Get VYRO <ArrowUpRight size={17} /></button>
    </motion.article>
  );
}

function FoundersEditionCard() {
  return (
    <motion.article className="price-card accent founder-card" whileHover={{ y: -8 }}>
      <span className="popular">Best Value</span>
      <h3>🚀 Founder&apos;s Edition</h3>
      <p className="founder-intro">Be one of the first VYRO users.</p>
      <p className="price">$19 <span>today</span></p>
      <p className="price-note">$49+ after launch</p>
      <ul>
        <li><Check size={16} /> Lifetime License</li>
        <li><Check size={16} /> All Future Updates</li>
        <li><Check size={16} /> All Future AI Modules</li>
        <li><Check size={16} /> No Subscription Ever</li>
        <li><Check size={16} /> Priority Access to New Features</li>
      </ul>
      <button onClick={() => startPolarCheckout()}>Get VYRO <ArrowUpRight size={17} /></button>
      <small className="price-footer">Limited Early Adopter Offer</small>
    </motion.article>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <main>
      <div className="noise" />
      <SocialProofToast />
      <nav>
        <a className="ph-badge" href="#pricing"><span>🤖</span><b>THE AI THAT LIVES ON YOUR DESKTOP</b></a>
        <div className="nav-links"><a href="/save-50">Save 50%</a><a href="#faq">FAQ</a><a href="/recover-key">Recover Key</a><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>
      </nav>

      <section className="hero">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><i /> Windows finally has a personality</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>VYRO<span>®</span></motion.h1>
        <VYROMascot />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
          <h2>Talk to your desktop.<br /><em>It talks back.</em></h2>
          <a href="#pricing" className="main-cta">Download for Windows <ArrowDown size={20} /></a>
          <small>VYRO AI for Windows 10 &amp; 11</small>
        </motion.div>
        <motion.div className="hero-chips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
          <span>Listens</span><span>Talks</span><span>Opens apps</span><span>Gets bored</span>
        </motion.div>
      </section>

      <section className="social-proof-section">
        <motion.div className="social-proof-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: .48, ease: "easeOut" }}>
          <motion.div className="social-proof-float" animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <span className="social-proof-label">🤖 Trusted by early VYRO testers</span>
            <div className="social-proof-stars" aria-label="Five stars">
              {[0, 1, 2, 3, 4].map((star) => <motion.span key={star} whileHover={{ y: -4, scale: 1.14, rotate: star % 2 ? 8 : -8 }}>★</motion.span>)}
            </div>
            <blockquote>&quot;Your desktop finally has a personality.&quot;</blockquote>
            <p>Early users are already talking, laughing, and working with VYRO, an AI Assistant for Windows, every day.</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="promo-banner-shell">
        <motion.article className="promo-banner" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} whileHover={{ y: -5, rotate: -.25 }}>
          <div className="promo-icon" aria-hidden="true">🎬</div>
          <div className="promo-copy">
            <span>CREATOR REFUND PROGRAM</span>
            <h2>Make a Reel, Get 50% Back</h2>
            <p>Create a short TikTok, Instagram Reel, YouTube Short, or Facebook Reel about VYRO.</p>
            <div className="promo-rewards">
              <strong>2,000 views <b>→ Get 50% refunded</b></strong>
              <strong>20,000 views <b>→ Get 100% refunded</b></strong>
            </div>
          </div>
          <a href="/save-50" className="promo-button">See How It Works <ArrowUpRight size={17} /></a>
        </motion.article>
      </section>

      <section className="marquee"><div>LISTENS ✦ TALKS ✦ OPENS APPS ✦ DANCES BADLY ✦ HAS FEELINGS ✦ LISTENS ✦ TALKS ✦ OPENS APPS ✦ DANCES BADLY ✦ HAS FEELINGS ✦</div></section>

      <section className="section-shell features" id="features">
        <div className="section-heading"><span>01 / SKILLS</span><h2>What does it do?</h2><p>Mostly useful things.<br />Occasionally this.</p></div>
        <div className="feature-grid">{features.map((feature, i) => <motion.article key={feature.title} style={{ "--card-color": feature.color } as React.CSSProperties} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }}><span className="feature-icon">{feature.icon}</span><small>0{i + 1}</small><h3>{feature.title}</h3><p>{feature.text}</p></motion.article>)}</div>
      </section>

      <section className="section-shell demo" id="demo">
        <div className="demo-head"><span>02 / IN THE WILD</span><h2>See VYRO<br /><em>do its thing.</em></h2><p>No cinematic trailer. Just a Windows AI Companion living on your desktop.</p></div>
        <div className="video-shell">
          <div className="window-bar"><div><i /><i /><i /></div><span>vyro_demo_definitely_final.mp4</span><b>LIVE-ish</b></div>
          <video src="/vyro.mp4" controls={playing} autoPlay={playing} playsInline />
          {!playing && <button className="play-button" onClick={() => setPlaying(true)}><Play fill="currentColor" size={28} /><span>Watch the evidence</span></button>}
        </div>
        <div className="sound-note"><Volume2 size={18} /> Sound on. VYRO has things to say.</div>
      </section>

      <section className="section-shell pricing" id="pricing">
        <div className="section-heading centered"><span>03 / ONE LITTLE ROBOT</span><h2>One price.<br /><em>VYRO forever.</em></h2></div>
        <div className="price-grid"><PriceCard /><FoundersEditionCard /></div>
        <p className="purchased-link">Already purchased? <a href="/recover-key">Recover your license key</a></p>
        <motion.aside className="macos-coming-soon" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .65 }} whileHover={{ y: -5, rotate: -.35 }}>
          <div className="macos-icon" aria-hidden="true">🍎</div>
          <div className="macos-copy">
            <span>COMING SOON</span>
            <h3>macOS Coming Soon</h3>
            <p>Currently building and optimizing VYRO for macOS.</p>
          </div>
          <small>Windows available now</small>
        </motion.aside>
      </section>

      <section className="section-shell faq" id="faq">
        <div className="section-heading"><span>04 / QUESTIONS</span><h2>Frequently<br /><em>asked stuff.</em></h2><p>Still confused? Perfect.<br />You’re ready.</p></div>
        <div className="faq-list">{faqs.map(([question, answer], i) => <article key={question}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>0{i + 1}</span>{question}<ChevronDown className={openFaq === i ? "up" : ""} /></button><AnimatePresence>{openFaq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}</AnimatePresence></article>)}</div>
      </section>

      <section className="section-shell roadmap" id="roadmap">
        <motion.div className="roadmap-head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }}>
          <span>05 / WHAT’S NEXT</span>
          <h2>Roadmap</h2>
          <p>VYRO is just getting started.</p>
        </motion.div>
        <div className="roadmap-timeline">
          <motion.div className="roadmap-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: 1.15, ease: "easeOut" }} />
          {roadmapItems.map((item, index) => (
            <motion.article key={item.title} className={`roadmap-item roadmap-${item.tone}`} initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .42 }} transition={{ duration: .42, delay: index * .045 }}>
              <motion.div className="roadmap-icon" initial={{ scale: .65, rotate: -10 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: index * .045 }}>{item.icon}</motion.div>
              <div className="roadmap-card">
                <span className="roadmap-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <footer id="footer"><div className="footer-robot">V</div><h2>Your desktop is lonely.</h2><button type="button" className="main-cta" onClick={() => startPolarCheckout()}>Give it VYRO <ArrowUpRight size={20} /></button><p>Made by a human who wanted a robot on his desktop.</p><small>Secure payments powered by Polar</small><small>© 2026 VYRO / PLEASE DON’T TEACH IT TAXES</small></footer>
    </main>
  );
}
