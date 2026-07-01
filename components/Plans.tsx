"use client";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Presença",
    price: 297,
    description: "Presença constante pra quem quer começar a aparecer.",
    features: [
      "12 posts por mês",
      "Instagram",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
    ],
    cta: "Começar agora →",
    highlight: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRESENCA || "price_placeholder_presenca",
  },
  {
    name: "Vitrina",
    price: 497,
    description: "Pra quem quer crescer de verdade e gerar engajamento.",
    features: [
      "20 posts por mês",
      "Instagram + TikTok / Reels",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
      "Relatório mensal de resultados",
    ],
    cta: "Começar agora →",
    highlight: true,
    badge: "⭐ Mais popular",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VITRINA || "price_placeholder_vitrina",
  },
  {
    name: "Autoridade",
    price: 797,
    description: "Autoridade total. Seu negócio presente todos os dias.",
    features: [
      "30 posts por mês",
      "Instagram + TikTok / Reels",
      "Aprovação por link",
      "Publicação automática",
      "Suporte por WhatsApp",
      "Relatório mensal de resultados",
      "Reunião de estratégia mensal",
    ],
    cta: "Começar agora →",
    highlight: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUTORIDADE || "price_placeholder_autoridade",
  },
];

export default function Plans() {
  const router = useRouter();

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    const params = new URLSearchParams({
      plan: plan.name,
      priceId: plan.priceId,
    });
    router.push(`/cadastro?${params.toString()}`);
  };

  return (
    <section id="planos" className="lp-section lp-pricing">
      <div className="lp-wrap">
        <div className="lp-reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <span className="lp-sec-tag">Planos</span>
          <h2 className="lp-display">Escolha o <em>seu plano.</em></h2>
        </div>
        <div className="lp-pricing-cards lp-reveal">
          {plans.map((plan) => (
            <div key={plan.name} className={`lp-pc${plan.highlight ? " hot" : ""}`}>
              {plan.badge && <div className="lp-pc-badge">{plan.badge}</div>}
              <div className="lp-pc-name">{plan.name}</div>
              <div className="lp-pc-price">
                <strong>R${plan.price}</strong>
                <span>/mês</span>
              </div>
              <p className="lp-pc-desc">{plan.description}</p>
              <div className="lp-pc-sep" />
              <ul className="lp-pc-list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`lp-pc-btn ${plan.highlight ? "lp-pc-btn-fill" : "lp-pc-btn-outline"}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="lp-pricing-footnote lp-reveal">
          Sem contrato mínimo · Cobrança mensal automática · <strong>Cancele quando quiser</strong>
        </p>
      </div>
    </section>
  );
}
