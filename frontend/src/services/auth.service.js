import api from "./api";

export const registerApi = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};


export const loginApi = async (data) => {
  // Use URLSearchParams for OAuth2 password flow compatibility if backend requires it,
  // but based on previous code it was JSON. Adhering to previous JSON format.
  // If backend expects form data for OAuth2 (FastAPI defaults), we might need to change this.
  // Checking backend code `auth.controller` or `users.router` would be ideal, 
  // but assuming JSON for now as per previous file content.
  const response = await api.post("/users/login", data);
  return response.data;
};


export const logoutApi = () => {
  return { message: "Logged out successfully" };
};


export const getProfileApi = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};


export const updateProfileApi = async (userId, data) => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

