import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is an AI Desktop Companion? | VYRO",
  description: "Learn what an AI desktop companion is, how it differs from a chatbot, and how tools like VYRO bring voice commands, reactions, and desktop actions to Windows.",
  alternates: {
    canonical: "https://vyrodesk.com/blog/ai-desktop-companion",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "What Is an AI Desktop Companion? | VYRO",
    description: "Learn what an AI desktop companion is, how it differs from a chatbot, and how tools like VYRO bring voice commands, reactions, and desktop actions to Windows.",
    url: "https://vyrodesk.com/blog/ai-desktop-companion",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is an AI Desktop Companion?",
  description: "Learn what an AI desktop companion is, how it differs from a chatbot, and how tools like VYRO bring voice commands, reactions, and desktop actions to Windows.",
  url: "https://vyrodesk.com/blog/ai-desktop-companion",
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
    "@id": "https://vyrodesk.com/blog/ai-desktop-companion",
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
      name: "What Is an AI Desktop Companion?",
      item: "https://vyrodesk.com/blog/ai-desktop-companion",
    },
  ],
};

const commonFeatures = [
  "Voice commands",
  "Opening apps",
  "Focus mode",
  "Visual emotions and reactions",
  "Desktop assistance",
  "Windows support",
];

export default function AiDesktopCompanionArticlePage() {
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
          <p className="policy-kicker">AI desktop companion guide</p>
          <h1 id="article-title">What Is an AI Desktop Companion?</h1>
          <p>A simple explanation of how desktop AI assistants are moving beyond browser chatbots.</p>
        </header>

        <div className="article-shell">
          <section>
            <h2>What is an AI desktop companion?</h2>
            <p>An AI desktop companion is an assistant that lives closer to your everyday computer experience. Instead of only answering inside a browser tab, it can help with actions, commands, focus, and interaction on your desktop.</p>
            <p>For Windows users, the idea is simple: make common PC tasks feel more natural by combining voice commands, helpful responses, and visible desktop behavior.</p>
          </section>

          <section>
            <h2>How is it different from a chatbot?</h2>
            <p>A chatbot usually lives in a browser or app window. You type a message, wait for a reply, and stay inside that chat interface.</p>
            <p>A desktop AI assistant can sit on the desktop, react visually, and help trigger supported PC actions. That makes it feel more like a small assistant than a normal chat box.</p>
          </section>

          <section className="article-feature-card">
            <h2>Common AI desktop companion features</h2>
            <ul>
              {commonFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </section>

          <section>
            <h2>Why Windows users may want one</h2>
            <p>A desktop AI companion can help reduce repetitive clicking, make app access faster, and create a more natural way to interact with your PC. It can also add more personality than standard desktop tools.</p>
          </section>

          <section>
            <h2>Where VYRO fits</h2>
            <p>VYRO is an AI desktop companion for Windows. It supports voice commands, app launching, focus mode, and emotional reactions, and it is designed to feel more personal than a normal chatbot.</p>
            <p>VYRO is not meant to replace user control. It is built around visible actions and user-triggered interaction.</p>
          </section>

          <section className="article-callout">
            <h2>Trust and security</h2>
            <p>Desktop AI tools should be clear about permissions, privacy, and control. You can read more about VYRO&apos;s approach on the <Link href="/security">Security page</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
          </section>

          <section className="article-cta">
            <h2>Explore VYRO</h2>
            <p>See what VYRO can do as an AI desktop companion for Windows.</p>
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
