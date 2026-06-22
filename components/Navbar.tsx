"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-700 text-xl tracking-tight">
          <span style={{ color: "#22c55e" }}>v</span>
          <span style={{ color: "#f9fafb" }}>itrina</span>
        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#como-funciona"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Como funciona
          </a>
          <a
            href="#planos"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Planos
          </a>
          <a
            href="#faq"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA */}
        <a
          href="#planos"
          className="btn-primary"
          style={{ padding: "10px 20px", fontSize: "13px", animation: "none" }}
        >
          Começar agora
        </a>
      </div>
    </nav>
  );
}
