import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VYRO AI Security: Is VYRO Safe to Use?",
  description: "Learn how VYRO handles voice commands, desktop actions, privacy, and user control as an AI desktop companion for Windows.",
  alternates: {
    canonical: "https://vyrodesk.com/security",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VYRO AI Security: Is VYRO Safe to Use?",
    description: "Learn how VYRO handles voice commands, desktop actions, privacy, and user control as an AI desktop companion for Windows.",
    url: "https://vyrodesk.com/security",
  },
};

const securitySections = [
  {
    id: "short-answer",
    label: "Short answer",
    title: "Is VYRO safe to use?",
    body: "VYRO is designed as a user-controlled AI desktop companion for Windows. It should only act when you give it commands, and it is not designed to secretly control your computer.",
  },
  {
    id: "voice-commands",
    label: "Voice",
    title: "Voice commands",
    body: "VYRO uses microphone access for voice commands when voice features are enabled. You stay in control of microphone permissions through Windows, and voice features may use AI processing depending on the selected mode.",
  },
  {
    id: "desktop-actions",
    label: "Desktop",
    title: "Desktop actions",
    body: "VYRO can perform helpful desktop actions such as opening apps, responding to commands, or starting focus mode. It should not perform sensitive actions without user intent, and desktop actions should remain visible to you.",
  },
  {
    id: "privacy-control",
    label: "Control",
    title: "Privacy and user control",
    body: "Privacy information is available in the VYRO Privacy Policy. Users should be able to quit or close VYRO, manage permissions, and decide which features are enabled.",
  },
];

const faqs = [
  {
    question: "Is VYRO AI safe?",
    answer: "VYRO AI is built around user control. It is meant to respond to your commands and keep desktop actions visible rather than operating secretly in the background.",
  },
  {
    question: "Does VYRO listen all the time?",
    answer: "Voice features require microphone permission. Depending on your settings and selected mode, VYRO may listen for commands when voice control is enabled.",
  },
  {
    question: "Can VYRO control my PC?",
    answer: "VYRO can help with requested actions like opening apps or starting focus mode. Sensitive actions should require clear user intent and should not happen without your control.",
  },
  {
    question: "Does VYRO work on Windows 10 and Windows 11?",
    answer: "Yes. VYRO is designed as an AI desktop companion for Windows 10 and Windows 11.",
  },
  {
    question: "Where can I read VYRO's Privacy Policy?",
    answer: "You can read the full Privacy Policy at /privacy.",
  },
];

export default function SecurityPage() {
  return (
    <main className="privacy-page security-page">
      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#demo">Demo</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="security-hero" aria-labelledby="security-title">
        <p className="policy-kicker">VYRO AI security</p>
        <h1 id="security-title">VYRO AI Security</h1>
        <p>How VYRO handles voice commands, desktop actions, and privacy.</p>
      </section>

      <section className="security-shell" aria-label="VYRO AI security information">
        <div className="security-grid">
          {securitySections.map((section) => (
            <article className="security-card" id={section.id} key={section.id}>
              <span>{section.label}</span>
              <h2>{section.title}</h2>
              <p>
                {section.id === "privacy-control" ? (
                  <>
                    Privacy information is available in the <Link href="/privacy">VYRO Privacy Policy</Link>. Users should be able to quit or close VYRO, manage permissions, and decide which features are enabled.
                  </>
                ) : (
                  section.body
                )}
              </p>
            </article>
          ))}
        </div>

        <section className="security-faq" aria-labelledby="security-faq-title">
          <p className="policy-kicker">Security FAQ</p>
          <h2 id="security-faq-title">Common questions</h2>
          <div className="security-faq-list">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>
                  {faq.question === "Where can I read VYRO's Privacy Policy?" ? (
                    <>You can read the full Privacy Policy at <Link href="/privacy">vyrodesk.com/privacy</Link>.</>
                  ) : (
                    faq.answer
                  )}
                </p>
              </article>
            ))}
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
          <Link href="/#demo">Demo</Link>
          <Link href="/#pricing">Pricing</Link>
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