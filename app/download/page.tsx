import { CheckCircle2, Download, Home, Mic, Play, ShieldCheck } from "lucide-react";
import Link from "next/link";

const downloadUrl =
  "https://github.com/Kipasa33/deskbuddy-ai/releases/latest/download/VYRO-Setup.exe";

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
        <div className="download-orbit" aria-hidden="true">
          <img src="/vyro-mascot-clean.png" alt="" />
        </div>

        <div className="download-kicker">
          <CheckCircle2 size={16} />
          Purchase access
        </div>

        <h1 id="download-title">Your VYRO is ready</h1>
        <p>Download your AI Desktop Companion for Windows</p>

        <a className="download-main-cta" href={downloadUrl}>
          Download for Windows
          <Download size={19} />
        </a>
        <small>Windows 10 / 11</small>

        <div className="download-steps" aria-label="Installation steps">
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
