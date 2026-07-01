import Link from "next/link";

const lastUpdated = "July 1, 2026";

const policySections = [
  {
    id: "overview",
    title: "Overview",
    body: "This Privacy Policy explains how VYRO may process information when you use the website, purchase VYRO, or use the Windows desktop app. VYRO is designed to feel helpful and visible, while keeping users in control of desktop actions and settings.",
  },
  {
    id: "information",
    title: "Information VYRO may process",
    body: "Depending on the features you enable, VYRO may process account or purchase details, license recovery information, app settings, voice command text, user prompts, basic website analytics, and information needed to complete requested desktop actions.",
  },
  {
    id: "microphone",
    title: "Microphone and voice commands",
    body: "VYRO uses microphone access for voice commands when enabled. Voice input may be converted into text so VYRO can understand a request, respond, open apps, or perform visible desktop actions you ask for.",
  },
  {
    id: "desktop-actions",
    title: "Desktop actions and permissions",
    body: "VYRO can help with desktop actions such as opening apps you request. Sensitive actions should remain under user control or confirmation, and desktop actions are intended to stay visible rather than hidden in the background.",
  },
  {
    id: "ai-processing",
    title: "AI processing",
    body: "Some AI features may send text/transcription or user prompts to external AI services for processing. Do not share passwords, payment card numbers, or other sensitive information in prompts unless you are comfortable with that processing.",
  },
  {
    id: "payments",
    title: "Payment processing",
    body: "Payments are handled by our payment provider and VYRO does not store full payment card details. Purchase, receipt, and license information may be used to provide access, recover keys, and support your order.",
  },
  {
    id: "analytics",
    title: "Analytics",
    body: "Website analytics may collect basic usage information such as page views, device/browser details, referrers, and approximate usage patterns so we can understand and improve the site.",
  },
  {
    id: "retention",
    title: "Data retention",
    body: "We keep information only as long as reasonably needed for purchases, support, security, product improvement, and legal or operational requirements. Retention may vary based on the type of information and provider systems involved.",
  },
  {
    id: "control",
    title: "User control and settings",
    body: "Users remain in control and can disable features in settings. You can choose whether to enable voice features, manage permissions in Windows, and contact support for help with purchase or license access.",
  },
  {
    id: "security",
    title: "Security",
    body: "We use reasonable technical and organizational safeguards to protect VYRO systems and purchase flows. No software or online service can guarantee perfect security, so please use strong account practices and avoid sharing sensitive secrets in prompts.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions about privacy, purchases, or license access can be sent to support@vyrodesk.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#demo">Demo</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/recover-key">Recover Key</Link>
        </nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="policy-shell">
        <aside className="policy-sidebar" aria-labelledby="policies-title">
          <h2 id="policies-title">Policies</h2>
          <nav aria-label="Policy links">
            <a className="active" href="#privacy-policy">Privacy Policy</a>
            <span className="policy-disabled-link">Terms of Service</span>
            <Link href="/recover-key">Recover Key</Link>
            <a href="mailto:support@vyrodesk.com">Contact</a>
          </nav>
        </aside>

        <article className="policy-content" id="privacy-policy">
          <div className="policy-intro">
            <p className="policy-kicker">VYRO Trust Center</p>
            <h1>Privacy Policy</h1>
            <p className="policy-subtitle">Your privacy, permissions, and control.</p>
            <p className="policy-updated">Last updated: {lastUpdated}</p>
          </div>

          <nav className="policy-toc" aria-label="Table of contents">
            <p>On this page</p>
            <div>
              {policySections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.title}</a>
              ))}
            </div>
          </nav>

          <div className="policy-sections">
            {policySections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                <p>
                  {section.id === "contact" ? (
                    <>
                      Questions about privacy, purchases, or license access can be sent to{" "}
                      <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>.
                    </>
                  ) : (
                    section.body
                  )}
                </p>
              </section>
            ))}
          </div>
        </article>
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
          <Link href="/#faq">FAQ</Link>
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
