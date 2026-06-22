"use client";
import { useState, useRef } from "react";
import AppShell from "@/components/AppShell";

type MediaFile = { file: File; preview: string };

type Msg = { from: "bot" | "user"; text: string };

const initialMessages: Msg[] = [
  { from: "bot", text: "Olá! Vou te fazer algumas perguntas para entender seu negócio. Pode ser informal — escreve como você falaria pra um amigo. Vamos começar: qual é o nome do seu negócio e o que você vende ou oferece?" },
];

const questions = [
  "Ótimo! Agora me conta: quem é o seu cliente ideal? Pensa em idade, estilo de vida, o que essa pessoa valoriza.",
  "Entendido. Qual é o tom de voz que você quer para as redes? Ex: descontraído e divertido, profissional e sério, inspirador, educativo...",
  "Você tem alguma referência de perfil que você admira — seja do seu setor ou de qualquer outro? Pode mandar o @.",
  "Quais são as datas importantes do seu negócio neste mês? Promoções, aniversário, datas comemorativas...",
  "Por último: tem algo que você NÃO quer que apareça no conteúdo? Algum tema, estilo ou abordagem que não combina com sua marca?",
  "Perfeito! Recebi tudo. Vou usar essas informações para criar o conteúdo do mês. Em até 5 dias úteis você recebe as copies para aprovação. Qualquer dúvida, me chama aqui. 🎉",
];

const fields = [
  { key: "negocio", label: "Negócio", placeholder: "Ex: Salão de beleza feminino em SP" },
  { key: "publico", label: "Público-alvo", placeholder: "Ex: Mulheres 25-40, classe B/C" },
  { key: "tom", label: "Tom de voz", placeholder: "Ex: Descontraído, próximo, feminino" },
  { key: "referencias", label: "Referências", placeholder: "Ex: @salaodabeleza, @beauty.clinic" },
  { key: "datas", label: "Datas importantes", placeholder: "Ex: Dia das Mães 11/05, aniversário 20/06" },
  { key: "evitar", label: "Evitar", placeholder: "Ex: Conteúdo muito formal, fotos de antes/depois" },
];

