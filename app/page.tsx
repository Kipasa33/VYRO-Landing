"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Moon, Pause, Play, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { startPolarCheckout } from "./lib/polar-checkout";
import { INSTAGRAM_URL, TIKTOK_URL } from "./lib/social-links";

const voiceReactions = ["/audio/robot_click_01.mp3", "/audio/robot_click_02.mp3"];

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

function TikTokIcon() {
  return (
    <span className="ugc-social-icon tiktok-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M14.4 3.4c.55 2.76 2.1 4.4 4.8 4.6v3.08a8.1 8.1 0 0 1-4.76-1.48v6.04a5.64 5.64 0 1 1-4.86-5.58v3.13a2.58 2.58 0 1 0 1.7 2.45V3.4h3.12Z" fill="currentColor" /></svg>
      <i />
    </span>
  );
}

function InstagramIcon() {
  return (
    <span className="ugc-social-icon instagram-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.65" cy="6.45" r="1.25" fill="currentColor" /></svg>
      <i />
    </span>
  );
}

function VYROMascot() {
  const nextVoiceRef = useRef(0);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      activeAudioRef.current?.pause();
    };
  }, []);

  function playReaction() {
    const reaction = voiceReactions[nextVoiceRef.current];
    nextVoiceRef.current = (nextVoiceRef.current + 1) % voiceReactions.length;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(reaction);
    activeAudioRef.current = audio;
    audio.addEventListener("ended", () => {
      if (activeAudioRef.current === audio) {
        activeAudioRef.current = null;
      }
    }, { once: true });

    void audio.play();
  }

  return (
    <motion.div
      className="robot-wrap"
      animate={{ y: [0, -10, 0], scale: [1, 1.012, 1] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.button
        className="robot-video-button"
        onClick={playReaction}
        whileHover={{ y: -6, rotateZ: -1.2, scale: 1.025 }}
        whileTap={{ scale: .985 }}
        transition={{ duration: .25, ease: "easeOut" }}
        aria-label="Play VYRO reaction"
      >
        <video className="vyro-robot-video" autoPlay loop muted playsInline preload="metadata" aria-label="Animated VYRO AI companion mascot">
          <source src="/vyro-robot.webm" type="video/webm" />
        </video>
      </motion.button>
      <div className="shadow video-shadow" />
    </motion.div>
  );
}

function DemoVideoCard({ caption, src, poster, number }: { caption: string; src: string; poster: string; number: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function startDemo() {
    const video = videoRef.current;
    if (!video) return;

    if (video.ended) video.currentTime = 0;
    video.defaultMuted = false;
    video.muted = false;
    video.volume = 1;
    await video.play();
  }

  function pauseDemo() {
    videoRef.current?.pause();
  }

  return (
    <motion.article className="ugc-video-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} whileHover={{ y: -7 }} transition={{ duration: .45, ease: "easeOut" }}>
      <div className="ugc-video-frame">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={isPlaying}
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        <button className={`ugc-play-button${isPlaying ? " is-playing" : ""}`} type="button" onClick={() => void (isPlaying ? pauseDemo() : startDemo())} aria-label={`${isPlaying ? "Pause" : "Play with sound"} ${caption}`}>
          {isPlaying ? <Pause fill="currentColor" size={22} /> : <Play fill="currentColor" size={28} />}
        </button>
        <span className="ugc-video-number">{number}</span>
      </div>
      <div className="ugc-video-caption"><span>WATCH</span><h3>{caption}</h3></div>
    </motion.article>
  );
}

function FoundersEditionCard() {
  return (
    <motion.article className="price-card accent founder-card" whileHover={{ y: -8 }}>
      <span className="popular">🔥 Founder Offer</span>
      <span className="subscription-badge">No Monthly Subscription</span>
      <h3>Founder&apos;s Edition</h3>
      <p className="founder-intro">Be one of the first VYRO users.</p>
      <div className="price-stack" aria-label="Founder pricing">
        <p><span>Regular Price:</span> <s>$49</s></p>
        <strong>Today: $19</strong>
      </div>
      <p className="price-save">Save $30 Today</p>
      <p className="price-note">Founder&apos;s Price Ends After Launch</p>
      <p className="price-trust">Already includes every future update. Pay once. Never subscribe.</p>
      <ul>
        <li><Check size={18} /> Lifetime License</li>
        <li><Check size={18} /> All Future Updates</li>
        <li><Check size={18} /> All Future AI Modules</li>
        <li><Check size={18} /> No Subscription Ever</li>
        <li><Check size={18} /> Priority Access to New Features</li>
      </ul>
      <button onClick={() => startPolarCheckout()}>Get VYRO <ArrowUpRight size={17} /></button>
      <div className="checkout-trust" aria-label="Purchase trust points">
        <span>✔ Instant Download</span>
        <span>✔ Lifetime License</span>
        <span>✔ Secure Checkout</span>
      </div>
      <small className="price-footer">Limited Early Adopter Offer</small>
    </motion.article>
  );
}

function RegularLicenseCard() {
  return (
    <motion.article className="price-card regular-card" whileHover={{ y: -8 }}>
      <span className="popular">After Launch</span>
      <h3>Regular License</h3>
      <p className="founder-intro">This is the regular VYRO price after the founder offer ends.</p>
      <p className="price">$49</p>
      <p className="price-note">after public launch</p>
      <p className="comparison-note">Shown for comparison. Founder pricing is the active offer right now.</p>
      <ul>
        <li><Check size={18} /> Voice Commands</li>
        <li><Check size={18} /> Open Apps</li>
        <li><Check size={18} /> Emotions &amp; Reactions</li>
        <li><Check size={18} /> Floating Desktop Companion</li>
        <li><Check size={18} /> Future Updates</li>
      </ul>
      <button className="disabled-price-button" type="button" disabled>Coming After Launch</button>
    </motion.article>
  );
}

function WhatYouGetToday() {
  const available = ["Voice Commands", "Open Apps", "Floating AI Companion", "Emotions & Reactions", "PC Hit / Slap Reaction"];
  const coming = ["Memory Improvements", "Screen Awareness", "More AI Modules"];
  return (
    <section className="section-shell get-today" aria-labelledby="get-today-title">
      <motion.div className="get-today-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}>
        <div className="get-today-head">
          <span>HONEST EARLY ACCESS</span>
          <h2 id="get-today-title">What You Get Today</h2>
          <p>Clear launch-stage features now, with future AI upgrades marked plainly.</p>
        </div>
        <div className="get-today-lists">
          <div>
            <h3>Included now</h3>
            <ul>{available.map((item) => <li key={item}><Check size={18} /> {item}</li>)}</ul>
          </div>
          <div className="coming-list">
            <h3>Coming later</h3>
            <ul>{coming.map((item) => <li key={item}><span>{item}</span><b>Coming Soon</b></li>)}</ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <main>
      <div className="noise" />
      <SocialProofToast />
      <nav>
        <a className="brand-mark" href="/" aria-label="VYRO home"><img src="/icon-32x32.png" alt="" /><span>VYRO</span></a>
        <div className="nav-links"><a href="/save-50">Save 50%</a><a href="#demo">Demo</a><a href="#faq">FAQ</a><a href="/recover-key">Recover Key</a><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>
      </nav>

      <section className="hero">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><i /> Windows finally has a personality</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>VYRO<span>®</span></motion.h1>
        <VYROMascot />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
          <h2>Talk to your desktop.<br /><em>It talks back.</em></h2>
          <p className="hero-subtitle">Your AI desktop companion for Windows — opens apps, answers questions, remembers, and helps you get things done.</p>
          <div className="hero-actions" aria-label="Hero actions">
            <a href="#pricing" className="main-cta">Get VYRO — $19 Lifetime <ArrowDown size={20} /></a>
            <a href="#demo" className="secondary-cta"><Play size={18} /> Watch 30s Demo</a>
          </div>
          <div className="hero-trust" aria-label="VYRO purchase trust points">
            <span><Check size={15} /> Lifetime License</span>
            <span><Check size={15} /> No Monthly Subscription</span>
            <span><Check size={15} /> Future Updates Included</span>
          </div>
          <small className="hero-proof">Built for Windows 10 &amp; 11 · Loved by early VYRO testers</small>
        </motion.div>
        <motion.div className="hero-chips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
          <span>Listens</span><span>Talks</span><span>Opens apps</span><span>Remembers</span><span>AI Powered</span><span>Gets bored</span>
        </motion.div>
      </section>

      <section className="hero-capabilities" aria-labelledby="hero-capabilities-title">
        <motion.div className="hero-capabilities-inner" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}>
          <div className="hero-capabilities-head">
            <span>QUICK SCAN</span>
            <h2 id="hero-capabilities-title">What can VYRO do?</h2>
          </div>
          <div className="hero-capability-grid">
            {[
              ["Voice Commands", "Control VYRO with natural speech."],
              ["Open Apps", "Launch Chrome, YouTube, Notepad, and more."],
              ["Chat Naturally", "Ask questions and get quick answers."],
              ["Remember Conversations", "Keep useful context for later."],
            ].map(([title, description], index) => (
              <motion.article key={title} whileHover={{ y: -5, rotate: index % 2 ? .6 : -.6 }}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </div>
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

      <section className="section-shell ugc-demo" id="demo">
        <div className="demo-head"><span>02 / REAL MOMENTS</span><h2>See VYRO<br /><em>in action.</em></h2><p>Short demos, real reactions, and quick AI companion moments.</p></div>
        <div className="ugc-video-grid">
          <DemoVideoCard caption="The idea" src="/videos/vyro-the-idea.mp4" poster="/videos/vyro-the-idea-poster.jpg" number="01" />
          <DemoVideoCard caption="VYRO in action" src="/videos/vyro-in-action.mp4" poster="/videos/vyro-in-action-poster.jpg" number="02" />
        </div>
        <div className="demo-follow-links" aria-label="Optional VYRO social links">
          <span>Follow VYRO for more clips:</span>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"><TikTokIcon /> TikTok</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram</a>
        </div>
      </section>

      <WhatYouGetToday />

      <section className="section-shell pricing" id="pricing">
        <div className="section-heading centered"><span>03 / EARLY ACCESS</span><h2>Founder price.<br /><em>VYRO forever.</em></h2></div>
        <div className="price-grid"><FoundersEditionCard /><RegularLicenseCard /></div>
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
