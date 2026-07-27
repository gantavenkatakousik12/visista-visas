export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="glow" />
      <div className="foot-main wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href="/">
              <span className="logo">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 13l5 5L21 5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Visista
            </a>
            <p>Helping individuals build international careers and education pathways — every step of the way.</p>
            <div className="foot-contact">
              <a href="mailto:contact@visistavisas.com">contact@visistavisas.com</a>
              <a href="tel:+919618144899">+91 96181 44899</a>
            </div>
            <div className="socials">
              <a href="#" aria-label="Twitter">&#120143;</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Instagram">&#9678;</a>
            </div>
          </div>

          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Visa Programs</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Employment</h4>
            <ul>
              <li><a href="/contact">USA</a></li>
              <li><a href="/contact">Europe</a></li>
              <li><a href="/contact">Australia</a></li>
              <li><a href="/contact">Ireland</a></li>
              <li><a href="/contact">Dubai</a></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Programs</h4>
            <ul>
              <li><a href="/services">Visit visas</a></li>
              <li><a href="/services">Tourist visas</a></li>
              <li><a href="/services">Business visas</a></li>
              <li><a href="/services">Student visas</a></li>
              <li><a href="/services">Work visas</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-legal">
          <span>© 2026 Visista Visas · All rights reserved</span>
          <span>Privacy Policy · Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}
