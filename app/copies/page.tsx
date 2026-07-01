"use client";
import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/AppShell";

type Status = "pending" | "approved" | "rejected" | "editing";

interface Copy {
  id: string;
  network: string;
  type: string;
  date: string;
  caption: string;
  hashtags: string;
  status: Status;
}

const filterOpts = ["Todos", "Pendente", "Aprovado", "Rejeitado"];

export default function Copies() {
  const [copies, setCopies] = useState<Copy[]>([]);
  const [filter, setFilter] = useState("Todos");
  const [editing, setEditing] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCopies = useCallback(() => {
    fetch("/api/copies")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setCopies(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadCopies(); }, [loadCopies]);

  async function setStatus(id: string, status: Status) {
    await fetch(`/api/copies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setCopies((c) => c.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  function startEdit(c: Copy) {
    setEditing(c.id);
    setEditVal(c.caption);
  }

  async function saveEdit(id: string) {
    await fetch(`/api/copies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption: editVal, status: "approved" }),
    });
    setCopies((c) => c.map((x) => (x.id === id ? { ...x, caption: editVal, status: "approved" } : x)));
    setEditing(null);
  }

  async function approveAll() {
    await fetch("/api/copies/approve-all", { method: "POST" });
    setCopies((c) => c.map((x) => (x.status === "pending" ? { ...x, status: "approved" } : x)));
  }

  const filtered = copies.filter((c) => {
    if (filter === "Todos") return true;
    if (filter === "Pendente") return c.status === "pending";
    if (filter === "Aprovado") return c.status === "approved";
    if (filter === "Rejeitado") return c.status === "rejected";
    return true;
  });

  const pendingCount = copies.filter((c) => c.status === "pending").length;

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 820 }}>

        {/* Header */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>
              {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </p>
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>Carregando...</div>
        ) : (
          <>
            {/* Copy cards */}
            {filtered.map((c) => (
              <div key={c.id} className={`copy-card${c.status === "approved" ? " approved" : c.status === "rejected" ? " rejected" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className={`tag ${c.network === "Instagram" ? "tag-purple" : "tag-teal"}`}>{c.network}</span>
                  <span className="tag tag-amber">{c.type}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: "auto" }}>📅 {c.date}</span>
                  {c.status === "approved" && <span className="tag tag-green">✓ Aprovado</span>}
                  {c.status === "rejected" && <span className="tag tag-red">✗ Rejeitado</span>}
                </div>

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
          </>
        )}
      </div>
    </AppShell>
  );
}
