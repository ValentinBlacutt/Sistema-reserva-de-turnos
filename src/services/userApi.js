const API_BASE = 'http://localhost/BackEndSistemaTurnos/routes';

const handleResponse = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Error al conectar con el servidor');
  }
  const data = await res.json();
  if (data.status !== 'success') throw new Error(data.message ?? 'Error desconocido');
  return data.data;
};

// --- Login (cliente o profesional) ---
export const loginUser = (email, password) =>
  fetch(`${API_BASE}/api_login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

// --- Registro de cliente ---
export const registerCliente = (data) =>
  fetch(`${API_BASE}/api_clientes.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);