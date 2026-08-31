import type { Metadata } from "next";
import Link from "next/link";

const title = "AI Automation for Windows: Voice-Controlled Routines With VYRO";
const description = "Automate Windows tasks with VYRO using voice-controlled routines, app launching, Focus Mode, reminders, timers, web actions, and multi-step workflows.";
const pageUrl = "https://vyrodesk.com/windows-ai-automation";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: pageUrl, type: "website" },
};

const routineExamples = [
  { title: "Coding routine", command: "Run my Coding routine", steps: ["Open Chrome", "Open GitHub", "Enable Focus Mode"] },
  { title: "Study routine", command: "Run my Study routine", steps: ["Open Documents", "Start a timer", "Enable Focus Mode"] },
  { title: "Deep Work routine", command: "Run my Deep Work routine", steps: ["Open a work app", "Enable Focus Mode", "Set a reminder"] },
  { title: "Morning routine", command: "Run my Morning routine", steps: ["Open a website", "Check basic system information", "Start a timer"] },
];

const comparisonRows = [
  ["Natural voice commands", "Run supported actions and routines by voice", "Usually require typed commands or manual triggers"],
  ["Setup complexity", "Create, rename, reorder, and use routine templates in VYRO", "Often require learning a scripting or macro tool"],
  ["Multi-step workflows", "Combine safe VYRO tools into a routine", "Can combine steps, depending on the tool and setup"],
  ["Desktop companion interaction", "A visible companion can talk and react as it helps", "Typically runs as a utility, script, or background process"],
  ["Focus and productivity", "Includes Focus Mode, timers, reminders, and notifications", "Productivity features depend on the tool"],
  ["Safe predefined tools", "Routines use bounded VYRO tools and supported actions", "Capabilities and safeguards depend on the script or tool"],
] as const;

const futureItems = [
  "Custom VYRO Automations",
  "More advanced multi-step actions",
  "Custom voice triggers",
  "NFC triggers",
  "QR code triggers",
  "Scheduled automations",
  "Desktop shortcuts",
  "Windows and system event triggers",
  "Background AI agents and watchers",
];

const faqs = [
  { question: "Can AI automate tasks on Windows?", answer: "AI tools can help automate supported Windows tasks. VYRO currently supports safe desktop actions and custom multi-step routines that can be started by voice." },
  { question: "Can VYRO automate Windows tasks?", answer: "VYRO can run supported actions such as opening apps, websites, common folders, searches, Focus Mode, timers, reminders, and notifications. It does not claim unrestricted Windows control." },
  { question: "What are VYRO routines?", answer: "VYRO routines are custom multi-step workflows built from safe VYRO tools. You can create, rename, reorder, and run them, or start with available routine templates." },
  { question: "Can I run a VYRO routine with my voice?", answer: "Yes. You can use a voice command such as “Run my Coding routine” to start a routine with its saved supported steps." },
  { question: "Can VYRO open multiple apps automatically?", answer: "A VYRO routine can include multiple supported app-opening steps, along with other supported actions such as Focus Mode or timers." },
  { question: "Does VYRO support NFC automation?", answer: "Not currently. NFC triggers are planned as part of a more powerful automation system in development." },
  { question: "Does VYRO support scheduled automations?", answer: "Not currently. Scheduled automations are planned and are not available as a current VYRO feature." },
  { question: "Is VYRO automation safe?", answer: "VYRO routines use safe, supported VYRO tools rather than claiming unrestricted system automation. Review its permissions and user-control approach on the Security page." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vyrodesk.com/" },
    { "@type": "ListItem", position: 2, name: "Windows AI Automation", item: pageUrl },
  ],
};

