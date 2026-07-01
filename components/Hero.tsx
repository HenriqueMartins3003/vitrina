export default function Hero() {
  return (
    <section className="lp-hero">
      <div className="lp-blob lp-blob-1" />
      <div className="lp-blob lp-blob-2" />
      <div className="lp-hero-grid" />
      <div className="lp-wrap">
        <div className="lp-hero-inner">
          <div>
            <div className="lp-hero-tag">
              <span className="lp-hero-tag-dot" />
              Gestão de redes sociais
            </div>
            <h1>
              Enquanto você foca<br />
              <span className="lp-line-italic">no seu negócio,</span><br />
              a gente faz<br />
              <span className="lp-line-highlight">suas redes crescerem.</span>
            </h1>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--p1)", fontFamily: "var(--sans)" }}>
                De agora em diante, suas redes trabalham por você.
              </span>
            </div>
            <p className="lp-hero-desc">
              Engajamento real. Resultado consistente. Posts, Reels e agendamento entregues todo mês — você só aprova pelo celular.
            </p>
            <div className="lp-hero-actions">
              <a href="#planos" className="lp-btn-main">Quero começar agora <span>→</span></a>
              <a href="#como-funciona" className="lp-btn-ghost">
                <span>▶</span>
                Ver como funciona
              </a>
            </div>
            <div className="lp-hero-trust">
              <span className="lp-trust-chip">Sem fidelidade</span>
              <span className="lp-trust-sep" />
              <span className="lp-trust-chip">Garantia 60 dias</span>
              <span className="lp-trust-sep" />
              <span className="lp-trust-chip">Começa em 5 dias</span>
            </div>
          </div>

          <div className="lp-hero-right" style={{ position: "relative" }}>
            <div className="lp-float-badge lp-float-1">
              <div className="fb-label">Alcance este mês</div>
              <div className="fb-val"><span>↑ 38%</span> vs. mês anterior</div>
            </div>
            <div className="lp-phone">
              <div className="lp-phone-notch" />
              <div className="lp-phone-header">
                <div className="lp-phone-avatar" />
                <div className="lp-phone-handle">
                  @sua_clinica
                  <small>Seguidores: 2.847</small>
                </div>
              </div>
              <div className="lp-phone-post">
                <div className="lp-phone-post-text">&ldquo;O verão chegou.<br />Sua pele está pronta?&rdquo;</div>
              </div>
              <div className="lp-phone-actions">
                <span style={{ fontSize: "1.2rem" }}>♡</span>
                <span style={{ fontSize: "1.2rem" }}>💬</span>
                <span style={{ fontSize: "1.2rem" }}>✈️</span>
              </div>
              <div className="lp-phone-caption">
                <strong>sua_clinica</strong> Hidratação profunda com ácido hialurônico — o tratamento mais pedido do verão. Link na bio para agendar ✨
              </div>
            </div>
            <div className="lp-float-badge lp-float-2">
              <div className="fb-label">Novo cliente hoje</div>
              <div className="fb-val">Veio pelo <span>Instagram</span> 🎉</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
