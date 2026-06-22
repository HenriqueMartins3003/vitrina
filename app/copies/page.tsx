"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";

type Status = "pending" | "approved" | "rejected" | "editing";

interface Copy {
  id: number;
  network: "Instagram" | "TikTok";
  type: string;
  date: string;
  caption: string;
  hashtags: string;
  status: Status;
  editText?: string;
}

const initialCopies: Copy[] = [
  {
    id: 1,
    network: "Instagram",
    type: "Carrossel",
    date: "14 Jun",
    caption: "Você sabia que 73% dos clientes pesquisam no Instagram antes de visitar um negócio local? ✨\n\nSeu perfil precisa ser a vitrine perfeita — e a gente cuida disso pra você.\n\nDesliza para ver como transformamos perfis comuns em máquinas de atração de clientes. →",
    hashtags: "#marketingdigital #negocioslocais #instagram #vitrina #crescimento",
    status: "pending",
  },
  {
    id: 2,
    network: "TikTok",
    type: "Reels",
    date: "15 Jun",
    caption: "POV: você finalmente parou de se preocupar com o Instagram do seu negócio 😌\n\nEnquanto você foca no que faz de melhor, a gente cuida das redes. Conteúdo, agendamento e publicação — tudo automático.\n\nLink na bio pra saber mais ↗",
    hashtags: "#smallbusiness #empreendedor #marketingdigital #tiktokbrasil",
    status: "pending",
  },
  {
    id: 3,
    network: "Instagram",
    type: "Post único",
    date: "16 Jun",
    caption: "Resultado real de um cliente após 30 dias com a Vitrina:\n\n📈 +340% no alcance\n💬 3x mais mensagens diretas\n🛒 2 novos clientes por semana vindos do Instagram\n\nIsso não é sorte — é estratégia e consistência.",
    hashtags: "#resultados #marketingdigital #provafocial #negocioslocais",
    status: "approved",
  },
  {
    id: 4,
    network: "Instagram",
    type: "Story",
    date: "17 Jun",
    caption: "🔥 Oferta especial só hoje!\n\nPrimeiro mês com 20% de desconto. Usa o cupom VITRINA20 no checkout.\n\nVagas limitadas — só 5 disponíveis esta semana.",
    hashtags: "",
    status: "pending",
  },
  {
    id: 5,
    network: "TikTok",
    type: "Reels",
    date: "18 Jun",
    caption: "3 erros que todo negócio local comete no Instagram (e como evitar) 🚫\n\n1. Postar sem consistência\n2. Focar em seguidores, não em clientes\n3. Não ter chamada para ação clara\n\nSalva esse post — você vai precisar!",
    hashtags: "#dicas #instagram #erros #marketingdigital #empreendedorismo",
    status: "rejected",
  },
  {
    id: 6,
    network: "Instagram",
    type: "Carrossel",
    date: "19 Jun",
    caption: "Como escolher o plano certo de gestão de redes sociais para o seu negócio? 🤔\n\nNão é sobre preço — é sobre o que você precisa agora. Desliza e descobre qual é o seu momento.",
    hashtags: "#gestaoderedes #marketingdigital #vitrina #planejamento",
    status: "pending",
  },
];

const filterOpts = ["Todos", "Pendente", "Aprovado", "Rejeitado"];

export default function Copies() {
  const [copies, setCopies] = useState<Copy[]>(initialCopies);
  const [filter, setFilter] = useState("Todos");
  const [editing, setEditing] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");

  function setStatus(id: number, status: Status) {
    setCopies((c) => c.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  function startEdit(c: Copy) {
    setEditing(c.id);
    setEditVal(c.caption);
  }

  function saveEdit(id: number) {
    setCopies((c) => c.map((x) => (x.id === id ? { ...x, caption: editVal, status: "approved" } : x)));
    setEditing(null);
  }

  const filtered = copies.filter((c) => {
    if (filter === "Todos") return true;
    if (filter === "Pendente") return c.status === "pending";
    if (filter === "Aprovado") return c.status === "approved";
    if (filter === "Rejeitado") return c.status === "rejected";
    return true;
  });

  const pendingCount = copies.filter((c) => c.status === "pending").length;

  function approveAll() {
    setCopies((c) => c.map((x) => (x.status === "pending" ? { ...x, status: "approved" } : x)));
  }

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 820 }}>

        {/* Header */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>Junho 2026</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>Aprovação de copies</h1>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
              {pendingCount > 0 ? <><span style={{ color: "var(--amber)", fontWeight: 600 }}>{pendingCount} copies</span> aguardando sua aprovação.</> : "Todas as copies aprovadas ✓"}
            </p>
          </div>
          {pendingCount > 0 && (
            <button className="btn btn-lime" onClick={approveAll}>
              ✓ Aprovar todas ({pendingCount})
            </button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {filterOpts.map((f) => (
            <button key={f} className={`filter-chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
              {f}
              {f === "Pendente" && pendingCount > 0 && (
                <span style={{ marginLeft: 5, background: "var(--amber)", color: "#0C0B10", borderRadius: 8, padding: "0 5px", fontSize: 9, fontWeight: 700 }}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Copy cards */}
        {filtered.map((c) => (
          <div key={c.id} className={`copy-card${c.status === "approved" ? " approved" : c.status === "rejected" ? " rejected" : ""}`}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span className={`tag ${c.network === "Instagram" ? "tag-purple" : "tag-teal"}`}>{c.network}</span>
              <span className="tag tag-amber">{c.type}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: "auto" }}>📅 {c.date}</span>
              {c.status === "approved" && <span className="tag tag-green">✓ Aprovado</span>}
              {c.status === "rejected" && <span className="tag tag-red">✗ Rejeitado</span>}
            </div>

            {/* Caption */}
            {editing === c.id ? (
              <textarea
                value={editVal}
                onChange={(e) => setEditVal(e.target.value)}
                style={{ minHeight: 120, resize: "vertical", marginBottom: 10 }}
              />
            ) : (
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.65, whiteSpace: "pre-wrap", marginBottom: c.hashtags ? 10 : 0 }}>
                {c.caption}
              </p>
            )}

            {c.hashtags && editing !== c.id && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>{c.hashtags}</p>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              {editing === c.id ? (
                <>
                  <button className="copy-action-btn copy-action-approve" onClick={() => saveEdit(c.id)}>✓ Salvar e aprovar</button>
                  <button className="copy-action-btn copy-action-edit" onClick={() => setEditing(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {c.status !== "approved" && (
                    <button className="copy-action-btn copy-action-approve" onClick={() => setStatus(c.id, "approved")}>✓ Aprovar</button>
                  )}
                  {c.status !== "rejected" && (
                    <button className="copy-action-btn copy-action-reject" onClick={() => setStatus(c.id, "rejected")}>✗ Rejeitar</button>
                  )}
                  <button className="copy-action-btn copy-action-edit" onClick={() => startEdit(c)}>✏ Editar</button>
                  {c.status === "rejected" && (
                    <button className="copy-action-btn copy-action-edit" onClick={() => setStatus(c.id, "pending")}>↩ Desfazer</button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>✦</p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Nenhuma copy aqui</p>
          </div>
        )}

      </div>
    </AppShell>
  );
}
