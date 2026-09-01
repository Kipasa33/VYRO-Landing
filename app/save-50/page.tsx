"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Camera, CheckCircle2, Download, Flame, Hash, Mail, Smartphone, Trophy, WalletCards } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { startPolarCheckout } from "../lib/polar-checkout";

const steps = [
  {
    icon: Camera,
    label: "Create",
    title: "Create a VYRO video",
    description: "Show VYRO talking, reacting, opening apps, using voice commands, Focus Mode, characters, routines, or other real features.",
    color: "var(--pink)",
  },
  {
    icon: Smartphone,
    label: "Post",
    title: "Post it",
    description: "Upload to TikTok, Instagram Reels, YouTube Shorts, X, or Facebook.",
    color: "var(--blue)",
  },
  {
    icon: Hash,
    label: "Tag",
    title: "Tag VYRO",
    description: "Tag the official VYRO account and include #VYRO so we can find your post.",
    color: "var(--yellow)",
  },
  {
    icon: Flame,
    label: "2K views",
    title: "Reach 2,000 views",
    description: "Once your video reaches 2,000 views, you qualify for a 50% refund.",
    color: "var(--green)",
  },
  {
    icon: WalletCards,
    label: "10K views",
    title: "Get 100% Back",
    description: "Reach 10,000 views and get your full VYRO purchase refunded.",
    color: "var(--purple)",
    featured: true,
  },
  {
    icon: Trophy,
    label: "25K views",
    title: "Unlock VYRO Pro Free",
    description: "If your VYRO video reaches 25,000 views, you unlock VYRO Pro / Full License at no cost.",
    value: "$29.99 value",
    color: "var(--yellow)",
    grand: true,
  },
  {
    icon: Mail,
    label: "Claim",
    title: "Claim Your Reward",
    description: <>Send us your public post link, proof of views, and order details at <a href="mailto:support@vyrodesk.com" onClick={() => trackEvent("creator_rewards_claim_click", { location: "timeline_email" })}>support@vyrodesk.com</a>.</>,
    color: "var(--pink)",
  },
];

export default function SaveFiftyPage() {
  useEffect(() => { trackEvent("creator_rewards_view"); }, []);

  return (
    <main className="reward-page">
      <div className="noise" />
      <div className="reward-orb reward-orb-one" />
      <div className="reward-orb reward-orb-two" />

      <header className="reward-nav">
        <Link href="/" className="reward-back" onClick={() => trackEvent("creator_rewards_home_click")}><ArrowLeft size={17} /> Back to Home</Link>
        <span className="reward-logo">VYRO<sup>®</sup></span>
        <span className="reward-stamp">CREATOR REWARDS</span>
      </header>

      <section className="reward-hero">
        <motion.span className="reward-kicker" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <i /> The internet pays now
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
          Get Your<br /><em>Money Back.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}>
          Share VYRO. Get rewarded.
        </motion.p>
        <motion.div className="reward-note" initial={{ opacity: 0, rotate: -5 }} animate={{ opacity: 1, rotate: -3 }} transition={{ delay: .3 }}>
          Post a short video about VYRO and earn up to 100% of your purchase back — <b>or unlock VYRO Pro for free.</b>
        </motion.div>
        <a className="reward-scroll" href="#how-it-works">See How It Works <ArrowUpRight size={16} /></a>
      </section>

      <section className="reward-steps" id="how-it-works">
        <div className="reward-section-head">
          <span>HOW IT WORKS / 07 STEPS</span>
          <h2>Post. Pop off.<br /><em>Get rewarded.</em></h2>
        </div>

        <div className="reward-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                className={`reward-step ${step.featured ? "is-featured" : ""} ${step.grand ? "is-grand" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .35 }}
                transition={{ delay: index * .06 }}
              >
                <div className="reward-marker" style={{ "--step-color": step.color } as React.CSSProperties}>
                  <Icon size={25} strokeWidth={2.4} />
                </div>
                <div className="reward-card" style={{ "--step-color": step.color } as React.CSSProperties}>
                  <div className="reward-card-top"><span>STEP 0{index + 1}</span><b>{step.label}</b></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.value && <strong className="reward-value">{step.value}</strong>}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="reward-ladder" aria-labelledby="reward-ladder-title">
        <div className="reward-ladder-inner">
          <div className="reward-ladder-copy"><span>CREATOR REWARDS</span><h2 id="reward-ladder-title">A little reach<br /><em>goes a long way.</em></h2></div>
          <div className="reward-grid">
            {[{ views: "2,000 views", reward: "50% refund", color: "var(--green)" }, { views: "10,000 views", reward: "100% refund", color: "var(--purple)" }, { views: "25,000 views", reward: "VYRO Pro free", value: "$29.99 value", color: "var(--yellow)", featured: true }].map((reward) => <article className={`reward-summary ${reward.featured ? "is-featured" : ""}`} key={reward.views} style={{ "--step-color": reward.color } as React.CSSProperties}><span>{reward.views}</span><h3>{reward.reward}</h3>{reward.value && <small>{reward.value}</small>}</article>)}
          </div>
        </div>
      </section>

      <section className="reward-rules"><div className="reward-rules-inner"><span>THE NICE PRINT</span><h2>How rewards <em>work.</em></h2><ul>{["The post must be public and genuinely feature or discuss VYRO.", "Tag VYRO and include #VYRO so we can find it.", "Views must be authentic and organic — bought, botted, or manipulated views do not qualify.", "One reward claim per qualifying purchase/post unless otherwise approved.", "We may request analytics or other proof, and verify views when your claim is reviewed."].map((rule) => <li key={rule}><CheckCircle2 size={17} aria-hidden="true" />{rule}</li>)}</ul></div></section>

      <section className="reward-cta">
        <span>YOUR MOVE</span>
        <h2>Make something<br /><em>worth sharing.</em></h2>
        <a className="main-cta" href="mailto:support@vyrodesk.com" onClick={() => trackEvent("creator_rewards_claim_click", { location: "final_cta" })}>Claim Your Reward <Mail size={19} /></a>
        <button type="button" className="reward-download" onClick={() => startPolarCheckout("landing_page", "creator_rewards")}>Get VYRO first <Download size={16} /></button>
        <small>Already posted? Send your link, view proof, and order details.</small>
      </section>
    </main>
  );
}
