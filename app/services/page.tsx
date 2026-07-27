export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="aurora-bg"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <div className="wrap">
          <div className="crumb reveal"><a href="/">Home</a> / Visa Programs</div>
          <h1 className="reveal">Every route, <span className="grad">one team.</span></h1>
          <p className="reveal">Work, study, visit, business and investor visas — structured to address the full lifecycle of your application.</p>
        </div>
      </section>

      <section style={{ paddingTop: "30px" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" /> Services we provide</span>
            <h2>Explore our <span className="grad">visa programs.</span></h2>
          </div>
          <div className="tiles" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <article className="tile reveal">
              <div className="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3"/><path d="M4 12h16"/></svg></div>
              <h3>Work & employment visa</h3>
              <p>Live and work abroad legally, usually under an employer's sponsorship. We handle eligibility, employer documentation and the full application.</p>
            </article>
            <article className="tile reveal d1">
              <div className="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 2 8l10 5 10-5z"/><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></div>
              <h3>Student visa</h3>
              <p>From offer letters to financial proof, we prepare a defensible study application for the world's top education destinations.</p>
            </article>
            <article className="tile reveal">
              <div className="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg></div>
              <h3>Visit, tourist & business visa</h3>
              <p>Short-trip visas for tourism, family functions or business — with precise checklists to minimise the risk of refusal.</p>
            </article>
            <article className="tile reveal d1">
              <div className="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/></svg></div>
              <h3>Investor visa</h3>
              <p>Residency pathways through qualifying investment. We advise on programs and coordinate documentation with your advisors.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="platform">
            <div className="aurora-bg"><div className="blob b1" /><div className="blob b2" /></div>
            <div className="glow" />
            <div className="platform-inner">
              <div className="wrap split" style={{ padding: 0 }}>
                <div className="section-head reveal" style={{ maxWidth: "none", marginBottom: "36px" }}>
                  <span className="eyebrow on-ink"><span className="dot" /> Full-service support</span>
                  <h2>What every program includes.</h2>
                  <p className="lead">One service, structured to cover the full lifecycle of an application.</p>
                </div>
                <div className="platform-feats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "26px" }}>
                  {[
                    { title: "Eligibility assessment", text: "We confirm the right visa class — preventing category mismatch, a common cause of refusal." },
                    { title: "Document checklist", text: "A bespoke checklist for your destination, purpose and profile." },
                    { title: "Application & filing", text: "Embassy forms completed accurately, reviewed for coherence." },
                    { title: "Interview & biometrics", text: "Coaching and appointment scheduling so you arrive prepared." },
                    { title: "Status tracking", text: "Live progress at every stage, with full transparency." },
                    { title: "Post-submission support", text: "Updates, embassy queries and next-step guidance." },
                  ].map((feat, index) => (
                    <div key={feat.title} className={`pf reveal ${index === 1 ? "d1" : index === 2 ? "d2" : ""}`}>
                      <span className="pf-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></svg></span>
                      <div><b>{feat.title}</b><span>{feat.text}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" /> Popular destinations</span>
            <h2>Where our clients are <span className="grad">headed.</span></h2>
          </div>
          <div className="dest-grid">
            {[
              { emoji: "🇩🇪", title: "Germany", subtitle: "Work · Study" },
              { emoji: "🇦🇺", title: "Australia", subtitle: "Skilled · Study" },
              { emoji: "🇨🇦", title: "Canada", subtitle: "PR · Study" },
              { emoji: "🇬🇧", title: "United Kingdom", subtitle: "Skilled · Student" },
              { emoji: "🇳🇿", title: "New Zealand", subtitle: "Skilled · Visit" },
              { emoji: "🇮🇪", title: "Ireland", subtitle: "Study · Work" },
              { emoji: "🇸🇬", title: "Singapore", subtitle: "Work · Business" },
              { emoji: "🇪🇺", title: "Europe (Schengen)", subtitle: "Visit · Business" },
            ].map((dest, index) => (
              <a key={dest.title} className={`dest reveal ${index === 1 ? "d1" : index === 2 ? "d2" : index === 3 ? "d3" : ""}`} href="/contact">
                <span className="arw">↗</span>
                <span className="fl">{dest.emoji}</span>
                <b>{dest.title}</b>
                <small>{dest.subtitle}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "20px" }}>
        <div className="wrap">
          <div className="cta reveal"><div className="glow" /><div className="cta-in">
            <span className="eyebrow on-ink" style={{ marginInline: "auto" }}><span className="dot" /> Not sure which visa?</span>
            <h2>Check your eligibility in one call.</h2>
            <p>Tell us where you're headed and we'll come back with the routes that fit.</p>
            <div className="hero-cta"><a href="/contact" className="btn btn-grad btn-lg">Check your eligibility <span className="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a></div>
          </div></div>
        </div>
      </section>
    </main>
  );
}
