export default function HowItWorks() {
  const steps = [
    { n: "1", title: "Escolha o plano", desc: "Seleciona o pacote certo e paga direto na página. Sem burocracia." },
    { n: "2", title: "Fale do seu negócio", desc: "Preenche um briefing rápido — tipo de negócio, público, tom de voz. 10 minutos." },
    { n: "3", title: "A gente cria tudo", desc: "A gente cria posts, Reels e legendas do mês inteiro, adaptados pra sua cidade e público." },
    { n: "4", title: "Aprova e publica", desc: "Recebe um link, vê como fica no feed, aprova em 1 clique. Publicamos automaticamente." },
  ];

  return (
    <section id="como-funciona" className="lp-section">
      <div className="lp-wrap">
        <div className="lp-reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <span className="lp-sec-tag">Como funciona</span>
          <h2 className="lp-display">Simples <em>assim.</em></h2>
        </div>
        <div className="lp-how-steps lp-reveal">
          <div className="lp-how-connector" />
          {steps.map((s) => (
            <div key={s.n} className="lp-how-step">
              <div className="lp-step-circle">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
