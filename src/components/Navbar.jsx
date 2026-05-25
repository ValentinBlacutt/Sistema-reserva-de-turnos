import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pastel-primary shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">Turnify</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link className="nav-link active fw-semibold" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link opacity-50" style={{ cursor: 'not-allowed' }}>Profesionales</span>
            </li>
            <li className="nav-item">
              <span className="nav-link opacity-50" style={{ cursor: 'not-allowed' }}>Clientes</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;