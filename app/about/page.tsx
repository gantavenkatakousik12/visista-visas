export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="aurora-bg"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <div className="wrap">
          <div className="crumb reveal"><a href="/">Home</a> / About</div>
          <h1 className="reveal">The team behind <span className="grad">every approval.</span></h1>
          <p className="reveal">A leading visa & immigration consultancy in Hyderabad — helping people study, work and settle abroad since 2016.</p>
        </div>
      </section>

      <section style={{ paddingTop: "30px" }}>
        <div className="wrap split">
          <div className="visual-card reveal">
            <div className="dash" style={{ width: "82%", background: "rgba(255,255,255,.06)" }}>
              <div className="dash-top"><div className="tabs"><span className="on">Since 2016</span></div></div>
              <div className="metric" style={{ background: "rgba(255,255,255,.06)" }}>
                <div className="m-top"><small>Trusted customers</small><span className="up">▲</span></div>
                <div className="m-num" style={{ fontSize: "2.4rem" }}>15k+</div>
                <div className="bar"><i style={{ width: "90%" }} /></div>
              </div>
            </div>
            <div className="badge"><div className="n grad">9+</div><small>Years of practice</small></div>
          </div>

          <div className="reveal d1">
            <span className="eyebrow"><span className="dot" /> About Visista</span>
            <h2>An experienced visa consulting firm.</h2>
            <p className="lead">Visista Visas is your trusted partner for student, work and immigration visas — delivering expert guidance and seamless access to global opportunities.</p>
            <p style={{ color: "var(--muted)" }}>We specialise in student, work, family and business immigration. With a strong success rate and a client-focused approach, we keep the process transparent, reliable and fast.</p>
            <ul className="feat-list">
              <li><span className="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span><div><b>Experienced professionals</b><span>Consultants who've handled thousands of cases.</span></div></li>
              <li><span className="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span><div><b>Transparent process</b><span>You always know the stage your case is at.</span></div></li>
              <li><span className="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span><div><b>Trusted worldwide</b><span>A destination network across 50+ countries.</span></div></li>
              <li><span className="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span><div><b>Client-centric</b><span>Your goals set the pathway, not our defaults.</span></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "20px" }}>
        <div className="wrap">
          <div className="glass" style={{ padding: "44px 30px" }}>
            <div className="stat-row">
              <div className="stat reveal"><div className="n grad">5k+</div><small>Visa approvals</small></div>
              <div className="stat reveal d1"><div className="n grad">38k+</div><small>Consultations</small></div>
              <div className="stat reveal d2"><div className="n grad">25+</div><small>Visa categories</small></div>
              <div className="stat reveal d3"><div className="n grad">80+</div><small>Consultants</small></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: "820px", textAlign: "center" }}>
          <div className="section-head center reveal" style={{ marginBottom: "20px" }}>
            <span className="eyebrow" style={{ marginInline: "auto" }}><span className="dot" /> Our practice</span>
            <h2>Trusted consultants in <span className="grad">Hyderabad.</span></h2>
          </div>
          <p className="lead reveal">Our experienced consultants provide end-to-end assistance — profile evaluation, documentation support, application processing and interview preparation. Whether you're planning to study in Canada, Australia, the UK or the USA, or looking for overseas work, we build immigration solutions tailored to your goals.</p>
        </div>
      </section>

      <section style={{ paddingTop: "10px" }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow" style={{ marginInline: "auto" }}><span className="dot" /> Meet our team</span>
            <h2>Immigration experts, in person.</h2>
          </div>
          <div className="team-grid">
            <div className="member reveal"><div className="ph">SR</div><div className="role">Chief Executive</div><h3>Mr. Sikharam Sri Ranga Rao</h3><p>Founder and CEO, steering Visista's mission across nine years of practice.</p></div>
            <div className="member reveal d1"><div className="ph">NL</div><div className="role">Head of Immigration</div><h3>Mr. Narahari Lakshmi Kanth</h3><p>Leads casework and documentation, keeping every file to embassy standard.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow" style={{ marginInline: "auto" }}><span className="dot" /> FAQ</span>
            <h2>Frequently asked questions.</h2>
          </div>
          <div className="faq reveal">
            <details open><summary>What services does Visista Visas provide?</summary><p>Complete visa assistance including student, work, business, tourist and family visas — with end-to-end support from eligibility to decision.</p></details>
            <details><summary>How long does the visa process take?</summary><p>It depends on the visa type and destination. After your assessment we give a realistic timeline for your specific case, and keep you updated at every stage.</p></details>
            <details><summary>What documents are required?</summary><p>We generate a bespoke checklist based on your destination, purpose and profile — typically passport, financials, travel history and purpose-specific proof.</p></details>
            <details><summary>How do I get started?</summary><p>Book a free assessment. We evaluate your profile, confirm the routes that fit, and map out the next steps together.</p></details>
          </div>
        </div>
      </section>
    </main>
  );
}
