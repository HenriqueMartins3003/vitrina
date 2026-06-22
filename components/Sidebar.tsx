"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", icon: "⬜", label: "Dashboard" },
  { href: "/briefing",  icon: "💬", label: "Briefing" },
  { href: "/copies",    icon: "✏️",  label: "Copies", badge: "6" },
  { href: "/templates", icon: "🖼️",  label: "Templates" },
  { href: "/agendamento", icon: "📅", label: "Agendamento" },
];

const bottom = [
  { href: "/configuracoes", icon: "⚙️", label: "Configurações" },
  { href: "/plano", icon: "💳", label: "Plano & Fatura" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <div style={{
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      width: 220,
      minHeight: "calc(100vh - 52px)",
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 52,
      height: "calc(100vh - 52px)",
      overflowY: "auto",
      flexShrink: 0,
    }}>
      <div style={{ padding: "24px 20px 8px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--lime)" }}>
        Vitrina ✦
      </div>

      <div style={{ padding: "16px 0 4px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--dim)", padding: "0 20px", marginBottom: 8 }}>
          Principal
        </div>
        {items.map(it => (
          <Link key={it.href} href={it.href} className={`sidebar-item${path === it.href ? " active" : ""}`}>
            <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{it.icon}</span>
            {it.label}
            {it.badge && <span className="sidebar-badge">{it.badge}</span>}
          </Link>
        ))}
      </div>

      <div style={{ padding: "16px 0 4px", marginTop: 8 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--dim)", padding: "0 20px", marginBottom: 8 }}>
          Conta
        </div>
        {bottom.map(it => (
          <Link key={it.href} href={it.href} className={`sidebar-item${path === it.href ? " active" : ""}`}>
            <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{it.icon}</span>
            {it.label}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--purple), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0 }}>
          MS
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Maria Silva</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>Plano Pro</div>
        </div>
      </div>
    </div>
  );
}
