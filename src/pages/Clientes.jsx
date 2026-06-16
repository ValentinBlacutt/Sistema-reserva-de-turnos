import { useEffect, useMemo, useState } from 'react';
import { getClientes } from '../services/api';

const inicialesColor = (nombre) => {
  const colores = ['#7B9EA6', '#9DB2BF', '#8FA8B2', '#6B8F9A', '#5C7F8A'];
  const i = (nombre?.charCodeAt(0) ?? 0) % colores.length;
  return colores[i];
};

const iniciales = (nombre, apellido) =>
  `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase();

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    getClientes()
      .then(setClientes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Búsqueda por nombre, apellido o DNI
  const filtrados = useMemo(() => {
    const termino = busqueda.toLowerCase();
    return clientes.filter((c) => {
      const nombreCompleto = `${c.nombre ?? ''} ${c.apellido ?? ''}`.toLowerCase();
      const dni = (c.dni ?? '').toString().toLowerCase();
      return nombreCompleto.includes(termino) || dni.includes(termino);
    });
  }, [clientes, busqueda]);

  return (
    <div className="container mt-5 pb-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold mb-1 title-gradient">Clientes</h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            Listado completo de clientes registrados en el sistema.
          </p>
        </div>
      </div>

      {/* Buscador */}
      {!loading && !error && clientes.length > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-7">
            <div className="position-relative">
              <input
                type="text"
                className="form-control custom-input ps-5"
                placeholder="Buscar por nombre, apellido o DNI..."
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
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status" />
          <p className="text-muted mt-3">Cargando clientes...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger rounded-3" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && clientes.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No hay clientes registrados todavía.</p>
        </div>
      )}

      {!loading && !error && clientes.length > 0 && filtrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No se encontraron clientes con esos criterios.</p>
        </div>
      )}

      {!loading && !error && filtrados.length > 0 && (
        <>
          <div className="row g-3">
            {filtrados.map((cliente) => (
              <div key={cliente.id} className="col-12 col-md-6">
                <div className="card custom-card shadow-sm p-3 h-100">
                  <div className="d-flex align-items-center gap-3">
                    {/* Avatar con iniciales */}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 52,
                        height: 52,
                        backgroundColor: inicialesColor(cliente.nombre),
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      {iniciales(cliente.nombre, cliente.apellido)}
                    </div>

                    {/* Info principal */}
                    <div className="flex-grow-1 min-width-0">
                      <div className="fw-semibold text-pastel-dark">
                        {cliente.nombre} {cliente.apellido}
                      </div>
                      <div className="text-muted small mt-1">{cliente.email}</div>
                      <div className="d-flex gap-3 mt-1">
                        {cliente.telefono && (
                          <span className="text-muted small">
                            📞 {cliente.telefono}
                          </span>
                        )}
                        {cliente.dni && (
                          <span className="text-muted small">
                            DNI {cliente.dni}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted small mt-3 px-1">
            {filtrados.length} de {clientes.length} cliente{clientes.length !== 1 ? 's' : ''}
          </p>
        </>
      )}
    </div>
  );
};

export default Clientes;