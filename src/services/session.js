// Sesión de admin
export const getAdminSession = () => {
  const admin = localStorage.getItem('admin');
  return admin ? JSON.parse(admin) : null;
};

export const logoutAdmin = () => {
  localStorage.removeItem('admin');
};

// Sesión de usuario (cliente/profesional)
export const getUserSession = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};