import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/userApi';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await loginUser(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/panel');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pb-5 d-flex justify-content-center">
      <div className="col-12 col-md-5">
        <div className="card custom-card p-4 shadow-sm">
          <div className="card-body">
            <h3 className="card-title fw-bold text-pastel-dark mb-1">
              Iniciar Sesión
            </h3>
            <p className="text-muted mb-4">
              Ingresá con tu cuenta de cliente o profesional.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <p className="text-muted text-center mt-3 mb-0">
              ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;