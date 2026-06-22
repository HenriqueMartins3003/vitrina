"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";

const categories = ["Todos", "Carrossel", "Post único", "Story", "Reels"];

const templates = [
  { id: 1, name: "Dica rápida", cat: "Carrossel", net: "Instagram", uses: 12, color: "var(--purple)", emoji: "💡" },
  { id: 2, name: "Prova social", cat: "Post único", net: "Instagram", uses: 8, color: "var(--teal)", emoji: "⭐" },
  { id: 3, name: "Trend sonoro", cat: "Reels", net: "TikTok", uses: 5, color: "var(--teal)", emoji: "🎵" },
  { id: 4, name: "Oferta relâmpago", cat: "Story", net: "Instagram", uses: 9, color: "var(--amber)", emoji: "🔥" },
  { id: 5, name: "Antes e depois", cat: "Carrossel", net: "Instagram", uses: 7, color: "var(--purple)", emoji: "✨" },
  { id: 6, name: "3 erros comuns", cat: "Carrossel", net: "Instagram", uses: 11, color: "var(--purple)", emoji: "🚫" },
  { id: 7, name: "POV trending", cat: "Reels", net: "TikTok", uses: 6, color: "var(--teal)", emoji: "👁" },
  { id: 8, name: "Depoimento cliente", cat: "Post único", net: "Instagram", uses: 4, color: "var(--green)", emoji: "💬" },
  { id: 9, name: "Bastidores", cat: "Story", net: "Instagram", uses: 3, color: "var(--amber)", emoji: "🎬" },
];

export default function Templates() {
  const [cat, setCat] = useState("Todos");
  const filtered = templates.filter((t) => cat === "Todos" || t.cat === cat);

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 1000 }}>

        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>Biblioteca</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>Templates de conteúdo</h1>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Formatos testados e aprovados para o seu negócio.</p>
          </div>
          <button className="btn btn-primary">+ Solicitar template</button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button key={c} className={`filter-chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {filtered.map((t) => (
            <div key={t.id} className="card" style={{ cursor: "pointer", transition: "border-color 0.15s", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              {/* Color top bar */}
              <div style={{ height: 3, background: t.color, borderRadius: "20px 20px 0 0", position: "absolute", top: 0, left: 0, right: 0 }} />
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{t.emoji}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t.name}</h3>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  <span className={`tag ${t.net === "Instagram" ? "tag-purple" : "tag-teal"}`}>{t.net}</span>
                  <span className="tag tag-amber">{t.cat}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>Usado {t.uses}x</span>
                  <button className="btn btn-ghost btn-sm">Usar →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppShell>
  );
}
