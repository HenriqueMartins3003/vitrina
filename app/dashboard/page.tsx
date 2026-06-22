import AppShell from "@/components/AppShell";
import Link from "next/link";

const stats = [
  { label: "Posts publicados", value: "18", sub: "este mês", color: "var(--purple)" },
  { label: "Aguardando aprovação", value: "6", sub: "copies prontas", color: "var(--amber)" },
  { label: "Taxa de aprovação", value: "94%", sub: "últimos 30 dias", color: "var(--teal)" },
  { label: "Próxima publicação", value: "Amanhã", sub: "10:00 · Instagram", color: "var(--lime)" },
];

const activity = [
  { type: "approved", text: "Post sobre promoção de verão aprovado", time: "há 2h", tag: "Instagram", tagColor: "tag-purple" },
  { type: "published", text: "Reel de antes/depois publicado automaticamente", time: "há 5h", tag: "TikTok", tagColor: "tag-teal" },
  { type: "ready", text: "6 novas copies prontas para aprovação", time: "hoje", tag: "Copies", tagColor: "tag-amber" },
  { type: "published", text: "Carrossel de dicas publicado", time: "ontem", tag: "Instagram", tagColor: "tag-purple" },
  { type: "approved", text: "Story promocional aprovado", time: "ontem", tag: "Instagram", tagColor: "tag-purple" },
];

const upcoming = [
  { date: "Hoje", time: "18:00", title: "Dica rápida #3", net: "IG", netColor: "var(--purple)" },
  { date: "Amanhã", time: "10:00", title: "Post de produto destaque", net: "IG", netColor: "var(--purple)" },
  { date: "Amanhã", time: "19:00", title: "Trend do momento", net: "TT", netColor: "var(--teal)" },
  { date: "Sex 14", time: "12:00", title: "Promoção fim de semana", net: "IG", netColor: "var(--purple)" },
];

export default function Dashboard() {
  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 1100 }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>
            Junho 2026 · Semana 3
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Olá, Maria 👋
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
            Você tem <span style={{ color: "var(--amber)", fontWeight: 600 }}>6 copies</span> aguardando aprovação.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {stats.map((s) => (
            <div key={s.label} className="card" style={{ padding: "18px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: s.color, borderRadius: "20px 0 0 20px" }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: s.color, lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginTop: 6 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

          {/* Activity */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Atividade recente</h2>
              <Link href="/copies" className="btn btn-ghost btn-sm">Ver copies →</Link>
            </div>
            <div>
              {activity.map((a, i) => (
                <div key={i} style={{ padding: "14px 20px", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: a.type === "approved" ? "rgba(74,222,128,0.1)" : a.type === "published" ? "rgba(124,92,252,0.1)" : "rgba(255,181,71,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                  }}>
                    {a.type === "approved" ? "✓" : a.type === "published" ? "↑" : "✦"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.text}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{a.time}</p>
                  </div>
                  <span className={`tag ${a.tagColor}`}>{a.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Próximas publicações</h2>
              <Link href="/agendamento" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", textDecoration: "none" }}>Ver tudo →</Link>
            </div>
            <div>
              {upcoming.map((u, i) => (
                <div key={i} style={{ padding: "12px 20px", borderBottom: i < upcoming.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--surface2)", border: "1px solid var(--border2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--muted)", textTransform: "uppercase" }}>{u.date.split(" ")[0]}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "var(--text)", lineHeight: 1 }}>{u.date.split(" ")[1] || ""}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.title}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 1 }}>{u.time}</p>
                  </div>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: u.netColor + "22", border: `1px solid ${u.netColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: u.netColor, flexShrink: 0 }}>
                    {u.net}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px" }}>
              <Link href="/agendamento" className="btn btn-ghost btn-sm btn-full">Ver calendário completo</Link>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <Link href="/copies" className="btn btn-primary">Aprovar copies (6)</Link>
          <Link href="/briefing" className="btn btn-ghost">Atualizar briefing</Link>
          <Link href="/agendamento" className="btn btn-ghost">Ver agendamento</Link>
        </div>

      </div>
    </AppShell>
  );
}
