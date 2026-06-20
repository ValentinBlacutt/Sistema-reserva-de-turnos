import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerCliente } from '../services/userApi';

const Registro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cliente = await registerCliente(form);
      localStorage.setItem('user', JSON.stringify({ ...cliente, rol: 'cliente' }));
      navigate('/panel');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pb-5 d-flex justify-content-center">
      <div className="col-12 col-md-6">
        <div className="card custom-card p-4 shadow-sm">
          <div className="card-body">
            <h3 className="card-title fw-bold text-pastel-dark mb-1">
              Crear Cuenta
            </h3>
            <p className="text-muted mb-4">
              Registrate como cliente para reservar turnos.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">DNI</label>
                  <input
                    type="text"
                    name="dni"
                    className="form-control"
                    value={form.dni}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    value={form.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dev w-100 py-2 mt-2"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Registrarme'}
              </button>
            </form>

            <p className="text-muted text-center mt-3 mb-0">
              ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;