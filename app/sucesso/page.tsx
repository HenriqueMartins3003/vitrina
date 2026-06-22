import Link from "next/link";

export default function Sucesso() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--dark)" }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-8 w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          <svg
            width="36"
            height="36"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          className="font-display font-700 text-white mb-4"
          style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}
        >
          Pagamento confirmado! 🎉
        </h1>

        <p className="text-gray-400 leading-relaxed mb-8">
          Bem-vindo à Vitrina. Em instantes você receberá um email com os
          próximos passos — contrato, briefing e acesso às redes. Qualquer
          dúvida, estamos no WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Falar no WhatsApp
          </a>
          <Link href="/" className="btn-ghost">
            Voltar ao início
          </Link>
        </div>

        {/* Next steps */}
        <div
          className="mt-12 p-6 rounded-2xl text-left"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-xs text-gray-500 uppercase tracking-widest mb-4"
          >
            Seus próximos passos
          </p>
          {[
            "Assinar o contrato digital (chegará por email em instantes)",
            "Preencher o briefing do seu negócio",
            "Conectar Instagram e TikTok pelo link seguro",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <span
                className="step-badge"
                style={{ width: 24, height: 24, fontSize: "11px" }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-gray-400">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