export default function Briefing() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [tab, setTab] = useState<"chat" | "form">("chat");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const newMedia = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setMedia((prev) => [...prev, ...newMedia]);
    e.target.value = "";
  }

  function removeMedia(index: number) {
    setMedia((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  const answerLabels = [
    "Negócio",
    "Público-alvo",
    "Tom de voz",
    "Referências",
    "Datas importantes",
    "O que evitar",
  ];

  function buildPrompt(ans: string[]) {
    return `Você é um social media estrategista. Crie posts para redes sociais com base neste briefing:

## Briefing do cliente
- **Negócio:** ${ans[0] || "—"}
- **Público-alvo:** ${ans[1] || "—"}
- **Tom de voz:** ${ans[2] || "—"}
- **Referências:** ${ans[3] || "—"}
- **Datas importantes:** ${ans[4] || "—"}
- **O que evitar:** ${ans[5] || "—"}

## Instruções
- Gere copies para Instagram e TikTok (carrossel, reels, stories, feed)
- Use o tom de voz indicado pelo cliente
- Cada post deve ter: legenda, CTA, hashtags relevantes e sugestão de formato
- Adapte o conteúdo ao público-alvo descrito
- Respeite as restrições do campo "O que evitar"
- Aproveite as datas importantes para posts temáticos
${media.length > 0 ? `\n## Mídia de referência (${media.length} arquivo${media.length > 1 ? "s" : ""})\n${media.map((m) => `- ${m.file.name} (${m.file.type}, ${(m.file.size / 1024 / 1024).toFixed(1)}MB)`).join("\n")}\nUse essas mídias como referência visual para o estilo e conteúdo dos posts.` : ""}`;
  }

  function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { from: "user", text: input };
    const newAnswers = [...answers, input];
    setAnswers(newAnswers);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const next = questions[step] ?? null;
      if (next) setMessages((m) => [...m, { from: "bot", text: next }]);
      setStep((s) => s + 1);
      setTyping(false);

      if (step === questions.length - 1) {
        const prompt = buildPrompt(newAnswers);
        console.log("=== PROMPT PARA GERAÇÃO DE POSTS ===");
        console.log(prompt);
        console.log("=== FIM DO PROMPT ===");
        console.log("Respostas brutas:", Object.fromEntries(answerLabels.map((l, i) => [l, newAnswers[i] || ""])));
      }
    }, 1200);
  }

  const done = step >= questions.length;

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 48px", maxWidth: 860 }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 6 }}>Onboarding</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>Briefing do negócio</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
            Quanto mais detalhes, melhor o conteúdo. Leva menos de 5 minutos.
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24 }}>
          {questions.map((_, i) => (
            <div key={i} className={`cad-prog-bar${i < step ? " done" : i === step ? " active" : ""}`} />
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8, whiteSpace: "nowrap" }}>
            {Math.min(step, questions.length)}/{questions.length}
          </span>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button className={`nav-btn${tab === "chat" ? " active" : ""}`} onClick={() => setTab("chat")}>💬 Chat guiado</button>
          <button className={`nav-btn${tab === "form" ? " active" : ""}`} onClick={() => setTab("form")}>📋 Formulário</button>
        </div>

        {tab === "chat" ? (
          <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", height: 520 }}>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-end" }}>
                  {m.from === "bot" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--purple),var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>✦</div>
                  )}
                  <div style={{
                    maxWidth: "72%",
                    padding: "10px 14px",
                    borderRadius: m.from === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    background: m.from === "bot" ? "var(--surface2)" : "var(--purple)",
                    color: "var(--text)",
                    fontSize: 13,
                    lineHeight: 1.55,
                    border: m.from === "bot" ? "1px solid var(--border2)" : "none",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--purple),var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✦</div>
                  <div style={{ padding: "12px 16px", borderRadius: "4px 14px 14px 14px", background: "var(--surface2)", border: "1px solid var(--border2)", display: "flex", gap: 4, alignItems: "center" }}>
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Media previews */}
            {media.length > 0 && (
              <div style={{ padding: "8px 16px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {media.map((m, i) => (
                  <div key={i} style={{ position: "relative", width: 56, height: 56, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border2)", flexShrink: 0 }}>
                    {m.file.type.startsWith("video/") ? (
                      <video src={m.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <img src={m.preview} alt={m.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                    <button
                      onClick={() => removeMedia(i)}
                      style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" multiple hidden />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={done}
                className="btn btn-ghost btn-sm"
                style={{ padding: "7px 10px", flexShrink: 0 }}
                title="Enviar fotos ou vídeos"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={done ? "Briefing completo ✓" : "Digite sua resposta..."}
                disabled={done || typing}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" onClick={send} disabled={done || typing || !input.trim()}>
                Enviar
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {fields.map((f) => (
              <div key={f.key}>
                <p className="wf-label">{f.label}</p>
                <input
                  value={formData[f.key] || ""}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <div>
              <p className="wf-label">Fotos / vídeos de referência</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{ border: "2px dashed var(--border2)", borderRadius: 8, padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--purple)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
              >
                <p style={{ color: "var(--muted)", fontSize: 12 }}>Clique para enviar fotos ou vídeos curtos</p>
                <p style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>JPG, PNG, MP4 — até 50MB cada</p>
              </div>
              {media.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                  {media.map((m, i) => (
                    <div key={i} style={{ position: "relative", width: 72, height: 72, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border2)" }}>
                      {m.file.type.startsWith("video/") ? (
                        <video src={m.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img src={m.preview} alt={m.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); removeMedia(i); }}
                        style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 4 }}>
              Salvar briefing
            </button>
          </div>
        )}

        {/* Annotation */}
        <div className="anno" style={{ marginTop: 16 }}>
          <span style={{ fontSize: 14 }}>💡</span>
          <p>Suas respostas ficam salvas automaticamente. A equipe da Vitrina usa essas informações para gerar o conteúdo do mês. Você pode atualizar a qualquer momento.</p>
        </div>

      </div>
    </AppShell>
  );
}
