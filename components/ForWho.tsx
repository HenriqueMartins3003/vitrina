export default function ForWho() {
  const items = [
    "Você tem um negócio local e quer aparecer mais online",
    "Você já tentou postar mas não consegue manter consistência",
    "Não tem tempo nem equipe pra cuidar das redes",
    "Quer resultado sem pagar R$2.000+ numa agência",
    "É restaurante, clínica, loja, academia, pet shop ou serviço",
    "Quer que seu negócio apareça todo dia na tela do cliente",
  ];

  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-reveal">
          <span className="lp-sec-tag">Pra quem é</span>
          <h2 className="lp-display">A Vitrina é <em>pra você se...</em></h2>
        </div>
        <div className="lp-for-grid lp-reveal">
          {items.map((item) => (
            <div key={item} className="lp-for-chip">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
