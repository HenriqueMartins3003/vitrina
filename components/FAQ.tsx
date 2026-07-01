"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Preciso ter muitos seguidores pra contratar?",
    a: "Não. A Vitrina funciona pra qualquer tamanho de perfil. O objetivo é justamente fazer você crescer a partir de onde está hoje.",
  },
  {
    q: "Quanto tempo leva pra começar?",
    a: "Assim que você pagar e preencher o briefing, os primeiros conteúdos ficam prontos em até 5 dias úteis.",
  },
  {
    q: "E se eu não gostar do conteúdo?",
    a: "Cada plano inclui rodadas de revisão. Você pode pedir ajuste antes de aprovar qualquer post. Sem enrolação.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Basta avisar com 30 dias de antecedência antes da próxima cobrança. Sem multa, sem fidelidade.",
  },
  {
    q: "Vocês atendem qualquer tipo de negócio?",
    a: "Sim. Restaurante, clínica, loja, academia, pet shop, prestador de serviço — qualquer pequeno ou médio negócio brasileiro.",
  },
  {
    q: "O conteúdo é personalizado pro meu negócio?",
    a: "Sim. Tudo criado com base no seu negócio — sua cidade, seu público, seu tom de voz. Uma clínica em Fortaleza não recebe o mesmo conteúdo que uma em Porto Alegre.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="lp-section">
      <div className="lp-wrap">
        <div className="lp-reveal" style={{ textAlign: "center" }}>
          <span className="lp-sec-tag">Perguntas frequentes</span>
          <h2 className="lp-display">Ainda tem <em>dúvidas?</em></h2>
        </div>
        <div className="lp-faq-wrap lp-reveal">
          {faqs.map((faq, i) => (
            <div key={i} className={`lp-faq-item${openIndex === i ? " open" : ""}`}>
              <button
                className="lp-faq-q"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span className="lp-faq-icon">+</span>
              </button>
              <div className="lp-faq-a">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
