import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is VYRO AI Safe? Security and Privacy Explained | VYRO",
  description: "Learn how VYRO handles voice commands, desktop actions, permissions, privacy, and user control as an AI desktop companion for Windows.",
  alternates: {
    canonical: "https://vyrodesk.com/blog/vyro-ai-security",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Is VYRO AI Safe? Security and Privacy Explained | VYRO",
    description: "Learn how VYRO handles voice commands, desktop actions, permissions, privacy, and user control as an AI desktop companion for Windows.",
    url: "https://vyrodesk.com/blog/vyro-ai-security",
    type: "article",
  },
};

const articleUrl = "https://vyrodesk.com/blog/vyro-ai-security";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Is VYRO AI Safe? Security and Privacy Explained",
  description: "Learn how VYRO handles voice commands, desktop actions, permissions, privacy, and user control as an AI desktop companion for Windows.",
  url: articleUrl,
  author: {
    "@type": "Organization",
    name: "VYRO",
  },
  publisher: {
    "@type": "Organization",
    name: "VYRO",
    logo: {
      "@type": "ImageObject",
      url: "https://vyrodesk.com/icon-512x512.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://vyrodesk.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://vyrodesk.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Is VYRO AI Safe?",
      item: articleUrl,
    },
  ],
};

const safetyTips = [
  "Download VYRO only from the official website.",
  "Review permissions before enabling voice features.",
  "Keep Windows updated.",
  "Quit VYRO when you do not need it.",
  "Do not share sensitive information unless you understand how a feature works.",
];

const faqs = [
  {
    question: "Is VYRO AI safe to use?",
    answer: "VYRO is designed as a user-controlled AI desktop companion for Windows. It should respond to supported commands you give, not secretly operate your computer.",
  },
  {
    question: "Does VYRO listen all the time?",
    answer: "Voice features use microphone access when enabled. Users control microphone permissions, and behavior may depend on the selected voice mode.",
  },
  {
    question: "Can VYRO control my PC?",
    answer: "VYRO can help with supported desktop actions such as opening apps or starting focus mode. Sensitive actions should require user intent and control.",
  },
  {
    question: "Does VYRO store my voice?",
    answer: "Voice and AI behavior may depend on the selected mode and services used. Review the Privacy Policy for the most complete information about processing and retention.",
  },
  {
    question: "Is VYRO available for Windows 10 and Windows 11?",
    answer: "Yes. VYRO is built as an AI desktop companion for Windows 10 and Windows 11.",
  },
  {
    question: "Where can I read the full Privacy Policy?",
    answer: "You can read the full VYRO Privacy Policy at /privacy.",
  },
];

export default function VyroAiSecurityArticlePage() {
  return (
    <main className="privacy-page security-page blog-page article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <article>
        <header className="security-hero blog-hero" aria-labelledby="article-title">
          <p className="policy-kicker">VYRO AI security</p>
          <h1 id="article-title">Is VYRO AI Safe?</h1>
          <p>A clear explanation of VYRO security, privacy, voice commands, and user control.</p>
        </header>

        <div className="article-shell">
          <section className="article-callout">
            <h2>Short answer</h2>
            <p>VYRO is designed to be a user-controlled AI desktop companion for Windows. It should help only when you give supported commands, and it is not designed to secretly control your computer.</p>
          </section>

          <section>
            <h2>Voice commands and microphone access</h2>
            <p>VYRO uses microphone access for voice commands when voice features are enabled. You control microphone permissions through Windows and can decide when voice features are appropriate for your setup.</p>
            <p>Depending on the selected mode, voice features may require AI processing. We avoid claiming full local-only processing unless a feature is specifically documented that way.</p>
          </section>

          <section>
            <h2>Desktop actions</h2>
            <p>VYRO can help with supported desktop actions such as opening apps and starting focus mode. These actions are meant to be user-triggered and visible.</p>
            <p>VYRO should not perform sensitive actions without user intent. You should remain in control of what happens on your PC.</p>
          </section>

          <section>
            <h2>Privacy and data handling</h2>
            <p>Privacy details depend on the feature, selected mode, and services used for AI processing. The clearest place to review current privacy language is the <Link href="/privacy">VYRO Privacy Policy</Link>.</p>
            <p>That policy explains microphone and voice command handling, desktop permissions, AI processing, analytics, payments, and user controls in more detail.</p>
          </section>

          <section>
            <h2>Security page</h2>
            <p>For a shorter overview, visit the <Link href="/security">VYRO AI Security page</Link>. It explains what VYRO can control, what it cannot do, and how permission clarity works.</p>
          </section>

          <section className="article-feature-card">
            <h2>Practical safety tips for users</h2>
            <ul>
              {safetyTips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </section>

          <section>
            <h2>VYRO AI security FAQ</h2>
            <div className="article-faq-list">
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>
                    {faq.question === "Where can I read the full Privacy Policy?" ? (
                      <>You can read the full VYRO Privacy Policy at <Link href="/privacy">vyrodesk.com/privacy</Link>.</>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2>Related reading</h2>
            <p>Continue with the <Link href="/security">Security page</Link>, <Link href="/privacy">Privacy Policy</Link>, <Link href="/features">VYRO features</Link>, or the guide <Link href="/blog/ai-desktop-companion">What Is an AI Desktop Companion?</Link></p>
          </section>

          <section className="article-cta">
            <h2>Learn more about VYRO</h2>
            <p>Explore how VYRO brings voice commands, app launching, focus mode, and reactions to Windows.</p>
            <div>
              <Link href="/features">View features</Link>
              <Link href="/#pricing">Get VYRO</Link>
            </div>
          </section>
        </div>
      </article>

      <footer className="site-footer professional-footer">
        <div className="site-footer-brand">
          <Link className="site-footer-logo" href="/">VYRO</Link>
          <p>AI desktop companion for Windows.</p>
        </div>
        <div className="site-footer-column">
          <h3>Company</h3>
          <Link href="/">Home</Link>
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
        </div>
      </footer>
    </main>
  );
}
