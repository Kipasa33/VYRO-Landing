"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Moon, Play, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PixelDrift from "./components/PixelDrift";
import { startPolarCheckout } from "./lib/polar-checkout";

const voiceReactions = ["/audio/robot_click_01.mp3", "/audio/robot_click_02.mp3"];

const features = [
  { icon: "VOICE", title: "Voice commands", text: "Speak naturally to control supported desktop actions.", color: "var(--pink)" },
  { icon: "TALK", title: "Talks back", text: "Ask questions and get helpful responses on your desktop.", color: "var(--blue)" },
  { icon: "APPS", title: "Open apps", text: "Launch supported apps without breaking your flow.", color: "var(--yellow)" },
  { icon: "MOOD", title: "Shows personality", text: "A companion that reacts, rests, and feels present.", color: "var(--green)" },
];

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
    <motion.article className="price-card accent founder-card" whileHover={{ y: -6 }}>
      <span className="popular">Founder offer</span>
      <span className="subscription-badge">Core App Lifetime</span>
      <h3>Founder Edition</h3>
      <p className="founder-intro">Early founder price for the VYRO core desktop app.</p>
      <div className="price-stack" aria-label="Founder pricing">
        <strong>$19</strong>
        <p>One-time license for the core desktop app.</p>
      </div>
      <p className="price-save">Early access pricing</p>
      <p className="price-note">Founder pricing ends after launch.</p>
      <p className="price-trust">No subscription required for the core desktop app.</p>
      <ul>
        <li><Check size={18} /> Lifetime access to the VYRO core desktop app</li>
        <li><Check size={18} /> Voice commands</li>
        <li><Check size={18} /> Open apps</li>
        <li><Check size={18} /> Floating desktop companion</li>
        <li><Check size={18} /> Emotions &amp; reactions</li>
        <li><Check size={18} /> Founder core updates included</li>
        <li><Check size={18} /> Early access to new features</li>
        <li><Check size={18} /> Priority feedback</li>
      </ul>
      <p className="advanced-ai-note">Advanced cloud AI modules may require a Pro plan later.</p>
      <button onClick={() => startPolarCheckout()}>Get Founder Edition <ArrowUpRight size={17} /></button>
      <div className="checkout-trust" aria-label="Purchase trust points">
        <span>&#10003; Instant Download</span>
        <span>&#10003; Lifetime core app license</span>
        <span>&#10003; Secure Checkout</span>
      </div>
      <small className="price-footer">Built for early Windows users</small>
    </motion.article>
  );
}

