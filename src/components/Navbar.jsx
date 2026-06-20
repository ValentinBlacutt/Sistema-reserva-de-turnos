import { Link, useNavigate } from 'react-router-dom';
import { getAdminSession, getUserSession, logoutAdmin, logoutUser } from '../services/session';

const Navbar = () => {
  const navigate = useNavigate();
  const admin = getAdminSession();
  const user = getUserSession();

  const handleLogoutAdmin = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleLogoutUser = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pastel-primary shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/turnify-icon.png" alt="Turnify" height="48" />
          <span className="fw-bold fs-4">Turnify</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2 align-items-lg-center">

            {admin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/inicio">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profesionales">Profesionales</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogoutAdmin}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/panel">Mi Panel</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogoutUser}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

            {!admin && !user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">Iniciar sesión</Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;