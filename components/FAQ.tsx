"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Preciso dar a senha do meu Instagram?",
    a: "Não. Você conecta suas redes através de um link de autorização oficial (Buffer ou Pingg). É o mesmo processo que você usa ao entrar com Google em outros sites — seguro e sem expor sua senha.",
  },
  {
    q: "Em quanto tempo o conteúdo fica pronto?",
    a: "Após preencher o briefing, entregamos o conteúdo do primeiro mês em até 5 dias úteis. Nos meses seguintes o ciclo é mensal e automático.",
  },
  {
    q: "Preciso aparecer nos vídeos?",
    a: "Não é obrigatório. A maioria dos clientes começa com posts de imagem e texto. Se quiser incluir vídeo com você ou a equipe, a gente adapta o plano.",
  },
  {
    q: "E se eu não gostar do conteúdo?",
    a: "Você aprova tudo antes de publicar. Se pedir ajuste, refazemos. Não publicamos nada sem a sua aprovação.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. Não existe fidelidade mínima. Você cancela pelo próprio painel do Stripe, sem precisar falar com ninguém.",
  },
  {
    q: "Vocês criam a estratégia ou só executam?",
    a: "Nos planos Presença e Vitrina executamos baseados no briefing que você preenche. No plano Autoridade, incluímos uma reunião de estratégia mensal.",
  },
  {
    q: "O que acontece se eu não aprovar o conteúdo a tempo?",
    a: "Você tem 3 dias úteis para aprovar. Se não houver resposta, entramos em contato. Nunca publicamos sem sua confirmação.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="pill mb-4 inline-flex"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#86efac",
            }}
          >
            Dúvidas frequentes
          </span>
          <h2
            className="font-display font-700 text-white"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Perguntas e respostas
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card overflow-hidden transition-all duration-200"
              style={{
                borderColor:
                  open === i ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)",
                background: open === i ? "rgba(34,197,94,0.03)" : "var(--dark-3)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
              >
                <span
                  className="font-500 text-white"
                  style={{ fontSize: "0.95rem" }}
                >
                  {faq.q}
                </span>
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke={open === i ? "#22c55e" : "#6b7280"}
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p
                  className="text-gray-400 leading-relaxed px-6 pb-5"
                  style={{ fontSize: "0.9rem" }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-gray-400 text-sm mb-3">
            Ainda tem dúvida? Fala direto com a gente.
          </p>
          <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ fontSize: "13px", padding: "10px 20px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.085.535 4.047 1.47 5.759L.004 24l6.395-1.448A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
