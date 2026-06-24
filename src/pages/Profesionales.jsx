import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProfesionales,
  createProfesional,
  updateProfesional,
  deleteProfesional,
  getEspecialidades,
} from '../services/api';

const FORM_VACIO = {
  nombre: '',
  apellido: '',
  dni: '',
  email: '',
  password: '',
  especialidad_ids: [],
  descripcion: '',
};

const inicialesColor = (nombre) => {
  const colores = ['#7B9EA6', '#9DB2BF', '#8FA8B2', '#6B8F9A', '#5C7F8A'];
  const i = (nombre?.charCodeAt(0) ?? 0) % colores.length;
  return colores[i];
};

const iniciales = (nombre, apellido) =>
  `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase();

const Profesionales = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [especialidadFiltro, setEspecialidadFiltro] = useState('todas');
  const [refresh, setRefresh] = useState(0);

  // Modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [errorModal, setErrorModal] = useState(null);

  // Confirm eliminar
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  useEffect(() => {
    let activo = true;
    Promise.all([getProfesionales(), getEspecialidades()])
      .then(([profs, esps]) => {
        if (activo) {
          setProfesionales(profs);
          setEspecialidades(esps);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (activo) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { activo = false; };
  }, [refresh]);

  const especialidadesUnicas = useMemo(() => {
    const set = new Set(
      profesionales.flatMap((p) => p.especialidades ?? []).filter(Boolean)
    );
    return Array.from(set).sort();
  }, [profesionales]);

  const filtrados = useMemo(() => {
    return profesionales.filter((p) => {
      const nombreCompleto = `${p.nombre ?? ''} ${p.apellido ?? ''}`.toLowerCase();
      const coincideNombre = nombreCompleto.includes(busqueda.toLowerCase());
      const coincideEspecialidad =
        especialidadFiltro === 'todas' ||
        (p.especialidades ?? []).includes(especialidadFiltro);
      return coincideNombre && coincideEspecialidad;
    });
  }, [profesionales, busqueda, especialidadFiltro]);

  const abrirModalNuevo = () => {
    setForm(FORM_VACIO);
    setModoEdicion(false);
    setIdEditando(null);
    setErrorModal(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (prof) => {
    setForm({
      nombre: prof.nombre ?? '',
      apellido: prof.apellido ?? '',
      dni: prof.dni ?? '',
      email: prof.email ?? '',
      password: '',
      especialidad_ids: prof.especialidad_ids ?? [],
      descripcion: prof.descripcion ?? '',
    });
    setModoEdicion(true);
    setIdEditando(prof.id);
    setErrorModal(null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setErrorModal(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEspecialidad = (id) => {
    setForm((prev) => {
      const ids = prev.especialidad_ids.includes(id)
        ? prev.especialidad_ids.filter((i) => i !== id)
        : [...prev.especialidad_ids, id];
      return { ...prev, especialidad_ids: ids };
    });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setErrorModal(null);
    try {
      if (modoEdicion) {
        await updateProfesional(idEditando, form);
      } else {
        await createProfesional(form);
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
      await deleteProfesional(id);
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
          <h1 className="fw-bold mb-1 title-gradient">Profesionales</h1>
          <div className="title-underline"></div>
          <p className="text-muted fs-5 mt-2">
            Listado completo de profesionales registrados en el sistema.
          </p>
        </div>
        <div className="col-auto d-flex gap-2">
          <Link to="/especialidades" className="btn btn-outline-secondary px-3 py-2">
            🏷️ Especialidades
          </Link>
          <button className="btn btn-dev px-4 py-2" onClick={abrirModalNuevo}>
            + Nuevo profesional
          </button>
        </div>
      </div>

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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9DB2BF"
                className="bi bi-search position-absolute" viewBox="0 0 16 16"
                style={{ top: '50%', left: 16, transform: 'translateY(-50%)' }}>
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
              {especialidadesUnicas.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
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

      {error && <div className="alert alert-danger rounded-3">{error}</div>}

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
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 52, height: 52,
                        backgroundColor: inicialesColor(prof.nombre),
                        color: '#fff', fontWeight: 600, fontSize: 18,
                      }}
                    >
                      {iniciales(prof.nombre, prof.apellido)}
                    </div>

                    <div className="flex-grow-1 min-width-0">
                      <div className="fw-semibold text-pastel-dark">
                        {prof.nombre} {prof.apellido}
                      </div>
                      <div className="text-muted small mt-1">{prof.email}</div>
                      {/* Badges de especialidades */}
                      {prof.especialidades?.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mt-2">
                          {prof.especialidades.map((esp) => (
                            <span
                              key={esp}
                              className="badge rounded-pill px-2 py-1"
                              style={{ backgroundColor: '#e8f0f3', color: '#5C7F8A', fontSize: 11 }}
                            >
                              {esp}
                            </span>
                          ))}
                        </div>
                      )}
                      {prof.descripcion && (
                        <div className="text-muted small mt-1 fst-italic">{prof.descripcion}</div>
                      )}
                    </div>

                    <div className="d-flex flex-column gap-2 flex-shrink-0">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => abrirModalEditar(prof)} title="Editar">✏️</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmEliminar(prof.id)} title="Eliminar">🗑️</button>
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

      {/* Modal crear/editar */}
      {modalAbierto && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content custom-card border-0">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-pastel-dark">
                  {modoEdicion ? 'Editar profesional' : 'Nuevo profesional'}
                </h5>
                <button className="btn-close" onClick={cerrarModal} />
              </div>
              <div className="modal-body">
                {errorModal && <div className="alert alert-danger py-2 small">{errorModal}</div>}
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">Nombre</label>
                    <input name="nombre" className="form-control custom-input" value={form.nombre} onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">Apellido</label>
                    <input name="apellido" className="form-control custom-input" value={form.apellido} onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">DNI</label>
                    <input name="dni" className="form-control custom-input" value={form.dni} onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted">Email</label>
                    <input name="email" type="email" className="form-control custom-input" value={form.email} onChange={handleChange} />
                  </div>
                  {!modoEdicion && (
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Contraseña</label>
                      <input name="password" type="password" className="form-control custom-input" value={form.password} onChange={handleChange} />
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted d-block mb-2">Especialidades</label>
                    {especialidades.length === 0 ? (
                      <p className="text-muted small fst-italic">
                        No hay especialidades cargadas. Agregá desde el catálogo primero.
                      </p>
                    ) : (
                      <div className="d-flex flex-wrap gap-2">
                        {especialidades.map((esp) => {
                          const seleccionada = form.especialidad_ids.includes(esp.id);
                          return (
                            <button
                              key={esp.id}
                              type="button"
                              onClick={() => toggleEspecialidad(esp.id)}
                              className="btn btn-sm rounded-pill"
                              style={{
                                backgroundColor: seleccionada ? '#5C7F8A' : '#e8f0f3',
                                color: seleccionada ? '#fff' : '#5C7F8A',
                                border: 'none',
                                fontSize: 13,
                                transition: 'all 0.15s',
                              }}
                            >
                              {seleccionada ? '✓ ' : ''}{esp.nombre}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Descripción</label>
                    <textarea name="descripcion" className="form-control custom-input" rows={3} value={form.descripcion} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button className="btn btn-outline-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-dev px-4" onClick={handleGuardar} disabled={guardando}>
                  {guardando ? 'Guardando...' : modoEdicion ? 'Guardar cambios' : 'Crear profesional'}
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
              <h6 className="fw-bold text-pastel-dark mb-2">¿Eliminar profesional?</h6>
              <p className="text-muted small mb-4">Esta acción no se puede deshacer.</p>
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

export default Profesionales;