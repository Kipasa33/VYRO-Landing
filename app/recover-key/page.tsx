"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RecoverKeyPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function accessPurchase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const portalUrl = process.env.NEXT_PUBLIC_POLAR_CUSTOMER_PORTAL_URL;

    if (!portalUrl) {
      setMessage("Unable to open the customer portal. Please contact VYRO support.");
      return;
    }

    try {
      const destination = new URL(portalUrl);
      if (destination.protocol !== "https:") throw new Error("Invalid portal URL");
      setMessage("");
      window.location.assign(destination.toString());
    } catch {
      setMessage("Unable to open the customer portal. Please contact VYRO support.");
    }
  }

  return (
    <main className="recover-page">
      <div className="noise" />
      <div className="recover-glow recover-glow-one" />
      <div className="recover-glow recover-glow-two" />

      <header className="recover-nav">
        <Link href="/" className="recover-back"><ArrowLeft size={17} /> Back to Home</Link>
        <span className="recover-logo">VYRO<sup>®</sup></span>
      </header>

      <motion.section className="recover-card" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .45, ease: "easeOut" }}>
        <motion.div className="recover-icon" animate={{ y: [0, -5, 0], rotate: [0, -3, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
          <KeyRound size={29} />
        </motion.div>
        <span className="recover-kicker">CUSTOMER PORTAL</span>
        <h1>Recover your key</h1>
        <p>Enter the same email used during purchase to access your license and downloads.</p>

        <form onSubmit={accessPurchase}>
          <label htmlFor="recover-email">Purchase email</label>
          <div className="recover-input-wrap">
            <Mail size={18} />
            <input id="recover-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </div>
          <button type="submit">Access my purchase <ArrowUpRight size={18} /></button>
        </form>

        {message && <motion.p className="recover-message" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status">{message}</motion.p>}
        <small>VYRO will never ask for your password.</small>
      </motion.section>
    </main>
  );
}
