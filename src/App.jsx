import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Clientes from './pages/Clientes';
import Profesionales from './pages/Profesionales';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import Registro from './pages/Registro';
import PanelUsuario from './pages/PanelUsuario';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/registro" element={<Registro />} />

        {/* Panel Admin */}
        <Route
          path="/inicio"
          element={
            <ProtectedRoute tipo="admin">
              <Inicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute tipo="admin">
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profesionales"
          element={
            <ProtectedRoute tipo="admin">
              <Profesionales />
            </ProtectedRoute>
          }
        />

        {/* Panel Usuario (cliente/profesional) */}
        <Route
          path="/panel"
          element={
            <ProtectedRoute tipo="usuario">
              <PanelUsuario />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;