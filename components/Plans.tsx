"use client";
import { useState } from "react";

const plans = [
  {
    name: "Presença",
    price: 297,
    description: "Para quem quer estar presente nas redes sem dor de cabeça.",
    posts: 12,
    networks: ["Instagram"],
    features: [
      "12 posts por mês",
      "Instagram",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
    ],
    notIncluded: ["TikTok / Reels", "Relatório mensal", "Reunião de estratégia"],
    cta: "Começar no Presença",
    highlight: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRESENCA || "price_placeholder_presenca",
  },
  {
    name: "Vitrina",
    price: 497,
    description: "O plano completo para negócios que querem crescer.",
    posts: 20,
    networks: ["Instagram", "TikTok"],
    features: [
      "20 posts por mês",
      "Instagram + TikTok / Reels",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
      "Relatório mensal de resultados",
    ],
    notIncluded: ["Reunião de estratégia"],
    cta: "Começar no Vitrina",
    highlight: true,
    badge: "Mais popular",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VITRINA || "price_placeholder_vitrina",
  },
  {
    name: "Autoridade",
    price: 797,
    description: "Para negócios que querem dominar o mercado local.",
    posts: 30,
    networks: ["Instagram", "TikTok"],
    features: [
      "30 posts por mês",
      "Instagram + TikTok / Reels",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
      "Relatório mensal de resultados",
      "Reunião de estratégia mensal",
    ],
    notIncluded: [],
    cta: "Começar no Autoridade",
    highlight: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUTORIDADE || "price_placeholder_autoridade",
  },
];

function CheckIcon({ green }: { green?: boolean }) {
  return (
    <div
      className="check-icon"
      style={{
        background: green ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
      }}
    >
      <svg
        width="10"
        height="10"
        fill="none"
        stroke={green ? "#22c55e" : "#6b7280"}
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div className="check-icon" style={{ background: "rgba(255,255,255,0.03)" }}>
      <svg
        width="8"
        height="8"
        fill="none"
        stroke="#374151"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Plans() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: (typeof plans)[0]) => {
    setLoading(plan.name);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId, planName: plan.name }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao iniciar checkout. Tente novamente.");
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section
      id="planos"
      className="py-24 px-5"
      style={{
        background:
          "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(34,197,94,0.05) 0%, transparent 70%)",
      }}
    >
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
            Planos
          </span>
          <h2
            className="font-display font-700 text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}
          >
            Escolha o seu plano.
            <br />
            <span className="text-gradient">Cancele quando quiser.</span>
          </h2>
          <p className="text-gray-500 mt-4">
            Sem contrato mínimo. Cobrança mensal automática pelo Stripe.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-7 flex flex-col"
              style={
                plan.highlight
                  ? {
                      background: "linear-gradient(145deg, #0d2a17 0%, #0a1f10 100%)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      boxShadow: "0 0 40px rgba(34,197,94,0.12)",
                    }
                  : {
                      background: "var(--dark-3)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    padding: "4px 14px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name & description */}
              <div className="mb-6">
                <h3
                  className="font-display font-600 text-white mb-1"
                  style={{ fontSize: "1.2rem" }}
                >
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">R$</span>
                  <span
                    className="font-display font-700 text-white"
                    style={{ fontSize: "2.8rem", letterSpacing: "-0.03em" }}
                  >
                    {plan.price.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-sm text-gray-500">/mês</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Cobrado automaticamente • Cancele a qualquer momento
                </p>
              </div>

              {/* Divider */}
              <div className="divider mb-6" />

              {/* Features */}
              <div className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="check-item">
                    <CheckIcon green />
                    <span>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f) => (
                  <div key={f} className="check-item" style={{ opacity: 0.4 }}>
                    <XIcon />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan)}
                disabled={loading === plan.name}
                className={plan.highlight ? "btn-primary" : "btn-ghost"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  animation: plan.highlight ? undefined : "none",
                }}
              >
                {loading === plan.name ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="30 70"
                      />
                    </svg>
                    Redirecionando...
                  </>
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { icon: "🔒", text: "Pagamento seguro via Stripe" },
            { icon: "📄", text: "Contrato digital incluído" },
            { icon: "🔄", text: "Cancele a qualquer momento" },
            { icon: "🤝", text: "Sem fidelidade mínima" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2"
              style={{ color: "#6b7280", fontSize: "13px" }}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
