import { useEffect, useMemo, useState } from 'react';
import { getProfesionales } from '../services/api';

const inicialesColor = (nombre) => {
  const colores = ['#7B9EA6', '#9DB2BF', '#8FA8B2', '#6B8F9A', '#5C7F8A'];
  const i = (nombre?.charCodeAt(0) ?? 0) % colores.length;
  return colores[i];
};

const iniciales = (nombre, apellido) =>
  `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase();

const Profesionales = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [especialidadFiltro, setEspecialidadFiltro] = useState('todas');

  useEffect(() => {
    getProfesionales()
      .then(setProfesionales)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Lista única de especialidades para el select
  const especialidades = useMemo(() => {
    const set = new Set(profesionales.map((p) => p.especialidad).filter(Boolean));
    return Array.from(set).sort();
  }, [profesionales]);

  // Aplicar búsqueda + filtro
  const filtrados = useMemo(() => {
    return profesionales.filter((p) => {
      const nombreCompleto = `${p.nombre ?? ''} ${p.apellido ?? ''}`.toLowerCase();
      const coincideNombre = nombreCompleto.includes(busqueda.toLowerCase());
      const coincideEspecialidad =
        especialidadFiltro === 'todas' || p.especialidad === especialidadFiltro;
      return coincideNombre && coincideEspecialidad;
    });
  }, [profesionales, busqueda, especialidadFiltro]);

  return (
    <div className="container mt-5 pb-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold mb-1 title-gradient">Profesionales</h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            Listado completo de profesionales registrados en el sistema.
          </p>
        </div>
      </div>

      {/* Buscador y filtro */}
      {!loading && !error && profesionales.length > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-7">
            <div className="position-relative">
              <input
                type="text"
                className="form-control custom-input ps-5"
                placeholder="Buscar por nombre o apellido..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#9DB2BF"
                className="bi bi-search position-absolute"
                viewBox="0 0 16 16"
                style={{ top: '50%', left: 16, transform: 'translateY(-50%)' }}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <select
              className="form-select custom-input"
              value={especialidadFiltro}
              onChange={(e) => setEspecialidadFiltro(e.target.value)}
            >
              <option value="todas">Todas las especialidades</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status" />
          <p className="text-muted mt-3">Cargando profesionales...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger rounded-3" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && profesionales.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No hay profesionales registrados todavía.</p>
        </div>
      )}

      {!loading && !error && profesionales.length > 0 && filtrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No se encontraron profesionales con esos criterios.</p>
        </div>
      )}

      {!loading && !error && filtrados.length > 0 && (
        <>
          <div className="row g-3">
            {filtrados.map((prof) => (
              <div key={prof.id} className="col-12 col-md-6">
                <div className="card custom-card shadow-sm p-3 h-100">
                  <div className="d-flex align-items-center gap-3">
                    {/* Avatar con iniciales */}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 52,
                        height: 52,
                        backgroundColor: inicialesColor(prof.nombre),
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      {iniciales(prof.nombre, prof.apellido)}
                    </div>

                    {/* Info principal */}
                    <div className="flex-grow-1 min-width-0">
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="fw-semibold text-pastel-dark">
                          {prof.nombre} {prof.apellido}
                        </span>
                        {prof.especialidad && (
                          <span
                            className="badge rounded-pill px-2 py-1"
                            style={{
                              backgroundColor: '#e8f0f3',
                              color: '#5C7F8A',
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {prof.especialidad}
                          </span>
                        )}
                      </div>
                      <div className="text-muted small mt-1">{prof.email}</div>
                      {prof.descripcion && (
                        <div className="text-muted small mt-1 fst-italic">
                          {prof.descripcion}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted small mt-3 px-1">
            {filtrados.length} de {profesionales.length} profesional{profesionales.length !== 1 ? 'es' : ''}
          </p>
        </>
      )}
    </div>
  );
};

export default Profesionales;