function BuiltForTrust() {
  const trustCards = [
    {
      title: "What VYRO can control",
      items: ["Open apps you request", "Respond to voice commands", "Help with visible desktop actions"],
    },
    {
      title: "What VYRO cannot do",
      items: ["No hidden purchases", "No deleting files by itself", "No invisible background control"],
    },
    {
      title: "Permission clarity",
      items: ["Microphone is used for voice commands", "Features can be disabled in settings", "You remain in control"],
    },
  ];

  return (
    <section className="trust-section" aria-labelledby="trust-title">
      <motion.div className="trust-inner" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .28 }}>
        <div className="trust-head">
          <span>PERMISSIONS, CLEARLY</span>
          <h2 id="trust-title">Built for trust</h2>
          <p>Clear controls, visible actions, and no surprises.</p>
        </div>
        <div className="trust-grid">
          {trustCards.map((card, index) => (
            <motion.article key={card.title} whileHover={{ y: -4 }}>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
        <a className="trust-policy-link" href="/privacy">Read the full Privacy Policy <ArrowUpRight size={15} /></a>
      </motion.div>
    </section>
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

export default function Home() {
  const [dark, setDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <div className="noise" />
      <nav>
        <a className="brand-mark" href="/" aria-label="VYRO home"><img src="/icon-32x32.png" alt="" /><span>VYRO</span></a>
        <div className="nav-links"><a href="/save-50">Save 50%</a><a href="#demo">Demo</a><a href="/about">About</a><a href="#faq">FAQ</a><a href="/recover-key">Recover Key</a><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>
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
        <VYROMascot />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
          <h1>Meet VYRO.<br /><em>Your AI desktop companion.</em></h1>
          <p className="hero-subtitle">VYRO lives on your Windows desktop, listens to your voice, reacts with emotion, and helps you get things done faster.</p>
          <div className="hero-actions" aria-label="Hero actions">
            <a href="#pricing" className="main-cta">Get VYRO <ArrowDown size={20} /></a>
            <a href="#demo" className="secondary-cta"><Play size={18} /> Watch demo</a>
          </div>
          <div className="hero-trust" aria-label="VYRO purchase trust points">
            <span><Check size={15} /> Lifetime core app license</span>
            <span><Check size={15} /> Founder updates included</span>
            <span><Check size={15} /> Designed for Windows</span>
          </div>
          <small className="hero-proof">Founder Edition available for early users.</small>
        </motion.div>
        <motion.div className="hero-chips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
          <span>Listens</span><span>Talks back</span><span>Opens apps</span><span>Helps you focus</span><span>Shows emotion</span>
        </motion.div>
      </section>

      <section className="hero-capabilities" aria-labelledby="hero-capabilities-title">
        <motion.div className="hero-capabilities-inner" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}>
          <div className="hero-capabilities-head">
            <span>THE CORE EXPERIENCE</span>
            <h2 id="hero-capabilities-title">What VYRO does</h2>
          </div>
          <div className="hero-capability-grid">
            {[
              ["Voice commands", "Control supported actions with natural speech."],
              ["Open apps", "Launch the tools you use without extra clicking."],
              ["Talk naturally", "Ask a question and get a useful response."],
              ["Stay focused", "Start a calmer, more intentional desktop session."],
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

      <BuiltForTrust />

      <section className="section-shell features" id="features">
        <div className="section-heading"><span>01 / CAPABILITIES</span><h2>Made for the moments<br /><em>between your work.</em></h2><p>Voice control, helpful desktop actions, and a little more personality.</p></div>
        <div className="feature-grid">{features.map((feature, i) => <motion.article key={feature.title} style={{ "--card-color": feature.color } as React.CSSProperties} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }}><span className="feature-icon">{feature.icon}</span><small>0{i + 1}</small><h3>{feature.title}</h3><p>{feature.text}</p></motion.article>)}</div>
      </section>

      <section className="section-shell ugc-demo" id="demo">
        <div className="demo-head"><span>02 / PRODUCT DEMO</span><h2>See VYRO<br /><em>in action.</em></h2><p>A quick look at how VYRO fits into your Windows desktop.</p></div>
        <motion.div className="final-demo-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .45, ease: "easeOut" }}>
          <video className="final-demo-video" src="/videos/vyro-demo.mp4" controls playsInline preload="metadata" />
        </motion.div>
        <div className="demo-conversion">
          <a href="#pricing" className="main-cta">Get VYRO <ArrowDown size={20} /></a>
          <div className="demo-trust" aria-label="VYRO purchase trust points">
            <span><Check size={15} /> Lifetime License</span>
            <span><Check size={15} /> Core app, one-time license</span>
            <span><Check size={15} /> Core updates included</span>
          </div>
        </div>
      </section>

      <WhatYouGetToday />

      <section className="section-shell pricing" id="pricing">
        <div className="section-heading centered"><span>03 / FOUNDER EDITION</span><h2>A clear, simple<br /><em>way to get started.</em></h2><p>One purchase for the VYRO core desktop app. Future cloud features are always clearly labeled.</p></div>
        <div className="price-grid"><FoundersEditionCard /></div>
        <p className="purchased-link">Already purchased? <a href="/recover-key">Recover your license key</a></p>
        <p className="privacy-policy-link"><a href="/security">Read about VYRO security</a> | <a href="/privacy">Read our Privacy Policy</a></p>
        <motion.aside className="macos-coming-soon" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .65 }} whileHover={{ y: -5, rotate: -.35 }}>
          <div className="macos-icon" aria-hidden="true">{`\u{1F34E}`}</div>
          <div className="macos-copy">
            <span>COMING SOON</span>
            <h3>macOS Coming Soon</h3>
            <p>Currently building and optimizing VYRO for macOS.</p>
          </div>
          <small>Windows available now</small>
        </motion.aside>
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
          <button type="button" className="site-footer-cta" onClick={() => startPolarCheckout()}>Get VYRO <ArrowUpRight size={16} /></button>
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
