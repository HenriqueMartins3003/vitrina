export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 pb-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fadeUp delay-100 flex justify-center mb-6">
          <span
            className="pill"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#86efac",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Gestão de redes sociais automatizada
          </span>
        </div>

        {/* Heading */}
        <h1
          className="animate-fadeUp delay-200 font-display font-800 leading-tight mb-6"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
        >
          Seu Instagram e TikTok{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient">sempre ativos.</span>
          <br className="hidden sm:block" />
          Sem você fazer nada.
        </h1>

        {/* Subheading */}
        <p
          className="animate-fadeUp delay-300 text-gray-400 max-w-2xl mx-auto mb-10"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7 }}
        >
          Criamos o conteúdo, você aprova em 1 clique, a gente publica.
          Feito para negócios locais que não têm tempo — nem equipe — para
          cuidar das redes.
        </p>

        {/* CTA buttons */}
        <div className="animate-fadeUp delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#planos" className="btn-primary">
            Ver planos e preços
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#como-funciona" className="btn-ghost">
            Como funciona
          </a>
        </div>

        {/* Social proof numbers */}
        <div className="animate-fadeUp delay-500 flex flex-wrap justify-center gap-8 mt-16">
          {[
            { value: "3 toques", label: "para o cliente começar" },
            { value: "100%", label: "publicação automática" },
            { value: "sem senha", label: "acesso às redes" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p
                className="font-display font-700 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fadeUp delay-600 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#6b7280" }}
      >
        <span className="text-xs">scroll</span>
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          style={{ animation: "fadeUp 1s ease-in-out infinite alternate" }}
        >
          <path d="M8 0v16M2 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
