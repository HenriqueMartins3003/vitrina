"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`lp-nav${stuck ? " stuck" : ""}`}>
      <div className="lp-nav-inner">
        <a href="#" className="lp-logo">
          Vitrina<span className="lp-logo-dot" />
        </a>
        <ul className="lp-nav-links">
          <li><a href="#como-funciona">Como funciona</a></li>
          <li><a href="#planos">Planos</a></li>
          <li><a href="#garantia">Garantia</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/login" style={{ color: "var(--lp-muted)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--lp-text)"} onMouseLeave={e => e.currentTarget.style.color = "var(--lp-muted)"}>Entrar</a>
          <a href="#planos" className="lp-nav-btn">Começar agora →</a>
        </div>
      </div>
    </nav>
  );
}
