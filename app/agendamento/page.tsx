"use client";
import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/AppShell";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Post = { id: string; title: string; network: string; time: string; day: number; status: string };

function getStartOffset(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function Agendamento() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selected, setSelected] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(() => {
    setLoading(true);
    fetch(`/api/posts?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [month, year]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const totalDays = getDaysInMonth(year, month);
  const startOffset = getStartOffset(year, month);
  const today = now.getFullYear() === year && now.getMonth() + 1 === month ? now.getDate() : -1;

  const postsByDay: Record<number, Post[]> = {};
  posts.forEach((p) => {
    if (!postsByDay[p.day]) postsByDay[p.day] = [];
    postsByDay[p.day].push(p);
  });

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedPosts = selected ? postsByDay[selected] || [] : [];

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
    setSelected(null);
  }

  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
    setSelected(null);
  }

  const netClass = (net: string) => net === "ig" ? "ig" : net === "tt" ? "tt" : "pending";
  const netLabel = (net: string) => net === "ig" ? "Instagram" : net === "tt" ? "TikTok" : "Pendente";

  const igCount = posts.filter((p) => p.network === "ig").length;
  const ttCount = posts.filter((p) => p.network === "tt").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const publishedCount = posts.filter((p) => p.status === "published").length;

  const upcoming = posts
    .filter((p) => p.day >= (today > 0 ? today : 1))
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
    .slice(0, 5);

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

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>Carregando...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>

            {/* Calendar */}
            <div className="card" style={{ padding: 0 }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button className="btn btn-ghost btn-sm" onClick={prevMonth}>‹</button>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{MONTH_NAMES[month - 1]} {year}</span>
                <button className="btn btn-ghost btn-sm" onClick={nextMonth}>›</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "1px solid var(--border)" }}>
                {DAYS.map((d) => (
                  <div key={d} style={{ padding: "8px 0", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                    {d}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                {cells.map((day, i) => {
                  const dayPosts = day ? postsByDay[day] || [] : [];
                  const isSelected = day === selected;
                  const isToday = day === today;
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
                            <div key={pi} className={`cal-post ${netClass(p.network)}`}>{p.title}</div>
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

              {selected && (
                <div className="card" style={{ padding: 16 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 12 }}>
                    {selected} de {MONTH_NAMES[month - 1]}
                  </p>
                  {selectedPosts.length === 0 ? (
                    <p style={{ color: "var(--muted)", fontSize: 12 }}>Nenhum post agendado.</p>
                  ) : (
                    selectedPosts.map((p) => (
                      <div key={p.id} style={{ padding: "10px 12px", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 8, marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                          <span className={`cal-post ${netClass(p.network)}`} style={{ marginBottom: 0, fontSize: 10 }}>
                            {netLabel(p.network)}
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
                {upcoming.length === 0 ? (
                  <div style={{ padding: "20px 16px", textAlign: "center", color: "var(--muted)", fontSize: 12 }}>Nenhuma publicação agendada.</div>
                ) : (
                  upcoming.map((u) => (
                    <div key={u.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>Dia {u.day} · {u.time}</span>
                        <span className={`tag ${u.network === "ig" ? "tag-purple" : "tag-teal"}`} style={{ fontSize: 9, padding: "2px 7px" }}>{netLabel(u.network)}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text)" }}>{u.title}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Stats */}
              <div className="card" style={{ padding: 16 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 14 }}>Resumo do mês</p>
                {[
                  { label: "Total agendado", value: `${posts.length} posts` },
                  { label: "Publicados", value: `${publishedCount} posts`, color: "var(--green)" },
                  { label: "Aguardando", value: `${scheduledCount} posts`, color: "var(--amber)" },
                  { label: "Instagram", value: `${igCount} posts`, color: "var(--purple2)" },
                  { label: "TikTok", value: `${ttCount} posts`, color: "var(--teal)" },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{s.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: s.color || "var(--text)" }}>{s.value}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
