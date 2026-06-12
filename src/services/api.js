const API_BASE = 'http://localhost/BackEndSistemaTurnos/BackEndSistemaTurnos/routes'; // Ajustá esta URL a tu backend

const handleResponse = async (res) => {
  if (!res.ok) throw new Error('Error al conectar con el servidor');
  const data = await res.json();
  if (data.status !== 'success') throw new Error(data.message ?? 'Error desconocido');
  return data.data;
};

// --- Clientes ---
export const getClientes = () =>
  fetch(`${API_BASE}/api_clientes.php`).then(handleResponse);

export const getClienteById = (id) =>
  fetch(`${API_BASE}/api_clientes.php?id=${id}`).then(handleResponse);

// --- Profesionales ---
export const getProfesionales = () =>
  fetch(`${API_BASE}/api_profesionales.php`).then(handleResponse);

export const getProfesionalById = (id) =>
  fetch(`${API_BASE}/api_profesionales.php?id=${id}`).then(handleResponse);