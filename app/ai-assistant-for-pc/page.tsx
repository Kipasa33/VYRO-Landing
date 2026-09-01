import type { Metadata } from "next";
import Link from "next/link";

const title = "AI Assistant for PC: VYRO for Windows Voice Commands and Focus Mode";
const description = "VYRO is an AI assistant for PC that lives on your Windows desktop, talks back, opens apps with voice commands, helps you focus, and reacts with personality.";
const pageUrl = "https://vyrodesk.com/ai-assistant-for-pc";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "website",
  },
};

const demoCommands = [
  { command: "VYRO, open Spotify", response: "Opening Spotify", label: "Voice command" },
  { command: "VYRO, focus mode", response: "Focus mode enabled", label: "Focus" },
  { command: "Slap Mode", response: "A playful VYRO reaction", label: "Personality" },
];

const features = [
  ["Voice commands", "Speak naturally to trigger supported desktop actions."],
  ["Open apps with your voice", "Launch supported apps without breaking your flow."],
  ["Floating desktop companion", "Keep VYRO close to your work instead of inside another tab."],
  ["Talks back", "Ask a question and receive a useful, conversational response."],
  ["Personality and reactions", "VYRO can respond with visible emotion and playful moments."],
  ["Focus Mode", "Start a more intentional Windows work session when you need to concentrate."],
  ["Slap Mode", "Trigger a clean, funny desktop reaction when you want a little personality."],
  ["Built for Windows", "Designed for Windows 10 and Windows 11 desktop users."],
];

const useCases = [
  "Open apps faster",
  "Talk to your PC",
  "Start focus sessions",
  "Make your desktop feel alive",
  "Use voice commands while working",
  "Get a more personal AI companion experience",
];

const comparisonRows = [
  ["Runs as a desktop companion", "Designed to stay visible on the Windows desktop", "May be centered on a browser, sidebar, or a different interface"],
  ["Voice commands", "Supports voice-first interaction for supported commands", "Voice support and available commands can vary"],
  ["Opens desktop apps", "Can open supported apps when you ask", "Desktop app actions can vary by assistant"],
  ["Focus and productivity", "Includes Focus Mode for more intentional work sessions", "Productivity tools vary by product"],
  ["Personality and reactions", "Talks back and includes visible reactions", "May focus primarily on utility or text responses"],
  ["Windows integration", "Built for Windows 10 and Windows 11 users", "Windows integration varies by product and setup"],
] as const;

const faqs = [
  {
    question: "What is an AI assistant for PC?",
    answer: "An AI assistant for PC is software that helps you interact with your computer through voice commands, conversational responses, and supported desktop actions.",
  },
  {
    question: "Is VYRO an AI assistant for Windows?",
    answer: "Yes. VYRO is designed as an AI desktop companion for Windows 10 and Windows 11.",
  },
  {
    question: "Can VYRO open apps with voice commands?",
    answer: "VYRO can help open supported apps and assist with simple desktop actions that you request.",
  },
  {
    question: "Does VYRO have Focus Mode?",
    answer: "Yes. VYRO can help you enter a focused work session while remaining present as a desktop companion.",
  },
  {
    question: "What is Slap Mode in VYRO?",
    answer: "Slap Mode is a playful VYRO reaction feature. It is designed as a light, funny moment, not as the main productivity feature.",
  },
  {
    question: "Is VYRO a voice assistant for PC?",
    answer: "VYRO supports voice-first interaction for supported commands and is designed to talk back as a Windows desktop companion.",
  },
  {
    question: "Is VYRO a replacement for Microsoft Copilot?",
    answer: "VYRO is built for a different experience: a visible desktop companion with voice commands, reactions, and supported actions. It is not presented as a replacement for every Copilot use case.",
  },
  {
    question: "Does VYRO work on Windows?",
    answer: "Yes. VYRO is designed for Windows 10 and Windows 11 users.",
  },
  {
    question: "What is the best AI assistant for PC?",
    answer: "The best AI assistant for PC depends on how you work. VYRO is designed for people who want a visible Windows desktop companion with supported voice commands, app launching, Focus Mode, and personality.",
  },
  {
    question: "Can I use an AI assistant on Windows?",
    answer: "Yes. VYRO is designed as an AI assistant for Windows 10 and Windows 11, with voice-first interaction and supported desktop actions.",
  },
  {
    question: "Does VYRO work on Windows 11?",
    answer: "Yes. VYRO is designed for Windows 11 as well as Windows 10.",
  },
  {
    question: "Is VYRO free?",
    answer: "No. VYRO Core / Founder Edition is currently a $19 one-time lifetime license for the core desktop app. Advanced cloud AI modules may require a Pro plan later.",
  },
];

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VYRO",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Windows 10, Windows 11",
  description: "VYRO is an AI desktop companion for Windows that talks, reacts, opens supported apps, and helps users control their PC with voice commands.",
  url: "https://vyrodesk.com/",
  offers: {
    "@type": "Offer",
    price: "19.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: {
    "@type": "Organization",
    name: "VYRO",
    url: "https://vyrodesk.com/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vyrodesk.com/" },
    { "@type": "ListItem", position: 2, name: "AI Assistant for PC", item: pageUrl },
  ],
};

export default function AiAssistantForPcPage() {
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

      <section className="ai-pc-hero" aria-labelledby="ai-pc-title">
        <p className="policy-kicker">AI assistant for PC</p>
        <h1 id="ai-pc-title">AI Assistant for PC That Lives on Your Windows Desktop</h1>
        <p>VYRO is a Windows desktop AI companion that talks, reacts, opens apps using voice commands, and helps you stay focused.</p>
        <div className="ai-pc-actions">
          <Link href="/#pricing">Try VYRO</Link>
          <Link href="/#demo">Watch Demo</Link>
        </div>
        <small>Early founder version for Windows users.</small>
      </section>

      <section className="ai-pc-shell" aria-label="VYRO AI assistant for PC details">
        <section className="ai-pc-demo" aria-labelledby="demo-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">Understand it in seconds</p>
            <h2 id="demo-title">Your desktop, ready to respond.</h2>
            <p>VYRO is designed to make the product clear in under five seconds: say something, see a response, keep moving.</p>
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

        <section className="ai-pc-problem" aria-labelledby="problem-title">
          <p className="policy-kicker">A different kind of assistant</p>
          <h2 id="problem-title">What is an AI assistant for PC?</h2>
          <p>An AI assistant for PC helps you interact with your computer through conversation, voice commands, and supported desktop actions. Browser chatbots and sidebars are useful for answers; VYRO is designed to sit directly on the Windows desktop, where voice commands, quick actions, and personality can feel part of your everyday PC experience.</p>
        </section>

        <section aria-labelledby="features-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">Core capabilities</p>
            <h2 id="features-title">What can VYRO do on Windows?</h2>
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

        <section className="ai-pc-split" aria-label="VYRO focus and personality features">
          <article>
            <p className="policy-kicker">Focus Mode</p>
            <h2>Focus Mode for Windows Users</h2>
            <p>VYRO can help you enter a focused work session for studying, coding, writing, or getting through your task list. The companion stays present while you work without promising advanced blocking or automation that is not part of the core experience.</p>
          </article>
          <article>
            <p className="policy-kicker">Slap Mode</p>
            <h2>A Desktop AI With Personality</h2>
            <p>VYRO is not just a chatbot. It can react with personality and funny responses. Slap Mode is a brand-safe, playful reaction that gives the desktop companion a little humor without distracting from useful work.</p>
          </article>
        </section>

        <section className="ai-pc-comparison" aria-labelledby="comparison-title">
          <p className="policy-kicker">How it fits</p>
          <h2 id="comparison-title">VYRO vs. browser chatbots and traditional Windows assistants</h2>
          <div className="ai-pc-comparison-grid">
            <article><span>Browser chatbot</span><p>Useful for text answers, but separate from the desktop workflow.</p></article>
            <article><span>Sidebar assistant</span><p>Close at hand, but usually contained within a browser or app interface.</p></article>
            <article className="ai-pc-comparison-accent"><span>Desktop AI companion</span><p>Designed to be visible on Windows, voice-first, responsive, and a little more personal.</p></article>
          </div>
          <div className="ai-pc-comparison-table" role="table" aria-label="VYRO assistant comparison">
            <div className="ai-pc-comparison-row ai-pc-comparison-heading" role="row">
              <span role="columnheader">How it works</span><span role="columnheader">VYRO</span><span role="columnheader">Other assistant types</span>
            </div>
            {comparisonRows.map(([dimension, vyro, other]) => (
              <div className="ai-pc-comparison-row" role="row" key={dimension}>
                <strong role="rowheader">{dimension}</strong><span role="cell">{vyro}</span><span role="cell">{other}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ai-pc-use-cases" aria-labelledby="use-cases-title">
          <div className="ai-pc-section-head">
            <p className="policy-kicker">Built for everyday Windows use</p>
            <h2 id="use-cases-title">Small moments, less friction.</h2>
          </div>
          <ul>
            {useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
          </ul>
        </section>

        <section className="ai-pc-why" aria-labelledby="why-title">
          <p className="policy-kicker">Who it is for</p>
          <h2 id="why-title">Who VYRO is useful for</h2>
          <p>VYRO is for Windows users who want practical voice commands and app launching without giving up a more personal desktop experience. It combines a visible desktop presence with Focus Mode, emotional reactions, and funny desktop moments for people who want their PC to feel a little more responsive.</p>
          <p>Learn more in the <Link href="/features">features overview</Link>, read how VYRO approaches <Link href="/security">security</Link> and <Link href="/privacy">privacy</Link>, or explore the dedicated <Link href="/ai-desktop-assistant">AI desktop assistant</Link> page.</p>
        </section>

        <section className="ai-pc-faq" aria-labelledby="faq-title">
          <p className="policy-kicker">FAQ</p>
          <h2 id="faq-title">AI assistant for PC questions</h2>
          <div>
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-pc-cta" aria-labelledby="cta-title">
          <p className="policy-kicker">Founder Edition</p>
          <h2 id="cta-title">Bring a little more life to your Windows desktop.</h2>
          <p>Founder Edition is available for the VYRO core desktop app. Advanced cloud AI modules may require a Pro plan later.</p>
          <div>
            <Link href="/#pricing">Get VYRO</Link>
            <Link href="/#demo">Watch Demo</Link>
          </div>
          <p className="ai-pc-related">Related guides: <Link href="/blog/best-ai-desktop-assistant-windows">best AI assistant for PC</Link>, <Link href="/blog/ai-voice-assistant-for-pc">AI voice assistants for PC</Link>, <Link href="/blog/how-to-open-apps-with-voice-on-windows">how to open apps with voice on Windows</Link>, <Link href="/blog/windows-copilot-alternative">Windows Copilot alternatives</Link>, and <Link href="/blog/ai-desktop-companion">AI desktop companions</Link>.</p>
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
