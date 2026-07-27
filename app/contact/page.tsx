"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <section className="page-hero">
        <div className="aurora-bg"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <div className="wrap">
          <div className="crumb reveal"><a href="/">Home</a> / Contact</div>
          <h1 className="reveal">Let's get you <span className="grad">stamped.</span></h1>
          <p className="reveal">Book your visa appointment or use the details below for a personalised consultation.</p>
        </div>
      </section>

      <section style={{ paddingTop: "30px" }}>
        <div className="wrap contact-grid">
          <div className="form-card reveal">
            <span className="eyebrow"><span className="dot" /> Send us a message</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: "8px" }}>Book your visa appointment.</h2>
            <p style={{ color: "var(--muted)", marginBottom: "22px" }}>Tell us where you're headed and we'll come back with the routes that fit.</p>
            <form
              className="form"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                event.currentTarget.reset();
              }}
            >
              <div className="row">
                <div className="field">
                  <label htmlFor="n">Your name</label>
                  <input id="n" type="text" placeholder="Full name" required />
                </div>
                <div className="field">
                  <label htmlFor="e">Email</label>
                  <input id="e" type="email" placeholder="you@email.com" required />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="p">Phone</label>
                  <input id="p" type="tel" placeholder="+91" />
                </div>
                <div className="field">
                  <label htmlFor="j">Job sector</label>
                  <input id="j" type="text" placeholder="e.g. Software, Healthcare" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="s">Preferred service</label>
                  <select id="s">
                    <option value="">Select a service</option>
                    <option>Work / Employment visa</option>
                    <option>Student visa</option>
                    <option>Visit / Tourist visa</option>
                    <option>Business visa</option>
                    <option>Investor visa</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c">Preferred country</label>
                  <input id="c" type="text" placeholder="e.g. Canada, Germany" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="m">Message</label>
                <textarea id="m" placeholder="Tell us a little about your plans…" />
              </div>
              <div>
                <button className="btn btn-grad btn-lg" type="submit">
                  Send message
                  <span className="ico">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
              {sent && (
                <div id="sent" className="sent-message">
                  ✓ Thanks — a consultant will be in touch shortly.
                </div>
              )}
            </form>
          </div>

          <div className="info-stack reveal d1">
            <div className="info-card">
              <div className="glow" />
              <div className="inner">
                <span className="eyebrow on-ink"><span className="dot" /> Get in touch</span>
                <div className="info-row">
                  <span className="i-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h5l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v5a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z"/></svg></span>
                  <div><small>Phone</small><span>+91 96181 44899</span></div>
                </div>
                <div className="info-row">
                  <span className="i-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg></span>
                  <div><small>Email</small><span>contact@visistavisas.com</span></div>
                </div>
                <div className="info-row">
                  <span className="i-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 22s8-6 8-12a8 8 0 1 0-16 0c0 6 8 12 8 12z"/><circle cx="12" cy="10" r="3"/></svg></span>
                  <div><small>Office</small><span>#302, Aditya Trade Center, Near Maithrivanam, Ameerpet, Hyderabad 500038</span></div>
                </div>
              </div>
            </div>

            <div className="office-grid">
              {[
                { title: "USA", text: "1200 W Walnut Hill Ln, Suite 3400, Irving, TX 75038" },
                { title: "UK", text: "200 Brook Drive, Green Park, Reading, RG2 6UB" },
                { title: "Europe", text: "Av. Eng. Arantes de Oliveira 3, Lisbon 1900-221" },
                { title: "Ireland", text: "51 Bracken Road, Dublin, D18 CV48" },
              ].map((office) => (
                <div key={office.title} className="office">
                  <b>{office.title}</b>
                  <p>{office.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
