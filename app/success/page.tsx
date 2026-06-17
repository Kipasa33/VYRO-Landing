"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, KeyRound, MessageCircle } from "lucide-react";
import Link from "next/link";
import { startPolarCheckout } from "../lib/polar-checkout";

export default function SuccessPage() {
  return (
    <main className="success-page">
      <div className="noise" />
      <div className="success-glow success-glow-one" />
      <div className="success-glow success-glow-two" />
      <Link href="/" className="success-back"><ArrowLeft size={17} /> Back to Home</Link>

      <motion.section className="success-card" initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .5, ease: "easeOut" }}>
        <motion.div className="success-check" initial={{ scale: 0, rotate: -18 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: .1 }}>✓</motion.div>
        <span>PURCHASE COMPLETE</span>
        <h1>Purchase successful</h1>
        <p>Welcome to VYRO</p>
        <div className="success-actions">
          <button type="button" onClick={() => startPolarCheckout()}><Download size={18} /> Download VYRO</button>
          <a href="#" onClick={(event) => event.preventDefault()}><MessageCircle size={18} /> Join Discord</a>
          <Link href="/recover-key"><KeyRound size={18} /> Recover License Key</Link>
        </div>
        <small>Secure payments powered by Polar</small>
      </motion.section>
    </main>
  );
}
