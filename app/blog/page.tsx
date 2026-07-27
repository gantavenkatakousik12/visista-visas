export default function BlogPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="aurora-bg"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <div className="wrap">
          <div className="crumb reveal"><a href="/">Home</a> / Blog</div>
          <h1 className="reveal">Notes from <span className="grad">the border.</span></h1>
          <p className="reveal">Policy updates, study-abroad guidance and the moving parts of immigration — explained plainly.</p>
        </div>
      </section>

      <section style={{ paddingTop: "30px" }}>
        <div className="wrap">
          <div className="posts">
            {[
              {
                category: "Study visa",
                day: "31",
                month: "Aug",
                title: "Human rights and study-visa programs",
                meta: "By Visista · 2 comments",
              },
              {
                category: "Australia",
                day: "31",
                month: "Aug",
                title: "Reasons for Australian student-visa refusal",
                meta: "By Visista · No comments",
              },
              {
                category: "Employment",
                day: "28",
                month: "Aug",
                title: "Employment insurance for foreign nationals",
                meta: "By Visista · 2 comments",
              },
              {
                category: "Policy",
                day: "27",
                month: "Aug",
                title: "Impact of COVID-19 on the immigration system",
                meta: "By Visista · No comments",
              },
              {
                category: "Fees",
                day: "27",
                month: "Aug",
                title: "Visa application fee increases explained",
                meta: "By Visista · No comments",
              },
              {
                category: "Canada",
                day: "27",
                month: "Aug",
                title: "Top 25 most in-demand jobs in Canada",
                meta: "By Visista · 1 comment",
              },
            ].map((post, index) => (
              <article key={post.title} className={`post reveal ${index % 3 === 1 ? "d1" : index % 3 === 2 ? "d2" : ""}`}>
                <div className="thumb">
                  <div className="mglow" />
                  <span className="cat">{post.category}</span>
                  <div className="date"><b>{post.day}</b><small>{post.month}</small></div>
                </div>
                <div className="body">
                  <div className="meta">{post.meta}</div>
                  <h3>{post.title}</h3>
                  <p>The most relevant update and guidance for applicants navigating this visa category.</p>
                  <a className="more" href="#">Read more →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "20px" }}>
        <div className="wrap">
          <div className="cta reveal">
            <div className="glow" />
            <div className="cta-in">
              <span className="eyebrow on-ink" style={{ marginInline: "auto" }}><span className="dot" /> Stay in the loop</span>
              <h2>Get visa updates that actually matter.</h2>
              <p>No spam — just the policy changes and deadlines that affect your pathway.</p>
              <div className="hero-cta"><a href="/contact" className="btn btn-grad btn-lg">Subscribe for updates <span className="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
