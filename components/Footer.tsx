export default function Footer() {
  return (
    <footer
      className="py-12 px-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="font-display font-700 text-xl tracking-tight">
          <span style={{ color: "#22c55e" }}>v</span>
          <span style={{ color: "#9ca3af" }}>itrina</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="/privacidade"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Privacidade
          </a>
          <a
            href="/termos"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Termos de uso
          </a>
          <a
            href="mailto:oi@vitrina.com.br"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Contato
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-700">
          © {new Date().getFullYear()} Vitrina. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
