import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../services/session';

const PanelUsuario = () => {
  const navigate = useNavigate();
  const session = getUserSession();

  if (!session) return null; // ProtectedRoute ya evita llegar acá sin sesión

  return (
    <div className="container mt-5 pb-5">
      <div className="row mb-5">
        <div className="col">
          <h1 className="fw-bold mb-1 title-gradient">
            Hola, {session.nombre}
          </h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            {session.rol === 'cliente'
              ? 'Gestioná tus turnos y reservas desde acá.'
              : 'Gestioná tu agenda y disponibilidad desde acá.'}
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {session.rol === 'cliente' && (
          <div className="col-12 col-md-6">
            <div className="card custom-card h-100 p-4 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h3 className="card-title fw-bold text-pastel-dark mb-3">Reservar Turno</h3>
                  <p className="card-text text-muted mb-4">
                    Buscá un profesional y reservá tu próximo turno.
                  </p>
                </div>
                <button className="btn btn-dev w-100 py-2" onClick={() => navigate('/reservar')}>
                  Reservar
                </button>
              </div>
            </div>
          </div>
        )}

        {session.rol === 'profesional' && (
          <div className="col-12 col-md-6">
            <div className="card custom-card h-100 p-4 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h3 className="card-title fw-bold text-pastel-dark mb-3">Mi Agenda</h3>
                  <p className="card-text text-muted mb-4">
                    Consultá y gestioná tus turnos asignados.
                  </p>
                </div>
                <button className="btn btn-dev w-100 py-2" onClick={() => navigate('/agenda')}>
                  Ver Agenda
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelUsuario;