export default function FinalCTA() {
  return (
    <section className="lp-section lp-final">
      <div className="lp-wrap">
        <div className="lp-final-bg">VITRINA</div>
        <span className="lp-sec-tag">Pronto pra começar?</span>
        <h2 className="lp-display lp-reveal">
          Seu negócio merece<br /><em>aparecer todo dia.</em>
        </h2>
        <p className="lp-reveal" style={{ maxWidth: 480, margin: "0 auto 44px", fontSize: "1.05rem", color: "var(--lp-muted)" }}>
          Comece agora e tenha seu primeiro mês de conteúdo pronto em 5 dias.
        </p>
        <a
          href="#planos"
          className="lp-btn-main lp-reveal"
          style={{ fontSize: "1.1rem", padding: "18px 44px" }}
        >
          Quero começar agora →
        </a>
        <div className="lp-final-trust lp-reveal">
          <span className="lp-ft-item">Sem fidelidade</span>
          <span className="lp-ft-item">Cancele quando quiser</span>
          <span className="lp-ft-item">Garantia de 60 dias</span>
          <span className="lp-ft-item">Começa em 5 dias</span>
        </div>
      </div>
    </section>
  );
}
