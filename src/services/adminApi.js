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

// --- Admin ---
export const loginAdmin = (email, password) =>
  fetch(`${API_BASE}/api_admin.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);