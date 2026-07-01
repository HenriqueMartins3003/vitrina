export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-wrap">
        <div className="lp-foot-inner">
          <a href="#" className="lp-logo">
            Vitrina<span className="lp-logo-dot" />
          </a>
          <p>© {new Date().getFullYear()} Vitrina. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
