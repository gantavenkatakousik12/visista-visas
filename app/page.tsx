"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    const preloader = document.getElementById("preloader");
    const progress = document.getElementById("progress");
    const stickyCta = document.getElementById("stickyCta");
    const wa = document.getElementById("wa");
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const heroTitle = document.getElementById("heroTitle");
    const trackA = document.getElementById("trackA");
    const trackB = document.getElementById("trackB");
    const canvas = document.getElementById("constellation") as HTMLCanvasElement | null;

    const hidePreloader = () => {
      if (preloader) preloader.classList.add("done");
    };

    const onLoad = () => {
      setTimeout(hidePreloader, 500);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (progress) progress.style.width = max > 0 ? `${(doc.scrollTop / max) * 100}%` : "0";
      const past = window.scrollY > window.innerHeight * 0.9;
      const nearEnd = max > 0 ? doc.scrollTop / max > 0.92 : false;
      if (stickyCta) stickyCta.classList.toggle("show", past && !nearEnd);
      if (wa) wa.classList.toggle("show", past);
    };

    const setupHeadline = () => {
      if (!heroTitle || reduce) return;
      const html = heroTitle.innerHTML;
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      let out = "";
      let i = 0;
      const wrapText = (text: string) =>
        text
          .split(/(\s+)/)
          .map((chunk) => {
            if (/^\s+$/.test(chunk) || chunk === "") return chunk;
            const d = (i++ * 0.06 + 0.15).toFixed(2);
            return `<span class=\"word\"><i style=\"animation-delay:${d}s\">${chunk}</i></span>`;
          })
          .join("");
      tmp.childNodes.forEach((node) => {
        if (node.nodeType === 3) out += wrapText(node.textContent || "");
        else if (node.nodeName === "EM") out += `<em>${wrapText(node.textContent || "")}</em>`;
        else out += (node as HTMLElement).outerHTML;
      });
      heroTitle.innerHTML = out;
    };

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.target || "0");
      const comma = el.dataset.comma;
      let start: number | null = null;
      const dur = 1400;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = comma ? v.toLocaleString() : String(v);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = comma ? target.toLocaleString() : String(target);
      };
      requestAnimationFrame(step);
    };

    const createRevealObserver = () => {
      const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      if (!reduce) {
        const io = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in");
                entry.target.querySelectorAll<HTMLElement>(".count").forEach(countUp);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el, index) => {
          el.style.transitionDelay = `${(index % 4) * 60}ms`;
          io.observe(el);
        });
        return () => io.disconnect();
      }
      revealEls.forEach((el) => el.classList.add("in"));
      document.querySelectorAll<HTMLElement>(".count").forEach((el) => {
        const comma = el.dataset.comma;
        const target = Number(el.dataset.target || "0");
        el.textContent = comma ? target.toLocaleString() : String(target);
      });
      return () => {};
    };

    const setupHoverEffects = () => {
      if (!canHover) return;
      document.querySelectorAll<HTMLElement>(".glow").forEach((c) => {
        const mousemove = (e: MouseEvent) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", `${e.clientX - r.left}px`);
          c.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        c.addEventListener("mousemove", mousemove);
      });
      document.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${(-py * 9)}deg) translateY(-6px)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
      });
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((b) => {
        const move = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        };
        const leave = () => {
          b.style.transform = "";
        };
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
      });
    };

    const fillPhotoWall = () => {
      const A = [
        ["2h1", "ca", "Canada"],
        ["2h4", "gb", "United Kingdom"],
        ["2h6", "nz", "New Zealand"],
        ["2h2", "au", "Australia"],
      ];
      const B = [
        ["2h5", "de", "Germany"],
        ["2h2", "au", "Australia"],
        ["2h1", "us", "United States"],
        ["2h4", "gb", "United Kingdom"],
      ];
      const base = "https://www.visistavisas.com/wp-content/uploads/2024/05/service-";
      const ok =
        '<span class="ok"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5"/></svg></span>';
      const card = (d: string[]) =>
        `<figure class="pcard"><img src="${base + d[0]}.jpg" alt="Student, ${d[2]}" loading="lazy" onerror="this.parentNode.style.background='linear-gradient(160deg,#20386e,#0f1f45)'"><span class="tag">${ok}<img src="https://flagcdn.com/w80/${d[1]}.png" alt="">Approved · ${d[2]}</span></figure>`;
      const fill = (id: string, set: string[][]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = set.map(card).join("") + set.map(card).join("");
      };
      fill("trackA", A);
      fill("trackB", B);
    };

    const setupCanvas = () => {
      if (reduce || !canvas) return;
      const ctx = canvas.getContext("2d");
      const hero = canvas.parentElement;
      if (!ctx || !hero) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let W = 0;
      let H = 0;
      let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

      const resize = () => {
        W = hero.offsetWidth;
        H = hero.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(46, Math.round((W * H) / 26000));
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        }));
      };

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < nodes.length; i += 1) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
          for (let j = i + 1; j < nodes.length; j += 1) {
            const m = nodes[j];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 130) {
              ctx.strokeStyle = `rgba(27,77,228,${0.12 * (1 - d / 130)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }
          ctx.fillStyle = "rgba(27,77,228,.5)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(draw);
      };

      resize();
      draw();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    };

    setupHeadline();
    const cleanupReveal = createRevealObserver();
    setupHoverEffects();
    fillPhotoWall();
    const cleanupCanvas = setupCanvas();
    window.addEventListener("load", onLoad);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggleMenu = () => header?.classList.toggle("open");
    const closeMenu = () => header?.classList.remove("open");
    menuBtn?.addEventListener("click", toggleMenu);
    document.querySelectorAll<HTMLElement>(".navlinks a").forEach((a) => a.addEventListener("click", closeMenu));

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      menuBtn?.removeEventListener("click", toggleMenu);
      document.querySelectorAll<HTMLElement>(".navlinks a").forEach((a) => a.removeEventListener("click", closeMenu));
      cleanupReveal();
      if (cleanupCanvas) cleanupCanvas();
    };
  }, []);

  const hideImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
  };

  const fallbackLogo = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const span = document.createElement("span");
    span.style.fontWeight = "600";
    span.style.fontSize = "19px";
    span.textContent = "Visista Visas";
    e.currentTarget.replaceWith(span);
  };

  return (
    <>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div id="preloader">
        <div className="pl-inner">
          <div className="pl-ring">
            <svg viewBox="0 0 74 74">
              <circle className="bg" cx="37" cy="37" r="33" />
              <circle className="fg" cx="37" cy="37" r="33" />
            </svg>
            <div className="stamp">VV</div>
          </div>
          <div className="pl-word">Visista Visas</div>
        </div>
      </div>

      <div className="progress" id="progress" />

      <header id="header">
        <div className="wrap nav">
          <a href="#" className="brand">
            <img
              className="brand-logo"
              src="https://www.visistavisas.com/wp-content/uploads/2026/04/logo.svg"
              alt="Visista Visas"
              onError={fallbackLogo}
            />
          </a>
          <nav className="navlinks">
            <a href="#services">Services</a>
            <a href="#students">Students</a>
            <a href="#destinations">Destinations</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-right">
            <a href="#start" className="btn btn-primary" data-magnetic>
              Free assessment
            </a>
            <button className="menu-btn" id="menuBtn" aria-label="Menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <canvas id="constellation" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow load" style={{ animationDelay: ".05s" }}>
              Visa &amp; Immigration Consultants
            </span>
            <h1 id="heroTitle">Move abroad with a plan that <em>holds up.</em></h1>
            <p className="lead load" style={{ animationDelay: ".9s" }}>
              Study, work, or settle. We handle the paperwork, the deadlines, and the follow ups, so your application keeps moving and nothing gets lost.
            </p>
            <div className="hero-cta load" style={{ animationDelay: "1.02s" }}>
              <a href="#start" className="btn btn-primary" data-magnetic>
                Book a free assessment
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#process" className="btn btn-ghost">
                See how it works
              </a>
            </div>
            <div className="hero-trust load" style={{ animationDelay: "1.14s" }}>
              <div className="avatars">
                <span className="a1">PS</span>
                <span className="a2">DM</span>
                <span className="a3">AK</span>
                <span className="a4">+</span>
              </div>
              <p>
                <b>500+ approvals filed</b> this year across 40 countries.
              </p>
            </div>
          </div>

          <div className="wall load" style={{ animationDelay: ".5s" }}>
            <div className="wall-cols">
              <div className="pcol">
                <div className="track" id="trackA" />
              </div>
              <div className="pcol down">
                <div className="track" id="trackB" />
              </div>
            </div>
            <div className="wall-live">
              <span className="pulse" />
              <div>
                <div className="n">500+</div>
                <div className="l">approvals this year</div>
              </div>
            </div>
            <div className="wall-stamp">
              <span>
                <b>98%</b>
                <small>Approved</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mrz-band" aria-hidden="true">
        <div className="row">
          <span>P&lt;INDVISISTA&lt;VISAS&lt;&lt;GLOBAL&lt;MOBILITY&lt;&lt;&lt;CA&lt;AU&lt;UK&lt;US&lt;DE&lt;NZ&lt;&lt;&lt;</span>
          <span>P&lt;INDVISISTA&lt;VISAS&lt;&lt;GLOBAL&lt;MOBILITY&lt;&lt;&lt;CA&lt;AU&lt;UK&lt;US&lt;DE&lt;NZ&lt;&lt;&lt;</span>
          <span>P&lt;INDVISISTA&lt;VISAS&lt;&lt;GLOBAL&lt;MOBILITY&lt;&lt;&lt;CA&lt;AU&lt;UK&lt;US&lt;DE&lt;NZ&lt;&lt;&lt;</span>
        </div>
      </div>

      <div className="marquee-sec">
        <div className="wrap">
          <p className="marquee-head">Routes we file every week</p>
        </div>
        <div className="marquee">
          <ul>
            <li>
              <img src="https://flagcdn.com/w80/ca.png" alt="" />Canada
            </li>
            <li>
              <img src="https://flagcdn.com/w80/au.png" alt="" />Australia
            </li>
            <li>
              <img src="https://flagcdn.com/w80/gb.png" alt="" />United Kingdom
            </li>
            <li>
              <img src="https://flagcdn.com/w80/us.png" alt="" />United States
            </li>
            <li>
              <img src="https://flagcdn.com/w80/de.png" alt="" />Germany
            </li>
            <li>
              <img src="https://flagcdn.com/w80/nz.png" alt="" />New Zealand
            </li>
            <li>
              <img src="https://flagcdn.com/w80/ie.png" alt="" />Ireland
            </li>
            <li>
              <img src="https://flagcdn.com/w80/nl.png" alt="" />Netherlands
            </li>
          </ul>
          <ul aria-hidden="true">
            <li>
              <img src="https://flagcdn.com/w80/ca.png" alt="" />Canada
            </li>
            <li>
              <img src="https://flagcdn.com/w80/au.png" alt="" />Australia
            </li>
            <li>
              <img src="https://flagcdn.com/w80/gb.png" alt="" />United Kingdom
            </li>
            <li>
              <img src="https://flagcdn.com/w80/us.png" alt="" />United States
            </li>
            <li>
              <img src="https://flagcdn.com/w80/de.png" alt="" />Germany
            </li>
            <li>
              <img src="https://flagcdn.com/w80/nz.png" alt="" />New Zealand
            </li>
            <li>
              <img src="https://flagcdn.com/w80/ie.png" alt="" />Ireland
            </li>
            <li>
              <img src="https://flagcdn.com/w80/nl.png" alt="" />Netherlands
            </li>
          </ul>
        </div>
      </div>

      <section className="stats section">
        <div className="wrap">
          <div className="stat reveal">
            <div className="n">
              <span className="count" data-target="11">
                0
              </span>
              <b> yrs</b>
            </div>
            <div className="l">Guiding applicants since 2014.</div>
          </div>
          <div className="stat reveal">
            <div className="n">
              <span className="count" data-target="12400" data-comma="1">
                0
              </span>
            </div>
            <div className="l">Visas approved and counting.</div>
          </div>
          <div className="stat reveal">
            <div className="n">
              <span className="count" data-target="40">
                0
              </span>
              <b>+</b>
            </div>
            <div className="l">Destination countries covered.</div>
          </div>
          <div className="stat reveal">
            <div className="n">
              <span className="count" data-target="98">
                0
              </span>
              <b>%</b>
            </div>
            <div className="l">Of complete files we submit get approved.</div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow reveal">What we handle</span>
              <h2 className="h2 reveal" style={{ marginTop: "16px" }}>
                Every visa route, one team that owns it.
              </h2>
            </div>
            <p className="lead reveal">
              Pick the goal, not the form number. We map your profile to the route with the best real chance, then file it properly the first time.
            </p>
          </div>
          <div className="cards">
            <div className="card glow reveal">
              <span className="code">01</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 10L12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c0 1 3 2.5 6 2.5S18 18 18 17v-5" />
                </svg>
              </div>
              <h3>Study visas</h3>
              <p>University admissions, statements of purpose, and student visas, prepared to convince the visa officer.</p>
            </div>
            <div className="card glow reveal">
              <span className="code">02</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </div>
              <h3>Skilled &amp; work visas</h3>
              <p>Points based migration, employer sponsorship, and work permits, scored and structured to pass.</p>
            </div>
            <div className="card glow reveal">
              <span className="code">03</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <h3>Permanent residency</h3>
              <p>PR and settlement pathways mapped to your profile, with the timeline laid out from day one.</p>
            </div>
            <div className="card glow reveal">
              <span className="code">04</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21V9l9-6 9 6v12" />
                  <path d="M9 21v-8h6v8" />
                  <path d="M12 7v.01" />
                </svg>
              </div>
              <h3>Business &amp; investor</h3>
              <p>Startup, investor, and entrepreneur visas, backed by a plan the authorities take seriously.</p>
            </div>
            <div className="card glow reveal">
              <span className="code">05</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M2.5 20a6.5 6.5 0 0113 0" />
                  <path d="M16 4.5a3.2 3.2 0 010 6.5M21.5 20a6.5 6.5 0 00-5-6.3" />
                </svg>
              </div>
              <h3>Family &amp; spouse</h3>
              <p>Partner, dependent, and family reunion applications, evidenced the way officers expect to see them.</p>
            </div>
            <div className="card glow reveal">
              <span className="code">06</span>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
                </svg>
              </div>
              <h3>Visitor &amp; tourist</h3>
              <p>Short stay and tourist visas, prepared to clear on the first attempt without the back and forth.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="study section" id="students">
        <div className="wrap study-grid">
          <div>
            <span className="eyebrow reveal">For students</span>
            <h2 className="reveal">Your degree abroad, sorted from offer to visa.</h2>
            <p className="lead reveal">
              Choosing the right university and getting the student visa are two halves of the same job. We do both together, so one never holds up the other.
            </p>
            <ul>
              <li className="reveal">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                University shortlisting and applications
              </li>
              <li className="reveal">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                A statement of purpose that sounds like you
              </li>
              <li className="reveal">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Financial documents prepared the right way
              </li>
              <li className="reveal">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Visa interview coaching before the big day
              </li>
            </ul>
            <a href="#start" className="btn btn-primary reveal" data-magnetic>
              Talk to a student advisor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className="collage reveal">
            <figure>
              <img
                src="https://www.visistavisas.com/wp-content/uploads/2024/05/service-2h2.jpg"
                alt="International student"
                loading="lazy"
                onError={hideImage}
              />
            </figure>
            <figure>
              <img
                src="https://www.visistavisas.com/wp-content/uploads/2024/05/service-2h4.jpg"
                alt="Students on campus"
                loading="lazy"
                onError={hideImage}
              />
            </figure>
            <figure>
              <img
                src="https://www.visistavisas.com/wp-content/uploads/2024/05/service-2h5.jpg"
                alt="Graduate student"
                loading="lazy"
                onError={hideImage}
              />
            </figure>
            <figure>
              <img
                src="https://www.visistavisas.com/wp-content/uploads/2024/05/service-2h6.jpg"
                alt="Student abroad"
                loading="lazy"
                onError={hideImage}
              />
            </figure>
            <div className="badge">
              <div className="n">2,000+</div>
              <div className="l">students placed</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="destinations">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow reveal">Where we send people</span>
              <h2 className="h2 reveal" style={{ marginTop: "16px" }}>
                Countries we know inside out.
              </h2>
            </div>
            <p className="lead reveal">
              We track the rules that change quietly, the ones that catch people out. Here is where our applicants land most.
            </p>
          </div>
          <div className="dest">
            <a className="tile t-ca tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/ca.png" alt="Canada flag" />
              <div className="code">CA · EXPRESS ENTRY</div>
              <h3>Canada</h3>
            </a>
            <a className="tile t-au tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/au.png" alt="Australia flag" />
              <div className="code">AU · SKILLED 189</div>
              <h3>Australia</h3>
            </a>
            <a className="tile t-uk tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/gb.png" alt="UK flag" />
              <div className="code">UK · SKILLED WORKER</div>
              <h3>United Kingdom</h3>
            </a>
            <a className="tile t-us tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/us.png" alt="US flag" />
              <div className="code">US · H-1B / EB</div>
              <h3>United States</h3>
            </a>
            <a className="tile t-de tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/de.png" alt="Germany flag" />
              <div className="code">DE · OPPORTUNITY CARD</div>
              <h3>Germany</h3>
            </a>
            <a className="tile t-nz tilt reveal" href="#start">
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </div>
              <img className="flag" src="https://flagcdn.com/w160/nz.png" alt="New Zealand flag" />
              <div className="code">NZ · SKILLED MIGRANT</div>
              <h3>New Zealand</h3>
            </a>
          </div>
        </div>
      </section>

      <section className="study section" id="process" style={{ background: "var(--mist)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow reveal">How it works</span>
              <h2 className="h2 reveal" style={{ marginTop: "16px" }}>
                Four steps, no surprises.
              </h2>
            </div>
            <p className="lead reveal">
              You always know what stage you are at and what happens next. We do the chasing so you do not have to.
            </p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="num">01</div>
              <div className="dot-line" />
              <h3>Free assessment</h3>
              <p>We check your profile against real eligibility rules and tell you straight what will and will not work.</p>
            </div>
            <div className="step reveal">
              <div className="num">02</div>
              <div className="dot-line" />
              <h3>Documents &amp; drafting</h3>
              <p>We build the file: forms, letters, and evidence, each one checked twice before it goes anywhere.</p>
            </div>
            <div className="step reveal">
              <div className="num">03</div>
              <div className="dot-line" />
              <h3>Submission</h3>
              <p>We file it correctly, pay the right fees, and track every step with the authority until a decision.</p>
            </div>
            <div className="step reveal">
              <div className="num">04</div>
              <div className="dot-line" />
              <h3>Decision &amp; landing</h3>
              <p>We prep you for the outcome, the interview if there is one, and the move that comes after.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why section">
        <div className="wrap why-grid">
          <div>
            <span className="eyebrow reveal">Why applicants stay with us</span>
            <h2 className="reveal" style={{ marginTop: "18px" }}>
              Straight answers, never a sales pitch.
            </h2>
            <p className="lead reveal" style={{ color: "rgba(255,255,255,.62)", marginTop: "20px", maxWidth: "340px" }}>
              We would rather turn away a case than take your fee for a route that was never going to work.
            </p>
          </div>
          <div className="principles">
            <div className="principle reveal">
              <div className="p-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3>We only take cases we believe in.</h3>
                <p>If a route will not work for you, you hear it on the first call. No false hope, no fees for a dead end.</p>
              </div>
            </div>
            <div className="principle reveal">
              <div className="p-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0116 0" />
                </svg>
              </div>
              <div>
                <h3>Senior consultants, start to finish.</h3>
                <p>You work with the same licensed consultant the whole way. No handoffs to a call centre halfway through.</p>
              </div>
            </div>
            <div className="principle reveal">
              <div className="p-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div>
                <h3>Fixed fees, told upfront.</h3>
                <p>You get the full cost before you commit, in writing. What we quote is what you pay, right through to the decision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow reveal">In their words</span>
              <h2 className="h2 reveal" style={{ marginTop: "16px" }}>
                People who made the move.
              </h2>
            </div>
            <p className="lead reveal">A few of the applicants who trusted us with the paperwork, and where they ended up.</p>
          </div>
          <div className="quotes">
            <div className="quote reveal">
              <div className="qm">“</div>
              <p>They told me my first plan would not pass, then rebuilt it from scratch. Approved in four months.</p>
              <div className="who">
                <span className="a1">PS</span>
                <div>
                  <div className="name">Priya S.</div>
                  <div className="role">Software engineer, moved to Canada</div>
                </div>
              </div>
            </div>
            <div className="quote reveal">
              <div className="qm">“</div>
              <p>Every document was ready before I even thought to ask. The visa interview felt like a formality.</p>
              <div className="who">
                <span className="a3">DM</span>
                <div>
                  <div className="name">Daniel M.</div>
                  <div className="role">Nurse, moved to Australia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq" style={{ background: "var(--mist)" }}>
        <div className="wrap faq-grid">
          <div>
            <span className="eyebrow reveal">Straight answers</span>
            <h2 className="h2 reveal" style={{ marginTop: "16px" }}>
              Questions people ask first.
            </h2>
            <p className="lead reveal" style={{ marginTop: "18px" }}>
              Still unsure about your case? Ask us directly in the free assessment.
            </p>
          </div>
          <div className="faq-list">
            <details className="faq-item reveal" open>
              <summary>
                How long does a visa application take?
                <span className="plus" />
              </summary>
              <div className="ans">
                It depends on the country and route, from a few weeks for visitor visas to several months for skilled migration. On the first call we give you a realistic timeline for your specific case, not a best case that never happens.
              </div>
            </details>
            <details className="faq-item reveal">
              <summary>
                Do you guarantee approval?
                <span className="plus" />
              </summary>
              <div className="ans">
                No honest consultant can guarantee a government decision. What we can do is make sure your file is complete, accurate, and built on a route you actually qualify for, which is why 98% of the complete files we submit get approved.
              </div>
            </details>
            <details className="faq-item reveal">
              <summary>
                Can you help if I was refused before?
                <span className="plus" />
              </summary>
              <div className="ans">
                Yes. We review the refusal letter to understand exactly why it happened, then rebuild the application around that, or advise a different route if the original one was never a fit.
              </div>
            </details>
            <details className="faq-item reveal">
              <summary>
                Which countries do you cover?
                <span className="plus" />
              </summary>
              <div className="ans">
                More than 40 destinations. Canada, Australia, the UK, the US, Germany, and New Zealand are our most common routes, and we handle Ireland, the Netherlands, and others regularly.
              </div>
            </details>
            <details className="faq-item reveal">
              <summary>
                What does the free assessment include?
                <span className="plus" />
              </summary>
              <div className="ans">
                A real look at your profile against current eligibility rules, the routes worth pursuing, a rough timeline, and a fixed quote. No obligation, and no pressure to sign anything.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section" id="start">
        <div className="wrap cta-grid">
          <div className="cta-left">
            <span className="eyebrow reveal">Start here</span>
            <h2 className="reveal" style={{ marginTop: "16px" }}>
              Tell us where you <em>want to go.</em>
            </h2>
            <p className="lead reveal">
              Send a few details and a licensed consultant will come back within one working day with your options.
            </p>
            <div className="cta-contact reveal">
              <a href="tel:+17364528200">
                <span className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.5-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
                  </svg>
                </span>
                +1 736 452 8200
              </a>
              <a href="mailto:hello@visistavisas.com">
                <span className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 6l10 7 10-7" />
                  </svg>
                </span>
                hello@visistavisas.com
              </a>
            </div>
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="reveal">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="+1 000 000 0000" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="dest">Where do you want to go?</label>
              <select id="dest">
                <option value="">Select a destination</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Germany</option>
                <option>New Zealand</option>
                <option>Somewhere else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="msg">Anything we should know?</label>
              <textarea id="msg" placeholder="Your goal, timeline, or current visa status" />
            </div>
            <button className="btn btn-primary" data-magnetic>
              Start my assessment
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="form-note">Free, no obligation. We reply within one working day.</p>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <img
                className="foot-logo"
                src="https://www.visistavisas.com/wp-content/uploads/2026/04/logo.svg"
                alt="Visista Visas"
                onError={fallbackLogo}
              />
              <p>
                Licensed visa and immigration consultants helping students, professionals, and families move with confidence.
              </p>
              <div className="socials">
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5A1.94 1.94 0 113 5a1.94 1.94 0 013.94 0zM3.2 8.5h3.5V21H3.2zM10 8.5h3.35v1.7h.05a3.67 3.67 0 013.3-1.8c3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-5.5c0-1.3 0-3-1.83-3s-2.1 1.42-2.1 2.9V21H10z" />
                  </svg>
                </a>
                <a href="#" aria-label="X">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2h3.3l-7.2 8.3L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.9L2 2h6.8l4.7 6.2zm-1.2 18h1.8L7.2 3.9H5.3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <a href="#services">Study visas</a>
              <a href="#services">Skilled &amp; work</a>
              <a href="#services">Permanent residency</a>
              <a href="#services">Business &amp; investor</a>
            </div>
            <div className="foot-col">
              <h4>Destinations</h4>
              <a href="#destinations">Canada</a>
              <a href="#destinations">Australia</a>
              <a href="#destinations">United Kingdom</a>
              <a href="#destinations">United States</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#process">How it works</a>
              <a href="#faq">FAQ</a>
              <a href="#start">Free assessment</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="foot-word">
            VISISTA<span>VISAS</span>
          </div>
          <div className="foot-bottom">
            <span>&copy; 2026 Visista Visas. All rights reserved.</span>
            <span className="mono">LICENSED IMMIGRATION CONSULTANTS · EST. 2014</span>
          </div>
        </div>
      </footer>

      <div className="sticky-cta" id="stickyCta">
        <div className="txt">
          <b>Ready to move?</b>
          <small>Free assessment, reply in one day</small>
        </div>
        <a href="#start" className="btn btn-primary" data-magnetic>
          Get started
        </a>
      </div>
      <a className="wa" id="wa" href="https://wa.me/918686862349" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.611-.808-2.665-1.431-3.92-3.205-.529-.851.529-.77 1.585-2.368.088-.149.044-.289-.027-.404-.071-.144-.671-1.612-.92-2.207-.241-.589-.487-.551-.67-.56-.173-.009-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.017-1.04 1.655 0 1.638 1.065 3.09 1.215 3.287.149.198 2.095 3.2 5.076 4.487 1.912.829 2.71.904 3.685.76.588-.074 1.81-.738 2.065-1.45.252-.712.252-1.149.177-1.26-.074-.112-.272-.175-.57-.289z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.149.547 4.269 1.584 6.158L0 24l6.158-1.584C7.73 23.453 9.85 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity="0.1"/>
        </svg>
      </a>
    </>
  );
}
