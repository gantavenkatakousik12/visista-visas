"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Visa Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((current) => !current);
  const closeMenu = () => setOpen(false);

  return (
    <header id="header">
      <div className="wrap nav">
        <Link href="/" className="brand" onClick={closeMenu}>
          <img
            className="brand-logo"
            src="https://www.visistavisas.com/wp-content/uploads/2026/04/logo.svg"
            alt="Visista Visas"
            onError={(event) => {
              const target = event.currentTarget as HTMLImageElement;
              const span = document.createElement("span");
              span.style.fontWeight = "600";
              span.style.fontSize = "19px";
              span.textContent = "Visista Visas";
              target.replaceWith(span);
            }}
          />
        </Link>

        <nav className={`navlinks${open ? " open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <a href="tel:+919618144899" className="btn btn-ghost">
            +91 96181 44899
          </a>
          <Link href="/contact" className="btn btn-primary" onClick={closeMenu}>
            Free assessment
          </Link>
          <button className="menu-btn" type="button" aria-label="Menu" onClick={toggleOpen}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
