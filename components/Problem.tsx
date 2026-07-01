export default function Problem() {
  const items = [
    { icon: "🩳", title: "Sem tempo pra postar", desc: "O negócio consome tudo. As redes ficam em segundo plano." },
    { icon: "💸", title: "Agência custa R$2.000+", desc: "Fora do alcance de 90% dos pequenos negócios brasileiros." },
    { icon: "👻", title: "Freelancer some", desc: "Começa bem, em dois meses o perfil está abandonado de novo." },
    { icon: "📊", title: "Posts bonitos, zero resultado", desc: "Aparência sem estratégia não traz cliente nenhum." },
  ];

  return (
    <section className="lp-section lp-problem">
      <div className="lp-wrap">
        <div className="lp-problem-layout">
          <div className="lp-reveal">
            <span className="lp-sec-tag">O problema</span>
            <h2 className="lp-display">A gente sabe<br /><em>como é.</em></h2>
            <p className="lp-problem-quote">
              Você tem um negócio pra tocar.<br />
              No final do dia, <strong>não sobra tempo</strong> pra pensar em post, legenda, tendência do TikTok.<br /><br />
              Enquanto isso, seu concorrente <strong>aparece todo dia</strong> na tela do seu cliente.
            </p>
          </div>
          <div className="lp-problem-items lp-reveal">
            {items.map((item) => (
              <div key={item.title} className="lp-pi">
                <span className="lp-pi-icon">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
