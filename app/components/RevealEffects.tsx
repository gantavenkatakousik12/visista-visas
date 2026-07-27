"use client";

import { useEffect } from "react";

export default function RevealEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
