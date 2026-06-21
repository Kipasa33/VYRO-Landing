import { CheckCircle2, Download, Home, KeyRound, LockKeyhole, Mic, Play, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { POLAR_CHECKOUT_URL } from "../lib/polar-checkout";

const steps = [
  { icon: Download, title: "Download VYRO" },
  { icon: Play, title: "Run the installer" },
  { icon: Mic, title: "Allow microphone permission" },
  { icon: ShieldCheck, title: 'Say "VYRO open YouTube"' },
];

export default function DownloadPage() {
  return (
    <main className="download-page">
      <div className="download-glow download-glow-one" />
      <div className="download-glow download-glow-two" />

      <nav className="download-nav" aria-label="Download page navigation">
        <Link href="/" className="download-back">
          <Home size={16} />
          Back to Home
        </Link>
        <span className="download-logo">VYRO<sup>®</sup></span>
      </nav>

      <section className="download-card" aria-labelledby="download-title">
        <div className="download-orbit locked" aria-hidden="true">
          <img src="/vyro-mascot-clean.png" alt="" />
        </div>

        <div className="download-kicker">
          <LockKeyhole size={16} />
          License required
        </div>

        <h1 id="download-title">Download locked</h1>
        <p>Enter your license key to access your download.</p>

        <form className="download-license-form">
          <label htmlFor="license-key">License key</label>
          <input id="license-key" name="license-key" type="text" placeholder="VYRO-XXXX-XXXX" disabled />
          <small>License verification is handled through your purchase email for now.</small>
        </form>

        <div className="download-access-actions">
          <Link href="/recover-key">
            <KeyRound size={18} />
            Recover your license key
          </Link>
          <a href={POLAR_CHECKOUT_URL}>
            <CheckCircle2 size={18} />
            Buy VYRO
          </a>
        </div>

        <div className="download-steps muted" aria-label="Installation steps">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="download-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i aria-hidden="true">
                  <Icon size={18} />
                </i>
                <b>{step.title}</b>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
