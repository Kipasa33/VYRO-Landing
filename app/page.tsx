"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Gift, Moon, Play, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelDrift from "./components/PixelDrift";
import VyroFeatureSpotlight from "./components/VyroFeatureSpotlight";
import { trackEvent, trackEventOnce } from "./lib/analytics";
import { startPolarCheckout } from "./lib/polar-checkout";

const voiceReactions = ["/audio/robot_click_01.mp3", "/audio/robot_click_02.mp3"];
const heroDemoScenes = ["spotify_voice_command", "slap_mode", "character_switching"] as const;

const pricingGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const pricingCardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const faqs = [
  { question: "Is VYRO for Windows?", answer: "Yes. VYRO is designed for Windows 10 and Windows 11." },
  { question: "Does it use voice?", answer: "Yes. When voice features are enabled, you can speak naturally to VYRO and it can respond." },
  { question: "Can it open apps?", answer: "VYRO can open supported apps and help with simple desktop actions you request." },
  { question: "Do I need an internet connection?", answer: "Some features work offline. Advanced AI and cloud features may require an internet connection." },
  { question: "Does VYRO have emotions?", answer: "VYRO can react with expressions such as happy, bored, sleepy, excited, and surprised." },
  { question: "Does VYRO sleep?", answer: "Yes. VYRO can enter a quiet or resting state until you are ready to use it again." },
  { question: "What makes VYRO different?", answer: "Most assistants live inside a chat window. VYRO lives on your desktop and is designed to feel like a visible, helpful companion." },
];

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const roadmapItems = [
  { badge: "current", icon: "\u{2705}", title: "Desktop Companion", description: "Voice commands, app launching, emotions, sleep mode, focus mode, quiet mode, and funny reactions.", tone: "current" },
  { badge: "coming soon", icon: "\u{1F399}\u{FE0F}", title: "Custom Voice Packs", description: "Add new VYRO voices, robot sounds, funny reactions, and custom personality packs.", tone: "soon" },
  { badge: "coming soon", icon: "\u{1F9E0}", title: "Smart Memory", description: "VYRO will remember your name, favorite mode, habits, and small personal preferences.", tone: "soon" },
  { badge: "future", icon: "\u{1F441}\u{FE0F}", title: "Screen Awareness", description: "Explore optional, user-controlled desktop context for more helpful assistance.", tone: "future" },
  { badge: "future", icon: "\u{1F916}", title: "Agent Mode", description: "Let VYRO help with tasks, research, reminders, and workflow automation.", tone: "future" },
];

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

function FoundersEditionCard() {
  return (
    <motion.article
      className="pricing-card pricing-card-founder"
      variants={pricingCardVariants}
      whileHover={{ y: -8, scale: 1.008 }}
    >
      <div className="pricing-card-topline">
        <span className="pricing-availability">Available now</span>
        <span className="pricing-recommended">Founder offer</span>
      </div>
      <h3>VYRO Core</h3>
      <div className="pricing-price" aria-label="VYRO Core costs 19 dollars">
        <strong>$19</strong>
        <span>one-time</span>
      </div>
      <p className="pricing-helper">One-time license for the core desktop app.</p>
      <p className="pricing-description">For early users who want lifetime access to the VYRO core desktop companion.</p>
      <ul className="pricing-features">
        <li><Check size={18} /> Lifetime access to the VYRO core desktop app</li>
        <li><Check size={18} /> Voice commands</li>
        <li><Check size={18} /> Open apps</li>
        <li><Check size={18} /> Floating desktop companion</li>
        <li><Check size={18} /> Emotions &amp; reactions</li>
        <li><Check size={18} /> Founder core updates included</li>
        <li><Check size={18} /> Early access to new features</li>
        <li><Check size={18} /> Priority feedback</li>
      </ul>
      <p className="pricing-note">Advanced cloud AI modules may require a Pro plan later.</p>
      <button className="pricing-card-cta" onClick={() => startPolarCheckout("landing_page", "pricing")}>Get VYRO <ArrowUpRight size={17} /></button>
    </motion.article>
  );
}

