import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Clientes from './pages/Clientes';
import Profesionales from './pages/Profesionales';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/profesionales" element={<Profesionales />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;