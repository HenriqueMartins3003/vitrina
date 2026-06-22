"use client";
import { useState } from "react";
import AppShell from "../../components/AppShell";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH = "Junho 2026";

// Grid: 30 days of June 2026, starts on Monday (index 1)
const START_OFFSET = 1; // June 1 = Monday
const TOTAL_DAYS = 30;

type Post = { title: string; net: "ig" | "tt" | "pending"; time: string };

const posts: Record<number, Post[]> = {
  2:  [{ title: "Dica #1", net: "ig", time: "10:00" }],
  3:  [{ title: "Trend POV", net: "tt", time: "19:00" }],
  5:  [{ title: "Prova social", net: "ig", time: "12:00" }, { title: "Bastidores", net: "ig", time: "18:00" }],
  7:  [{ title: "3 erros comuns", net: "ig", time: "10:00" }],
  9:  [{ title: "Oferta relâmpago", net: "tt", time: "20:00" }],
  10: [{ title: "Resultado cliente", net: "ig", time: "10:00" }],
  12: [{ title: "Dica rápida #2", net: "ig", time: "12:00" }],
  14: [{ title: "Carrossel produto", net: "pending", time: "10:00" }],
  15: [{ title: "Reel trend", net: "pending", time: "19:00" }],
  16: [{ title: "Post destaque", net: "pending", time: "10:00" }],
  17: [{ title: "Story promoção", net: "pending", time: "09:00" }],
  18: [{ title: "3 erros #2", net: "pending", time: "20:00" }],
  19: [{ title: "Carrossel planos", net: "pending", time: "10:00" }],
  21: [{ title: "Dica #4", net: "ig", time: "11:00" }],
  23: [{ title: "Depoimento", net: "ig", time: "12:00" }],
  24: [{ title: "Antes/depois", net: "tt", time: "19:00" }],
  26: [{ title: "Oferta semana", net: "ig", time: "10:00" }],
  28: [{ title: "Bastidores #2", net: "ig", time: "09:00" }],
  30: [{ title: "Recap mês", net: "ig", time: "12:00" }],
};

const upcoming = [
  { day: "Hoje", date: "12 Jun", time: "18:00", title: "Dica rápida #3", net: "Instagram", netTag: "tag-purple" },
  { day: "Amanhã", date: "13 Jun", time: "10:00", title: "Carrossel produto", net: "Instagram", netTag: "tag-purple" },
  { day: "Amanhã", date: "13 Jun", time: "19:00", title: "Reel trend", net: "TikTok", netTag: "tag-teal" },
  { day: "Sex", date: "14 Jun", time: "10:00", title: "Post destaque", net: "Instagram", netTag: "tag-purple" },
  { day: "Sáb", date: "15 Jun", time: "09:00", title: "Story promoção", net: "Instagram", netTag: "tag-purple" },
];

export default function Agendamento() {
  const [selected, setSelected] = useState<number | null>(null);

  // Build calendar cells (offset + days)
  const cells: (number | null)[] = [
    ...Array(START_OFFSET).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedPosts = selected ? posts[selected] || [] : [];

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>Calendário editorial</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>Agendamento</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Visualize e gerencie todas as publicações do mês.</p>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
          {[
            { label: "Instagram", cls: "ig" },
            { label: "TikTok", cls: "tt" },
            { label: "Aguardando aprovação", cls: "pending" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className={`cal-post ${l.cls}`} style={{ marginBottom: 0, padding: "2px 8px", fontSize: 10 }}>{l.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>

          {/* Calendar */}
          <div className="card" style={{ padding: 0 }}>
            {/* Month nav */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="btn btn-ghost btn-sm">‹</button>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{MONTH}</span>
              <button className="btn btn-ghost btn-sm">›</button>
            </div>

            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "1px solid var(--border)" }}>
              {DAYS.map((d) => (
                <div key={d} style={{ padding: "8px 0", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {cells.map((day, i) => {
                const dayPosts = day ? posts[day] || [] : [];
                const isSelected = day === selected;
                const isToday = day === 12;
                return (
                  <div
                    key={i}
                    onClick={() => day && setSelected(isSelected ? null : day)}
                    style={{
                      minHeight: 80,
                      padding: "8px 6px",
                      borderRight: (i + 1) % 7 !== 0 ? "1px solid var(--border)" : "none",
                      borderBottom: i < cells.length - 7 ? "1px solid var(--border)" : "none",
                      cursor: day ? "pointer" : "default",
                      background: isSelected ? "rgba(124,92,252,0.08)" : "transparent",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => { if (day && !isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    {day && (
                      <>
                        <div style={{
                          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: isToday ? 700 : 400,
                          color: isToday ? "#0C0B10" : "var(--muted)",
                          background: isToday ? "var(--lime)" : "transparent",
                          width: 22, height: 22, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginBottom: 4,
                        }}>
                          {day}
                        </div>
                        {dayPosts.map((p, pi) => (
                          <div key={pi} className={`cal-post ${p.net}`}>{p.title}</div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Selected day detail */}
            {selected && (
              <div className="card" style={{ padding: 16 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 12 }}>
                  {selected} de Junho
                </p>
                {selectedPosts.length === 0 ? (
                  <p style={{ color: "var(--muted)", fontSize: 12 }}>Nenhum post agendado.</p>
                ) : (
                  selectedPosts.map((p, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 8, marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                        <span className={`cal-post ${p.net}`} style={{ marginBottom: 0, fontSize: 10 }}>
                          {p.net === "ig" ? "Instagram" : p.net === "tt" ? "TikTok" : "Pendente"}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: "auto" }}>{p.time}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text)" }}>{p.title}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Upcoming */}
            <div className="card" style={{ padding: 0 }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>Próximas publicações</h3>
              </div>
              {upcoming.map((u, i) => (
                <div key={i} style={{ padding: "10px 16px", borderBottom: i < upcoming.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>{u.day} · {u.time}</span>
                    <span className={`tag ${u.netTag}`} style={{ fontSize: 9, padding: "2px 7px" }}>{u.net}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text)" }}>{u.title}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: 16 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 14 }}>Resumo do mês</p>
              {[
                { label: "Total agendado", value: "20 posts" },
                { label: "Publicados", value: "12 posts", color: "var(--green)" },
                { label: "Aguardando", value: "6 posts", color: "var(--amber)" },
                { label: "Instagram", value: "14 posts", color: "var(--purple2)" },
                { label: "TikTok", value: "6 posts", color: "var(--teal)" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: s.color || "var(--text)" }}>{s.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </AppShell>
  );
}
