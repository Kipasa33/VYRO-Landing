import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VYRO Features - AI Desktop Companion for Windows",
  description: "Explore VYRO features including voice commands, app launching, focus mode, AI emotions, and desktop assistance for Windows.",
  alternates: {
    canonical: "https://vyrodesk.com/features",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VYRO Features - AI Desktop Companion for Windows",
    description: "Explore VYRO features including voice commands, app launching, focus mode, AI emotions, and desktop assistance for Windows.",
    url: "https://vyrodesk.com/features",
  },
};

const featureCards = [
  {
    label: "Voice",
    title: "Voice commands",
    body: "Speak to VYRO and trigger supported actions with natural voice commands, so common desktop tasks feel faster and easier.",
  },
  {
    label: "Apps",
    title: "Open apps faster",
    body: "VYRO can help open apps like Chrome, YouTube, Notepad, and other supported tools without digging through menus.",
  },
  {
    label: "Focus",
    title: "Focus mode",
    body: "Start a focused work session with VYRO and reduce distractions when it is time to get things done.",
  },
  {
    label: "Emotion",
    title: "AI emotions and reactions",
    body: "VYRO can visually react with emotions like happy, sleepy, excited, or surprised, making your desktop feel more alive.",
  },
  {
    label: "Assist",
    title: "Desktop assistance",
    body: "VYRO is designed to help with simple desktop tasks and make interacting with your PC feel more natural.",
  },
  {
    label: "Windows",
    title: "Windows companion",
    body: "VYRO is built for Windows 10 and Windows 11 as a lightweight AI desktop companion for your PC.",
  },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "VYRO Features - AI Desktop Companion for Windows",
  url: "https://vyrodesk.com/features",
  description: "Explore VYRO features including voice commands, app launching, focus mode, AI emotions, and desktop assistance for Windows.",
  isPartOf: {
    "@type": "WebSite",
    name: "VYRO",
    url: "https://vyrodesk.com/",
  },
};

export default function FeaturesPage() {
  return (
    <main className="privacy-page security-page features-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#demo">Demo</Link>
          <Link href="/features">Features</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="security-hero features-hero" aria-labelledby="features-title">
        <p className="policy-kicker">AI desktop companion</p>
        <h1 id="features-title">VYRO Features</h1>
        <p>Everything VYRO can do as your AI desktop companion for Windows.</p>
        <p className="features-intro">VYRO helps you interact with your PC using voice commands, reactions, focus tools, and helpful desktop actions.</p>
      </section>

      <section className="security-shell" aria-label="VYRO product features">
        <div className="features-card-grid">
          {featureCards.map((feature) => (
            <article className="security-card feature-detail-card" key={feature.title}>
              <span>{feature.label}</span>
              <h2>{feature.title}</h2>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>

        <section className="features-difference" aria-labelledby="different-title">
          <p className="policy-kicker">Why it feels different</p>
          <h2 id="different-title">Not just another chatbot tab.</h2>
          <p>VYRO is not just a chatbot in a browser. It lives on your desktop, can react visually, can help with real PC actions, and is designed to feel like a small AI companion beside your work.</p>
        </section>

        <section className="features-trust-callout" aria-labelledby="features-trust-title">
          <div>
            <p className="policy-kicker">Trust and control</p>
            <h2 id="features-trust-title">Want to know how VYRO handles privacy and security?</h2>
          </div>
          <div className="features-trust-links">
            <Link href="/security">Read Security</Link>
            <Link href="/privacy">Read Privacy Policy</Link>
          </div>
        </section>

        <section className="features-cta" aria-labelledby="features-cta-title">
          <h2 id="features-cta-title">Ready to try VYRO?</h2>
          <p>Get the Windows AI desktop companion with a one-time lifetime license.</p>
          <Link href="/#pricing">Get VYRO</Link>
        </section>
      </section>

      <footer className="site-footer professional-footer">
        <div className="site-footer-brand">
          <Link className="site-footer-logo" href="/">VYRO</Link>
          <p>AI desktop companion for Windows.</p>
        </div>
        <div className="site-footer-column">
          <h3>Company</h3>
          <Link href="/">Home</Link>
          <Link href="/#demo">Demo</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/features">Features</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </div>
        <div className="site-footer-column">
          <h3>Support</h3>
          <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>
          <Link href="/recover-key">Recover license key</Link>
        </div>
      </footer>
    </main>
  );
}
