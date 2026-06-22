const steps = [
  {
    number: "01",
    client: true,
    title: "Paga e assina",
    description:
      "Escolhe o plano, paga com cartão ou Pix direto na página. Recebe o contrato por email, assina em 2 cliques.",
    tags: ["Stripe", "Autentique"],
  },
  {
    number: "02",
    client: false,
    title: "Geração de conteúdo",
    description:
      "Nossa equipe cria os posts do mês com base no seu negócio: textos, design e formato para cada rede.",
    tags: ["Interno"],
  },
  {
    number: "03",
    client: true,
    title: "Preenche o briefing",
    description:
      "Responde um formulário rápido: público, tom de voz, datas importantes. Conecta Instagram e TikTok sem passar senha.",
    tags: ["Tally", "Buffer"],
  },
  {
    number: "04",
    client: false,
    title: "Revisão e ajustes",
    description:
      "Revisamos tudo internamente antes de enviar. Qualidade garantida antes de chegar ao cliente.",
    tags: ["Interno"],
  },
  {
    number: "05",
    client: true,
    title: "Aprova em 1 clique",
    description:
      "Recebe o preview real de cada post. Aprova ou pede ajuste com 1 clique. Sem reunião, sem email.",
    tags: ["Pingg"],
  },
  {
    number: "06",
    client: false,
    title: "Publicação automática",
    description:
      "Conteúdo aprovado vai direto para o agendamento. Publica nas datas certas, nas horas de maior engajamento.",
    tags: ["Automático"],
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="pill mb-4 inline-flex"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#86efac",
            }}
          >
            Como funciona
          </span>
          <h2
            className="font-display font-700 text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}
          >
            Do pagamento à publicação.
            <br />
            <span className="text-gradient">Sem fricção.</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            O cliente toca em apenas 3 momentos. O resto é automático ou feito
            pela nossa equipe.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span className="text-xs text-gray-400">Feito pelo cliente</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#374151",
                border: "1px solid #4b5563",
              }}
            />
            <span className="text-xs text-gray-400">Feito por vocês / automático</span>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card p-6 relative overflow-hidden"
              style={{
                background: step.client
                  ? "rgba(34,197,94,0.04)"
                  : "var(--dark-3)",
                borderColor: step.client
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(255,255,255,0.06)",
              }}
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="font-display font-700"
                  style={{
                    fontSize: "2.5rem",
                    color: step.client
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(255,255,255,0.05)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {step.number}
                </span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="pill"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#9ca3af",
                        fontSize: "10px",
                        padding: "3px 8px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3
                className="font-display font-600 text-white mb-2"
                style={{ fontSize: "1.05rem" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* Client indicator */}
              {step.client && (
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{
                    background: "linear-gradient(to bottom, #22c55e, transparent)",
                    borderRadius: "16px 0 0 16px",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Summary callout */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          <p className="text-white font-500" style={{ fontSize: "1.05rem" }}>
            O cliente só mexe em <span style={{ color: "#22c55e" }}>3 momentos</span> — pagar, preencher o briefing e aprovar.{" "}
            <span className="text-gray-400">Tudo o mais é vocês ou automático.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
