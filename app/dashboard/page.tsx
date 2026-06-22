"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AppShell from "@/components/AppShell";
import Link from "next/link";

interface DashboardData {
  stats: {
    published: number;
    pending: number;
    approvalRate: number;
    nextPost: { title: string; network: string; time: string; day: number; month: number } | null;
  };
  recentActivity: { id: string; network: string; type: string; status: string; updatedAt: string; caption: string }[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "Usuário";
  const pending = data?.stats.pending ?? 0;

  const stats = [
    { label: "Posts publicados", value: String(data?.stats.published ?? 0), sub: "este mês", color: "var(--purple)" },
    { label: "Aguardando aprovação", value: String(pending), sub: "copies prontas", color: "var(--amber)" },
    { label: "Taxa de aprovação", value: `${data?.stats.approvalRate ?? 0}%`, sub: "geral", color: "var(--teal)" },
    { label: "Próxima publicação", value: data?.stats.nextPost ? `Dia ${data.stats.nextPost.day}` : "—", sub: data?.stats.nextPost ? `${data.stats.nextPost.time} · ${data.stats.nextPost.network === "ig" ? "Instagram" : "TikTok"}` : "Nenhuma agendada", color: "var(--lime)" },
  ];

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 1100 }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>
            {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Olá, {firstName} 👋
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
            {pending > 0
              ? <>Você tem <span style={{ color: "var(--amber)", fontWeight: 600 }}>{pending} copies</span> aguardando aprovação.</>
              : "Todas as copies estão em dia ✓"
            }
          </p>
        </div>

        {/* Stat cards */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>Carregando...</div>
        ) : (
          <>
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

            {/* Activity */}
            <div className="card" style={{ padding: 0, marginBottom: 20 }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Atividade recente</h2>
                <Link href="/copies" className="btn btn-ghost btn-sm">Ver copies →</Link>
              </div>
              <div>
                {(data?.recentActivity ?? []).length === 0 ? (
                  <div style={{ padding: "30px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Nenhuma atividade ainda.</div>
                ) : (
                  data!.recentActivity.map((a) => (
                    <div key={a.id} style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        background: a.status === "approved" ? "rgba(74,222,128,0.1)" : a.status === "rejected" ? "rgba(239,68,68,0.1)" : "rgba(255,181,71,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                      }}>
                        {a.status === "approved" ? "✓" : a.status === "rejected" ? "✗" : "✦"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {a.caption.substring(0, 60)}...
                        </p>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                          {a.type} · {a.status === "approved" ? "Aprovado" : a.status === "rejected" ? "Rejeitado" : "Pendente"}
                        </p>
                      </div>
                      <span className={`tag ${a.network === "Instagram" ? "tag-purple" : "tag-teal"}`}>{a.network}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ display: "flex", gap: 12 }}>
              {pending > 0 && <Link href="/copies" className="btn btn-primary">Aprovar copies ({pending})</Link>}
              <Link href="/briefing" className="btn btn-ghost">Atualizar briefing</Link>
              <Link href="/agendamento" className="btn btn-ghost">Ver agendamento</Link>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
