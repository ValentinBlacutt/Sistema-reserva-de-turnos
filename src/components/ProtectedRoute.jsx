import { Navigate } from 'react-router-dom';
import { getAdminSession, getUserSession } from '../services/session';

const ProtectedRoute = ({ children, tipo = 'admin' }) => {
  const session = tipo === 'admin' ? getAdminSession() : getUserSession();
  const loginPath = tipo === 'admin' ? '/admin/login' : '/login';

  if (!session) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

export default ProtectedRoute;