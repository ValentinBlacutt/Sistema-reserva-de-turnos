const Inicio = () => {
  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col">
          <h1 className="fw-bold mb-1 title-gradient">
            Bienvenido al Panel de Control
          </h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            Seleccione un módulo para gestionar las reservas y turnos del sistema.
          </p>
        </div>
      </div>

      <div className="row g-4">

        <div className="col-12 col-md-6">
          <div className="card custom-card h-100 p-4 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-wrapper me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9DB2BF" className="bi bi-calendar3" viewBox="0 0 16 16">
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </div>
                  <h3 className="card-title fw-bold text-pastel-dark m-0">ABM de Profesionales</h3>
                </div>
                <p className="card-text text-muted mb-4">
                  Gestione la plantilla de especialistas, asigne sus horarios de atención y configure las disciplinas disponibles.
                </p>
              </div>
              <button className="btn btn-dev w-100 py-2" disabled>
                <span className="pulse-dot"></span>
                Módulo en desarrollo
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card custom-card h-100 p-4 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-wrapper me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9DB2BF" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                    </svg>
                  </div>
                  <h3 className="card-title fw-bold text-pastel-dark m-0">Gestión de Clientes</h3>
                </div>
                <p className="card-text text-muted mb-4">
                  Administre el registro centralizado de clientes, acceda a sus datos de contacto, asigne perfiles y consulte el historial de turnos.
                </p>
              </div>
              <button className="btn btn-dev w-100 py-2" disabled>
                <span className="pulse-dot"></span>
                Módulo en desarrollo
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inicio;