export default function WindowsAiAutomationPage() {
  return (
    <main className="privacy-page security-page ai-pc-page automation-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link><Link href="/#demo">Demo</Link><Link href="/features">Features</Link><Link href="/security">Security</Link><Link href="/privacy">Privacy</Link><Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="ai-pc-hero" aria-labelledby="automation-title">
        <p className="policy-kicker">Windows AI automation</p>
        <h1 id="automation-title">AI Automation for Windows With Voice-Controlled Routines</h1>
        <p>VYRO combines an AI desktop assistant with safe Windows actions and custom multi-step routines, so you can use your voice to start useful work without claiming unrestricted OS automation.</p>
        <div className="ai-pc-actions"><Link href="/#pricing">Try VYRO</Link><Link href="/features">Explore features</Link></div>
        <small>Built for supported actions on Windows 10 and Windows 11.</small>
      </section>

      <section className="ai-pc-shell" aria-label="VYRO Windows AI automation details">
        <section className="automation-callout" aria-labelledby="coding-example-title">
          <p className="policy-kicker">A practical example</p>
          <h2 id="coding-example-title">“Run my Coding routine”</h2>
          <p>Open Chrome <span aria-hidden="true">→</span> Open GitHub <span aria-hidden="true">→</span> Enable Focus Mode</p>
          <small>Each routine is made from supported VYRO actions that you choose.</small>
        </section>

        <section className="ai-pc-problem" aria-labelledby="what-is-title">
          <p className="policy-kicker">Start with the useful part</p>
          <h2 id="what-is-title">What is AI automation for Windows?</h2>
          <p>AI automation for Windows helps turn everyday requests into supported desktop actions. With VYRO, that can mean opening an app or website, searching the web, opening a common folder, starting Focus Mode, setting a timer, or combining those actions into a custom routine.</p>
        </section>

        <section aria-labelledby="voice-title">
          <div className="ai-pc-section-head"><p className="policy-kicker">Voice-controlled productivity</p><h2 id="voice-title">Automate Windows tasks with voice commands</h2><p>VYRO supports voice wake, voice commands, and follow-up conversation mode, so you do not need to repeat the wake phrase for every supported follow-up. Sleep, Wake Up, and Quiet Mode let you decide when voice interaction is active.</p></div>
          <div className="ai-pc-feature-grid automation-feature-grid">
            <article><span>Apps</span><h3>Open apps and folders</h3><p>Open supported Windows apps and common folders including Downloads, Documents, Desktop, and Pictures.</p></article>
            <article><span>Web</span><h3>Search and open</h3><p>Use Google or web search, open websites, and search or open YouTube.</p></article>
            <article><span>Focus</span><h3>Stay on task</h3><p>Start Focus Mode, timers, local reminders, and Windows notifications.</p></article>
            <article><span>Info</span><h3>Check your PC</h3><p>Ask for basic system information such as CPU, RAM, and uptime.</p></article>
          </div>
        </section>

        <section className="ai-pc-split" aria-label="VYRO routines and follow-up actions">
          <article><p className="policy-kicker">Custom routines</p><h2>Build custom VYRO routines</h2><p>Create a routine, give it a name, add safe VYRO tools, and reorder or remove steps as your workflow changes. Routine templates for Coding, Study, Morning, and Deep Work provide a useful place to start.</p></article>
          <article><p className="policy-kicker">Bounded context</p><h2>Context-aware follow-up actions</h2><p>VYRO can support follow-ups such as “copy that,” “save that,” “search that,” “explain that,” or “remind me about that” using bounded recent-result context. This is not unrestricted screen awareness.</p></article>
        </section>

        <section className="automation-routines" aria-labelledby="routine-title">
          <p className="policy-kicker">Use cases</p><h2 id="routine-title">How multi-step routines work</h2>
          <p>Routines let you chain supported VYRO tools into one voice-started workflow. Choose the steps, then run the routine when you need it.</p>
          <div>{routineExamples.map((routine) => <article key={routine.title}><span>{routine.title}</span><h3>“{routine.command}”</h3><ol>{routine.steps.map((step) => <li key={step}>{step}</li>)}</ol></article>)}</div>
        </section>

        <section className="automation-safe" aria-labelledby="safe-title">
          <p className="policy-kicker">Control matters</p><h2 id="safe-title">Safe desktop automation, not unrestricted control</h2>
          <p>VYRO uses safe, predefined tools for supported actions. It can also use limited current-app awareness, explicit clipboard reading or writing, text transformations, and explicitly selected .txt, .md, and .json files. It does not claim arbitrary shell execution, full screen understanding, or unrestricted Windows control.</p>
          <p>Learn more about permissions and user control on the <Link href="/security">Security page</Link>.</p>
        </section>

        <section className="ai-pc-comparison" aria-labelledby="comparison-title">
          <p className="policy-kicker">Different workflows, different tools</p><h2 id="comparison-title">VYRO automation vs. traditional macros and scripts</h2>
          <div className="ai-pc-comparison-table" role="table" aria-label="VYRO routine comparison with scripts and macros">
            <div className="ai-pc-comparison-row ai-pc-comparison-heading" role="row"><span role="columnheader">Dimension</span><span role="columnheader">VYRO routines</span><span role="columnheader">Traditional scripts or macros</span></div>
            {comparisonRows.map(([dimension, vyro, traditional]) => <div className="ai-pc-comparison-row" role="row" key={dimension}><strong role="rowheader">{dimension}</strong><span role="cell">{vyro}</span><span role="cell">{traditional}</span></div>)}
          </div>
        </section>

        <section className="ai-pc-why" aria-labelledby="who-title">
          <p className="policy-kicker">Who it is for</p><h2 id="who-title">Who VYRO automation is for</h2>
          <p>VYRO is for Windows users who want a voice-controlled desktop companion that can make supported everyday actions feel faster. It is a fit for people who work, study, code, or simply want an easier way to open apps, search, focus, and start repeatable routines.</p>
          <p>Explore the <Link href="/ai-assistant-for-pc">AI assistant for PC overview</Link>, the <Link href="/ai-desktop-assistant">desktop assistant page</Link>, or the complete <Link href="/features">feature list</Link>.</p>
        </section>

        <section className="automation-roadmap" aria-labelledby="roadmap-title">
          <p className="policy-kicker">In development</p><h2 id="roadmap-title">Coming to VYRO Automations</h2>
          <p><strong>VYRO already supports custom multi-step routines, with a more powerful automation system in development.</strong></p>
          <div>{futureItems.map((item) => <article key={item}><span>Planned</span><p>{item}</p></article>)}</div>
          <small>These capabilities are planned or in development and are not currently available.</small>
        </section>

        <section className="ai-pc-faq" aria-labelledby="faq-title">
          <p className="policy-kicker">FAQ</p><h2 id="faq-title">Windows AI automation questions</h2>
          <div>{faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.question === "Is VYRO automation safe?" ? <>VYRO routines use safe, supported VYRO tools rather than claiming unrestricted system automation. Review its permissions and user-control approach on the <Link href="/security">Security page</Link>.</> : faq.answer}</p></article>)}</div>
        </section>

        <section className="ai-pc-cta" aria-labelledby="cta-title">
          <p className="policy-kicker">Founder Edition</p><h2 id="cta-title">Build a routine that fits your Windows day.</h2><p>Use voice commands, supported desktop actions, and custom routines with VYRO&apos;s core desktop app.</p>
          <div><Link href="/#pricing">Get VYRO</Link><Link href="/blog/how-to-open-apps-with-voice-on-windows">Read the voice-command guide</Link></div>
        </section>
      </section>

      <footer className="site-footer professional-footer">
        <div className="site-footer-brand"><Link className="site-footer-logo" href="/">VYRO</Link><p>AI desktop companion for Windows.</p></div>
        <div className="site-footer-column"><h3>Company</h3><Link href="/">Home</Link><Link href="/#demo">Demo</Link><Link href="/#pricing">Pricing</Link><Link href="/features">Features</Link><Link href="/security">Security</Link><Link href="/privacy">Privacy Policy</Link></div>
        <div className="site-footer-column"><h3>Support</h3><a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a><Link href="/recover-key">Recover license key</Link></div>
      </footer>
    </main>
  );
}
