import type { Metadata } from "next";
import Link from "next/link";

const title = "AI Desktop Assistant for Windows: VYRO Desktop AI Companion";
const description = "VYRO is an AI desktop assistant for Windows that lives on your desktop, talks back, opens apps with voice commands, helps you focus, and reacts with personality.";
const pageUrl = "https://vyrodesk.com/ai-desktop-assistant";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: pageUrl, type: "website" },
};

const demoCommands = [
  { command: "VYRO, open Spotify", response: "Opening Spotify", label: "Voice command" },
  { command: "VYRO, focus mode", response: "Focus mode enabled", label: "Focus Mode" },
  { command: "Slap Mode", response: "A funny desktop reaction", label: "Personality" },
];

const features = [
  ["Desktop AI companion", "Keep a responsive AI companion directly on your Windows desktop."],
  ["Voice commands", "Speak naturally to trigger supported actions without interrupting your flow."],
  ["Open apps with your voice", "Ask VYRO to launch supported apps such as Spotify or Chrome."],
  ["Focus Mode", "Start a more intentional work session when it is time to concentrate."],
  ["Personality and reactions", "VYRO talks back and responds with visible emotional reactions."],
  ["Slap Mode", "Trigger a clean, funny reaction that gives your desktop a little personality."],
  ["Built for Windows", "Designed for Windows 10 and Windows 11 desktop users."],
];

const useCases = [
  "Talk to your PC",
  "Open apps faster",
  "Start focus sessions",
  "Make your desktop feel alive",
  "Use VYRO without opening another browser tab",
  "Get a personal AI companion on Windows",
];

const faqs = [
  {
    question: "What is an AI desktop assistant?",
    answer: "An AI desktop assistant is software that stays close to your computer workflow and helps through conversation, voice commands, and supported desktop actions.",
  },
  {
    question: "Is VYRO a desktop AI assistant for Windows?",
    answer: "Yes. VYRO is designed as a visible AI desktop companion for Windows 10 and Windows 11.",
  },
  {
    question: "Can VYRO open apps with voice commands?",
    answer: "VYRO can open supported apps when you ask, helping you move through common desktop actions with less clicking.",
  },
  {
    question: "What is the difference between a desktop AI assistant and a chatbot?",
    answer: "A chatbot usually stays inside a browser or app window. A desktop AI assistant is designed to remain present on the desktop and connect supported commands to the user’s PC workflow.",
  },
  {
    question: "Does VYRO have Focus Mode?",
    answer: "Yes. VYRO includes Focus Mode to help users begin a more intentional work or study session.",
  },
  {
    question: "What is Slap Mode?",
    answer: "Slap Mode is a playful VYRO feature that triggers a funny, brand-safe desktop reaction. It adds personality without replacing VYRO’s useful desktop features.",
  },
  {
    question: "Does VYRO work on Windows?",
    answer: "Yes. VYRO is built for Windows 10 and Windows 11 users.",
  },
];

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VYRO",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Windows 10, Windows 11",
  description,
  url: "https://vyrodesk.com/",
  offers: {
    "@type": "Offer",
    price: "19.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@type": "Organization", name: "VYRO", url: "https://vyrodesk.com/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vyrodesk.com/" },
    { "@type": "ListItem", position: 2, name: "AI Desktop Assistant", item: pageUrl },
  ],
};