function ProCard() {
  const features = [
    "Custom VYRO Automations",
    "Voice, NFC & Scheduled Triggers",
    "VYRO Memory",
    "More Characters, Voices & Animations",
    "Browser & File Intelligence",
    "Background AI Agents",
    "Higher AI Usage + Early Pro Access",
  ];

  return (
    <motion.article
      className="pricing-card pricing-card-pro"
      variants={pricingCardVariants}
      whileHover={{ y: -8, scale: 1.008 }}
    >
      <div className="pricing-card-topline">
        <span className="pricing-availability">Coming later</span>
      </div>
      <h3>Pro</h3>
      <div className="pricing-price" aria-label="Pro is planned at 29 dollars and 99 cents">
        <strong>$29.99</strong>
      </div>
      <p className="pricing-helper">Turn VYRO into a smarter AI companion that remembers, automates, and acts for you.</p>
      <p className="pricing-description">Built for deeper personalization and powerful AI automation.</p>
      <ul className="pricing-features">
        {features.map((feature) => <li key={feature}><Check size={18} /> {feature}</li>)}
      </ul>
      <button className="pricing-card-cta pricing-card-cta-disabled" type="button" disabled>Coming later</button>
    </motion.article>
  );
}

function WhatYouGetToday() {
  const available = ["Voice commands", "Open supported apps", "Floating desktop companion", "Emotion reactions"];
  const coming = ["Memory improvements", "Screen awareness", "Additional AI modules"];
  return (
    <section className="section-shell get-today" aria-labelledby="get-today-title">
      <motion.div className="get-today-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}>
        <div className="get-today-head">
          <span>PRODUCT CLARITY</span>
          <h2 id="get-today-title">What You Get Today</h2>
          <p>Core desktop features available today, with future capabilities clearly marked.</p>
        </div>
        <div className="get-today-lists">
          <div>
            <h3>Available now</h3>
            <ul>{available.map((item) => <li key={item}><Check size={18} /> {item}</li>)}</ul>
          </div>
          <div className="coming-list">
            <h3>In development</h3>
            <ul>{coming.map((item) => <li key={item}><span>{item}</span><b>Coming Soon</b></li>)}</ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TrustRail() {
  const items = [
    ["WINDOWS FIRST", "Built for Windows 10 and 11."],
    ["PRIVATE BY DESIGN", "Your desktop companion stays under your control."],
    ["ONE-TIME LICENSE", "Get the core app with lifetime access."],
  ];

  return (
    <section className="trust-rail" aria-label="VYRO trust and product details">
      {items.map(([label, copy]) => (
        <div className="trust-rail-item" key={label}>
          <span><Check size={15} aria-hidden="true" /> {label}</span>
          <p>{copy}</p>
        </div>
      ))}
      <a className="trust-rail-link" href="/security">Explore security <ArrowUpRight size={15} aria-hidden="true" /></a>
    </section>
  );
}

function HeroProductDemo() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const rotationTimer = window.setInterval(() => {
      setActiveScene((currentScene) => (currentScene + 1) % heroDemoScenes.length);
    }, 6000);

    return () => window.clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    const scene = heroDemoScenes[activeScene];
    trackEventOnce(`home:hero_demo_scene_view:${scene}`, "hero_demo_scene_view", {
      scene,
      cta_location: "hero",
    });
  }, [activeScene]);

  return (
    <motion.div
      className="hero-product-demo"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .35, duration: .55 }}
      aria-label="VYRO voice command, Slap Mode, and character switching demonstration"
    >
      <div className="hero-demo-glow" aria-hidden="true" />
      <div className="hero-demo-frame">
        <div className="hero-demo-toolbar" aria-hidden="true"><span /><span /><span /><b>LIVE DESKTOP ACTION</b></div>
        <div className={`hero-demo-stage hero-demo-stage-${activeScene}`}>
          <VYROMascot />
          <div className="hero-demo-scenes">
            {activeScene === 0 && <div className="hero-demo-scene hero-demo-voice">
              <div className="hero-demo-step hero-demo-command">
                <small>Voice command</small>
                <strong>&ldquo;VYRO, open Spotify.&rdquo;</strong>
              </div>
              <span className="hero-demo-arrow" aria-hidden="true">&#8595;</span>
              <div className="hero-demo-step hero-demo-response">
                <small>VYRO responds</small>
                <strong>&ldquo;Opening Spotify.&rdquo;</strong>
              </div>
              <span className="hero-demo-arrow" aria-hidden="true">&#8595;</span>
              <div className="hero-demo-app">
                <span className="spotify-mark" aria-hidden="true"><i /><i /><i /></span>
                <span><small>Application opens</small><strong>Spotify is ready</strong></span>
                <b aria-hidden="true">OPEN</b>
              </div>
            </div>}

            {activeScene === 1 && <div className="hero-demo-scene hero-demo-slap">
              <div className="hero-slap-copy">
                <span>SLAP MODE</span>
                <strong>Slap annoying windows out of the way.</strong>
              </div>
              <div className="hero-slap-action" aria-label="VYRO slaps a Windows-style application window">
                <div className="hero-slap-swoosh" aria-hidden="true"><i /><i /><i /></div>
                <div className="hero-slap-impact" aria-hidden="true"><i /><i /><i /><b>!</b></div>
                <div className="hero-slap-window">
                  <div className="hero-slap-window-bar"><span /><span /><span /><b>Untitled app</b></div>
                  <div className="hero-slap-window-body"><i /><i /><i /></div>
                </div>
              </div>
              <div className="hero-slap-status"><Check size={14} aria-hidden="true" /> Slap Mode activated.</div>
            </div>}

            {activeScene === 2 && <div className="hero-demo-scene hero-demo-character">
              <div className="hero-character-copy">
                <span>CHOOSE YOUR COMPANION</span>
                <strong>Choose your companion</strong>
                <p>Switch characters anytime to match your vibe.</p>
              </div>
              <div className="hero-character-preview" aria-label="VYRO character preview switching from VYRO Robot to Cute Companion">
                <div className="hero-character-image hero-character-image-robot">
                  <Image src="/characters/vyro-robot.png" alt="VYRO Robot character" fill sizes="112px" />
                </div>
                <div className="hero-character-image hero-character-image-cute">
                  <Image src="/characters/vyro-cute.png" alt="Cute Companion character" fill sizes="112px" />
                </div>
                <i aria-hidden="true" />
              </div>
              <div className="hero-character-options" aria-label="Available VYRO companions">
                <div className="hero-character-option hero-character-option-robot">
                  <span><Image src="/characters/vyro-robot.png" alt="" fill sizes="40px" /></span>
                  <b>VYRO Robot</b>
                  <Check size={13} aria-hidden="true" />
                </div>
                <div className="hero-character-option hero-character-option-cute">
                  <span><Image src="/characters/vyro-cute.png" alt="" fill sizes="40px" /></span>
                  <b>Cute Companion</b>
                  <Check size={13} aria-hidden="true" />
                </div>
              </div>
              <div className="hero-character-status"><Check size={14} aria-hidden="true" /> Companion switched.</div>
            </div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [showCreatorRewardsIntro, setShowCreatorRewardsIntro] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    const sessionKey = "vyro:creator-rewards-nav-intro";
    try {
      if (window.sessionStorage.getItem(sessionKey)) return;
      window.sessionStorage.setItem(sessionKey, "1");
      setShowCreatorRewardsIntro(true);
      const timer = window.setTimeout(() => setShowCreatorRewardsIntro(false), 4000);
      return () => window.clearTimeout(timer);
    } catch {
      // Keep the link usable if storage is unavailable; no persistent tracking is used.
    }
  }, []);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <div className="noise" />
      <nav>
        <a className="brand-mark" href="/" aria-label="VYRO home"><img src="/icon-32x32.png" alt="" /><span>VYRO</span></a>
        <div className="nav-links"><a href="/save-50" className={`creator-rewards-nav ${showCreatorRewardsIntro ? "is-intro" : ""}`} onClick={() => trackEvent("creator_rewards_nav_click", { location: "main_navigation" })}><Gift size={15} aria-hidden="true" /><span>Creator Rewards</span><b>NEW</b><i className="creator-rewards-tooltip" role="tooltip">Post VYRO. Earn it back.<br />2K views → 50% back<br />10K → 100% back<br />25K → VYRO Pro free</i></a><a href="#demo">Demo</a><a href="/about">About</a><a href="#faq">FAQ</a><a href="/recover-key">Recover Key</a><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>
      </nav>

      <section className="hero">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><i /> Windows finally has a personality</motion.div>
        <div className="hero-pixel-drift" aria-hidden="true">
          <PixelDrift
            text="VYRO"
            colors={["#7DD3FC", "#22D3EE", "#8B5CF6", "#FFFFFF", "#38BDF8"]}
            particleSize={10}
            particleCount={44}
            fontSize={360}
            autoFit={true}
            mouseEnabled={true}
            mouseRadius={132}
            mouseForce={13}
            mode="loop"
            replay={false}
            position="middle"
            trackPointerOnWindow={true}
            opacity={.48}
            transition={{ type: "tween", duration: 1.1, ease: "easeOut" }}
          />
        </div>
        <div className="hero-main">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            <h1>An AI companion that lives on your <em>Windows desktop</em></h1>
            <p className="hero-subtitle">VYRO talks back, opens apps with voice commands, helps you focus, and reacts with personality.</p>
            <div className="hero-actions" aria-label="Hero actions">
              <a href="#pricing" className="main-cta" data-analytics-event="primary_cta_click" data-cta-location="hero">Get VYRO for Windows <ArrowDown size={20} /></a>
              <a href="#demo" className="secondary-cta" data-analytics-event="demo_play" data-cta-location="hero"><Play size={18} /> Watch Demo</a>
            </div>
          </motion.div>

          <HeroProductDemo />
        </div>
      </section>

      <section className="hero-feature-row" aria-label="VYRO core features">
        {["Voice commands", "Opens apps", "Focus Mode", "Emotions & reactions"].map((feature) => (
          <span key={feature}><Check size={16} aria-hidden="true" />{feature}</span>
        ))}
      </section>

      <VyroFeatureSpotlight />

      <section className="section-shell ugc-demo" id="demo">
        <div className="demo-head"><span>02 / PRODUCT DEMO</span><h2>Watch VYRO<br /><em>at work.</em></h2><p>A quick look at how VYRO fits into your Windows desktop.</p></div>
        <motion.div className="final-demo-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .45, ease: "easeOut" }}>
          <video className="final-demo-video" src="/videos/vyro-demo.mp4" controls playsInline preload="metadata" data-analytics-video="demo" />
        </motion.div>
        <div className="demo-conversion">
          <a href="#pricing" className="main-cta" data-analytics-event="primary_cta_click" data-cta-location="demo">Get VYRO <ArrowDown size={20} /></a>
          <div className="demo-trust" aria-label="VYRO purchase trust points">
            <span><Check size={15} /> Lifetime License</span>
            <span><Check size={15} /> Core app, one-time license</span>
            <span><Check size={15} /> Core updates included</span>
          </div>
        </div>
      </section>

      <WhatYouGetToday />

      <TrustRail />

      <section className="section-shell pricing" id="pricing">
        <div className="pricing-atmosphere" aria-hidden="true">
          <i className="pricing-orb pricing-orb-founder" />
          <i className="pricing-orb pricing-orb-pro" />
          <i className="pricing-particle pricing-particle-one" />
          <i className="pricing-particle pricing-particle-two" />
          <i className="pricing-particle pricing-particle-three" />
        </div>
        <motion.div
          className="pricing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span>Pricing</span>
          <h2>Choose your <em>VYRO</em> plan.</h2>
          <p>Start with the core desktop app today. Advanced cloud AI modules may require Pro later.</p>
        </motion.div>
        <motion.div
          className="pricing-grid"
          variants={pricingGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          <FoundersEditionCard />
          <ProCard />
        </motion.div>
        <p className="pricing-comparison-note">Founder Edition covers the core desktop app. Pro may be introduced later for advanced cloud AI usage.</p>
        <p className="purchased-link">Already purchased? <a href="/recover-key">Recover your license key</a></p>
      </section>

      <section className="section-shell faq" id="faq">
        <div className="section-heading"><span>04 / QUESTIONS</span><h2>Common<br /><em>questions.</em></h2><p>Everything you need to know before inviting VYRO onto your desktop.</p></div>
        <div className="faq-list">{faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          const panelId = `faq-answer-${i + 1}`;
          return (
            <article key={faq.question}>
              <button onClick={() => setOpenFaq(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={panelId}>
                <span>0{i + 1}</span>{faq.question}<ChevronDown className={isOpen ? "up" : ""} />
              </button>
              <motion.p id={panelId} initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}>
                {faq.answer}
              </motion.p>
            </article>
          );
        })}</div>
      </section>

      <section className="section-shell roadmap" id="roadmap">
        <motion.div className="roadmap-head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }}>
          <span>05 / WHAT&rsquo;S NEXT</span>
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
      <footer className="site-footer" id="footer">
        <div className="site-footer-brand">
          <a className="site-footer-logo" href="/">VYRO</a>
          <p>AI desktop companion for Windows.</p>
          <button type="button" className="site-footer-cta" onClick={() => startPolarCheckout("landing_page", "footer")}>Get VYRO <ArrowUpRight size={16} /></button>
        </div>
        <div className="site-footer-column">
          <h3>Company</h3>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
          <a href="/features">Features</a>
          <a href="/blog">Blog</a>
          <a href="#faq">FAQ</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/recover-key">Recover Key</a>
        </div>
        <div className="site-footer-column">
          <h3>Support</h3>
          <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>
          <a href="/recover-key">Recover your license key</a>
          <a href="/security">Read about VYRO security</a>
          <a href="/privacy">Read our Privacy Policy</a>
          <span>Secure payments powered by Polar</span>
        </div>
      </footer>
    </main>
  );
}
