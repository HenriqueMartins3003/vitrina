import Link from "next/link";

export default function Cancelado() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--dark)" }}
    >
      <div className="max-w-md w-full text-center">
        <div
          className="mx-auto mb-8 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </div>

        <h1
          className="font-display font-700 text-white mb-3"
          style={{ fontSize: "1.8rem", letterSpacing: "-0.02em" }}
        >
          Pagamento cancelado
        </h1>
        <p className="text-gray-500 mb-8">
          Não tem problema. Você pode voltar a qualquer momento e escolher o seu
          plano.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#planos" className="btn-primary" style={{ animation: "none" }}>
            Ver planos novamente
          </Link>
          <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Tem dúvidas? Fala comigo
          </a>
        </div>
      </div>
    </main>
  );
}
