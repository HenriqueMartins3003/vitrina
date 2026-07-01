"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 52, zIndex: 50,
        background: "rgba(12,11,16,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--lime)", letterSpacing: "-0.01em" }}>
          Vitrina ✦
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="tag tag-teal">● Conectado</span>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,var(--purple),var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "#fff", cursor: "pointer" }}>
            {getInitials(session?.user?.name)}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ paddingTop: 52, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main */}
      <main style={{ flex: 1, paddingTop: 52, minWidth: 0, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
