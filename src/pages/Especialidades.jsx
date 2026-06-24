import { useEffect, useState } from 'react';
import {
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from '../services/api';

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorModal, setErrorModal] = useState(null);

  // Confirm eliminar
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  useEffect(() => {
    let activo = true;
    getEspecialidades()
      .then((data) => { if (activo) { setEspecialidades(data); setLoading(false); } })
      .catch((err) => { if (activo) { setError(err.message); setLoading(false); } });
    return () => { activo = false; };
  }, [refresh]);

  const abrirModalNuevo = () => {
    setNombre('');
    setModoEdicion(false);
    setIdEditando(null);
    setErrorModal(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (esp) => {
    setNombre(esp.nombre);
    setModoEdicion(true);
    setIdEditando(esp.id);
    setErrorModal(null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setErrorModal(null);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setErrorModal(null);
    try {
      if (modoEdicion) {
        await updateEspecialidad(idEditando, { nombre });
      } else {
        await createEspecialidad({ nombre });
      }
      cerrarModal();
      setRefresh((r) => r + 1);
    } catch (err) {
      setErrorModal(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteEspecialidad(id);
      setConfirmEliminar(null);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="fw-bold mb-1 title-gradient">Especialidades</h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            Catálogo de especialidades disponibles en el sistema.
          </p>
        </div>
        <div className="col-auto">
          <button className="btn btn-dev px-4 py-2" onClick={abrirModalNuevo}>
            + Nueva especialidad
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status" />
          <p className="text-muted mt-3">Cargando especialidades...</p>
        </div>
      )}

      {error && <div className="alert alert-danger rounded-3">{error}</div>}

      {!loading && !error && especialidades.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No hay especialidades registradas todavía.</p>
        </div>
      )}

      {!loading && !error && especialidades.length > 0 && (
        <>
          <div className="card custom-card shadow-sm">
            <ul className="list-group list-group-flush">
              {especialidades.map((esp) => (
                <li
                  key={esp.id}
                  className="list-group-item d-flex align-items-center justify-content-between py-3 px-4"
                >
                  <span className="fw-semibold text-pastel-dark">{esp.nombre}</span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => abrirModalEditar(esp)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setConfirmEliminar(esp.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted small mt-3 px-1">
            {especialidades.length} especialidad{especialidades.length !== 1 ? 'es' : ''} en el catálogo
          </p>
        </>
      )}

      {/* Modal crear/editar */}
      {modalAbierto && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content custom-card border-0">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-pastel-dark">
                  {modoEdicion ? 'Editar especialidad' : 'Nueva especialidad'}
                </h5>
                <button className="btn-close" onClick={cerrarModal} />
              </div>
              <div className="modal-body">
                {errorModal && (
                  <div className="alert alert-danger py-2 small">{errorModal}</div>
                )}
                <label className="form-label small fw-semibold text-muted">Nombre</label>
                <input
                  className="form-control custom-input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Kinesiología"
                  onKeyDown={(e) => e.key === 'Enter' && handleGuardar()}
                />
              </div>
              <div className="modal-footer border-0 pt-0">
                <button className="btn btn-outline-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-dev px-4" onClick={handleGuardar} disabled={guardando}>
                  {guardando ? 'Guardando...' : modoEdicion ? 'Guardar cambios' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {confirmEliminar && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content custom-card border-0 text-center p-4">
              <div className="fs-1 mb-2">🗑️</div>
              <h6 className="fw-bold text-pastel-dark mb-2">¿Eliminar especialidad?</h6>
              <p className="text-muted small mb-4">
                Se quitará de todos los profesionales que la tengan asignada.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-secondary" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
                <button className="btn btn-danger" onClick={() => handleEliminar(confirmEliminar)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Especialidades;