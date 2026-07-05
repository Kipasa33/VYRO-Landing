import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VYRO Blog - AI Desktop Companion Guides",
  description: "Guides and updates about AI desktop companions, voice commands, Windows AI assistants, and VYRO.",
  alternates: {
    canonical: "https://vyrodesk.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VYRO Blog - AI Desktop Companion Guides",
    description: "Guides and updates about AI desktop companions, voice commands, Windows AI assistants, and VYRO.",
    url: "https://vyrodesk.com/blog",
  },
};

const posts = [
  {
    href: "/blog/vyro-ai-security",
    title: "Is VYRO AI Safe? Security and Privacy Explained",
    description: "A clear guide to VYRO AI security, privacy, voice commands, desktop actions, permissions, and user control.",
  },
  {
    href: "/blog/best-ai-desktop-assistant-windows",
    title: "Best AI Desktop Assistant for Windows",
    description: "What to look for in a Windows AI desktop assistant, including voice commands, app launching, focus mode, desktop actions, and user control.",
  },
  {
    href: "/blog/ai-desktop-companion",
    title: "What Is an AI Desktop Companion?",
    description: "A simple explanation of how desktop AI assistants are moving beyond browser chatbots, and where VYRO fits for Windows users.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="privacy-page security-page blog-page">
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

      <section className="security-hero blog-hero" aria-labelledby="blog-title">
        <p className="policy-kicker">VYRO Blog</p>
        <h1 id="blog-title">AI desktop companion guides</h1>
        <p>Guides and updates about desktop AI assistants, voice commands, Windows companions, and VYRO.</p>
      </section>

      <section className="security-shell blog-list-stack" aria-label="VYRO blog articles">
        {posts.map((post) => (
          <article className="blog-list-card" key={post.href}>
            <p className="policy-kicker">Guide</p>
            <h2><Link href={post.href}>{post.title}</Link></h2>
            <p>{post.description}</p>
            <Link className="blog-read-link" href={post.href}>Read the guide</Link>
          </article>
        ))}
      </section>

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
