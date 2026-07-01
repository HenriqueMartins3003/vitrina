"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";

interface Template {
  id: string;
  name: string;
  category: string;
  network: string;
  usageCount: number;
  color: string;
  emoji: string;
}

const categories = ["Todos", "Carrossel", "Post único", "Story", "Reels"];

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [cat, setCat] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setTemplates(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function useTemplate(id: string) {
    await fetch(`/api/templates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incrementUsage: true }),
    });
    setTemplates((t) => t.map((x) => (x.id === id ? { ...x, usageCount: x.usageCount + 1 } : x)));
  }

  const filtered = templates.filter((t) => cat === "Todos" || t.category === cat);

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

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>Carregando...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>✦</p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Nenhum template disponível</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {filtered.map((t) => (
              <div key={t.id} className="card" style={{ cursor: "pointer", transition: "border-color 0.15s", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                <div style={{ height: 3, background: t.color, borderRadius: "20px 20px 0 0", position: "absolute", top: 0, left: 0, right: 0 }} />
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{t.emoji}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t.name}</h3>
                  <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                    <span className={`tag ${t.network === "Instagram" ? "tag-purple" : "tag-teal"}`}>{t.network}</span>
                    <span className="tag tag-amber">{t.category}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>Usado {t.usageCount}x</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => useTemplate(t.id)}>Usar →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppShell>
  );
}
