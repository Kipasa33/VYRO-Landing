"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Camera, Download, Flame, Hash, Smartphone, WalletCards } from "lucide-react";
import Link from "next/link";
import { startPolarCheckout } from "../lib/polar-checkout";

const steps = [
  {
    icon: Camera,
    label: "Create",
    title: "Create a short video about VYRO",
    description: "Show VYRO talking, sleeping, opening apps, or reacting.",
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
    description: "Tag our account and include #VYRO.",
    color: "var(--yellow)",
  },
  {
    icon: Flame,
    label: "2K views",
    title: "Reach 2,000 views",
    description: "Once your video reaches 2,000 views you qualify for a 50% refund.",
    color: "var(--green)",
  },
  {
    icon: WalletCards,
    label: "Claim",
    title: "Contact us",
    description: "Send us the link and proof of views.",
    color: "var(--purple)",
  },
  {
    icon: ArrowUpRight,
    label: "Refund",
    title: "Need help? Contact VYRO Support",
    description: <>Send your proof, order details, and video link to <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>. We’ll refund 50% or 100% based on your current view count.</>,
    color: "var(--pink)",
  },
];

export default function SaveFiftyPage() {
  return (
    <main className="reward-page">
      <div className="noise" />
      <div className="reward-orb reward-orb-one" />
      <div className="reward-orb reward-orb-two" />

      <header className="reward-nav">
        <Link href="/" className="reward-back"><ArrowLeft size={17} /> Back to Home</Link>
        <span className="reward-logo">VYRO<sup>®</sup></span>
        <span className="reward-stamp">CREATOR REWARDS</span>
      </header>

      <section className="reward-hero">
        <motion.span className="reward-kicker" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <i /> The internet pays now
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
          Get <em>50%</em><br />Back
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}>
          Share VYRO. Get rewarded.
        </motion.p>
        <motion.div className="reward-note" initial={{ opacity: 0, rotate: -5 }} animate={{ opacity: 1, rotate: -3 }} transition={{ delay: .3 }}>
          Make a video.<br /><b>Make your money back.</b>
        </motion.div>
      </section>

      <section className="reward-steps">
        <div className="reward-section-head">
          <span>HOW IT WORKS / 06 STEPS</span>
          <h2>Post. Pop off.<br /><em>Get paid.</em></h2>
        </div>

        <div className="reward-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                className="reward-step"
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
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="reward-cta">
        <span>YOUR MOVE</span>
        <h2>Give the algorithm<br /><em>something cute.</em></h2>
        <button type="button" className="main-cta" onClick={() => startPolarCheckout()}>Download VYRO <Download size={19} /></button>
        <small>Windows 10 &amp; 11 · Mild internet fame not guaranteed</small>
      </section>
    </main>
  );
}
