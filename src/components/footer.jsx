const Footer = () => {
  return (
    <footer className="app-footer mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-2">
          <img src="/turnify-icon.png" alt="Turnify" height="22" />
          <span className="footer-brand">Turnify</span>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Turnify — Todos los derechos reservados</span>
        <span className="footer-version">v1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;