export default function AiDesktopAssistantPage() {
  return (
    <main className="privacy-page security-page ai-pc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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

      <section className="ai-pc-hero" aria-labelledby="ai-desktop-title">
        <p className="policy-kicker">Desktop AI for Windows</p>
        <h1 id="ai-desktop-title">AI Desktop Assistant for Windows</h1>
        <p>VYRO is a desktop AI companion that lives on your Windows PC, talks back, opens apps with voice commands, helps you focus, and reacts with personality.</p>
        <div className="ai-pc-actions">
          <Link href="/#pricing">Try VYRO</Link>
          <Link href="/#demo">Watch Demo</Link>
        </div>
        <small>Built for Windows desktop users.</small>
      </section>

      <section className="ai-pc-shell" aria-label="VYRO AI desktop assistant details">
        <section className="ai-pc-demo" aria-labelledby="desktop-demo-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">See how it responds</p>
            <h2 id="desktop-demo-title">Your desktop, ready when you speak.</h2>
            <p>Simple commands create visible responses, so you can understand how VYRO fits into a Windows workflow in seconds.</p>
          </div>
          <div className="ai-pc-demo-grid">
            {demoCommands.map((demo) => (
              <article key={demo.command}>
                <span>{demo.label}</span>
                <p className="ai-pc-command">&ldquo;{demo.command}&rdquo;</p>
                <p className="ai-pc-response">{demo.response}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-pc-problem" aria-labelledby="desktop-problem-title">
          <p className="policy-kicker">Beyond another tab</p>
          <h2 id="desktop-problem-title">Most AI tools are separated from your desktop.</h2>
          <p>Browser chatbots, sidebars, and standalone apps are useful, but they still make you go to them. VYRO is designed to live directly on the Windows desktop, bringing voice commands, supported actions, and personality closer to your everyday work.</p>
        </section>

        <section aria-labelledby="desktop-features-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">Desktop-first features</p>
            <h2 id="desktop-features-title">A desktop AI assistant with presence.</h2>
          </div>
          <div className="ai-pc-feature-grid">
            {features.map(([featureTitle, body], index) => (
              <article key={featureTitle}>
                <span>0{index + 1}</span>
                <h3>{featureTitle}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-pc-comparison" aria-labelledby="desktop-comparison-title">
          <p className="policy-kicker">Choose the right interface</p>
          <h2 id="desktop-comparison-title">Desktop AI Assistant vs Browser Chatbot</h2>
          <div className="ai-pc-comparison-grid">
            <article><span>Browser chatbot</span><p>Excellent for text conversations, but usually separate from active desktop work.</p></article>
            <article><span>Sidebar assistant</span><p>Convenient inside its host app, while remaining contained within that interface.</p></article>
            <article className="ai-pc-comparison-accent"><span>Desktop AI assistant</span><p>Designed to stay visible on Windows and connect voice-first interaction with supported desktop actions.</p></article>
          </div>
        </section>

        <section className="ai-pc-use-cases" aria-labelledby="desktop-use-cases-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">Everyday use cases</p>
            <h2 id="desktop-use-cases-title">Less friction between you and your PC.</h2>
          </div>
          <ul>{useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul>
        </section>

        <section className="ai-pc-why" aria-labelledby="desktop-why-title">
          <p className="policy-kicker">Why VYRO</p>
          <h2 id="desktop-why-title">A more personal Windows desktop experience.</h2>
          <p>VYRO lives on the Windows desktop and is designed for voice-first interaction. It combines practical features such as app launching and Focus Mode with emotional and funny reactions that make the companion feel more present.</p>
          <p>VYRO is an early founder product for users who want to shape a more useful and personal kind of desktop AI software. Explore the <Link href="/features">VYRO features</Link>, learn about <Link href="/security">security and user control</Link>, or compare this page with our <Link href="/ai-assistant-for-pc">AI assistant for PC overview</Link>.</p>
        </section>

        <section className="ai-pc-faq" aria-labelledby="desktop-faq-title">
          <p className="policy-kicker">FAQ</p>
          <h2 id="desktop-faq-title">AI desktop assistant questions</h2>
          <div>
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-pc-cta" aria-labelledby="desktop-cta-title">
          <p className="policy-kicker">Founder Edition</p>
          <h2 id="desktop-cta-title">Try a desktop AI companion built for Windows.</h2>
          <p>Founder Edition covers the VYRO core desktop app. Advanced cloud AI modules may require a Pro plan later.</p>
          <div>
            <Link href="/#pricing">Try VYRO</Link>
            <Link href="/#demo">Watch Demo</Link>
          </div>
          <p className="ai-pc-related">Related reading: <Link href="/blog/best-ai-desktop-assistant-windows">AI desktop assistants for Windows</Link>, <Link href="/blog/ai-voice-assistant-for-pc">AI voice assistants for PC</Link>, <Link href="/blog/windows-copilot-alternative">Windows Copilot alternatives</Link>, and <Link href="/blog/ai-desktop-companion">what an AI desktop companion is</Link>.</p>
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
          <Link href="/features">Features</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy Policy</Link>
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
