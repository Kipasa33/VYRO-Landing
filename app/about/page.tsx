import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VYRO - AI Desktop Companion for Windows",
  description: "Learn about VYRO, an AI desktop companion for Windows, and find support, license recovery, security, privacy, and product links.",
  alternates: {
    canonical: "https://vyrodesk.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About VYRO - AI Desktop Companion for Windows",
    description: "Learn about VYRO, an AI desktop companion for Windows, and find support, license recovery, security, privacy, and product links.",
    url: "https://vyrodesk.com/about",
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About VYRO",
  url: "https://vyrodesk.com/about",
  description: "Learn about VYRO, an AI desktop companion for Windows, and find support, license recovery, security, privacy, and product links.",
  isPartOf: {
    "@type": "WebSite",
    name: "VYRO",
    url: "https://vyrodesk.com/",
  },
};

const helpfulLinks = [
  { href: "/features", title: "Features", text: "Explore voice commands, focus mode, reactions, and desktop assistance." },
  { href: "/blog", title: "Blog", text: "Read guides about AI desktop companions and Windows AI assistants." },
  { href: "/security", title: "Security", text: "Understand VYRO security, permissions, and user control." },
  { href: "/privacy", title: "Privacy Policy", text: "Review privacy, processing, analytics, and payment information." },
  { href: "/recover-key", title: "Recover License Key", text: "Access your purchase and recover your VYRO license key." },
];

export default function AboutPage() {
  return (
    <main className="privacy-page security-page about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />

      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/features">Features</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="security-hero about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="policy-kicker">About VYRO</p>
          <h1 id="about-title">About VYRO</h1>
          <p>VYRO is an AI desktop companion for Windows designed to make your PC feel more natural, responsive, and personal.</p>
          <p className="features-intro">VYRO can respond to voice commands, open supported apps, start focus mode, and react with visual emotions - while keeping the user in control.</p>
        </div>
        <div className="about-robot-wrap" aria-hidden="true">
          <video
            className="about-robot-video"
            src="/vyro-robot.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="VYRO robot mascot"
          />
        </div>
      </section>

      <section className="security-shell" aria-label="About VYRO and support">
        <section className="features-difference about-explainer" aria-labelledby="what-vyro-is">
          <p className="policy-kicker">What VYRO is</p>
          <h2 id="what-vyro-is">A Windows AI desktop companion.</h2>
          <p>VYRO is not just a browser chatbot. It is designed to live closer to the desktop experience and help with simple supported actions like voice commands, app launching, focus mode, and visual reactions.</p>
        </section>

        <section className="about-support-card" aria-labelledby="support-title">
          <div>
            <p className="policy-kicker">Support</p>
            <h2 id="support-title">Support</h2>
            <p>Need help with your license, privacy, security, or purchase? Start here.</p>
          </div>
          <div className="about-support-links">
            <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>
            <Link href="/recover-key">Recover your license key</Link>
            <Link href="/security">Read about VYRO security</Link>
            <Link href="/privacy">Read our Privacy Policy</Link>
            <span>Secure payments powered by Polar</span>
          </div>
        </section>

        <section className="features-card-grid about-links-grid" aria-label="Helpful VYRO links">
          {helpfulLinks.map((item) => (
            <Link className="security-card feature-detail-card about-link-card" href={item.href} key={item.href}>
              <span>Link</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </Link>
          ))}
        </section>

        <section className="features-trust-callout about-trust-note" aria-labelledby="about-trust-title">
          <div>
            <p className="policy-kicker">Trust note</p>
            <h2 id="about-trust-title">You stay in control.</h2>
            <p>VYRO is built around user control. You decide when to use it, what permissions to allow, and when to close it.</p>
          </div>
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
          <Link href="/about">About</Link>
          <Link href="/features">Features</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </div>
        <div className="site-footer-column">
          <h3>Support</h3>
          <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>
          <Link href="/recover-key">Recover license key</Link>
          <span>Secure payments powered by Polar</span>
        </div>
      </footer>
    </main>
  );
}
