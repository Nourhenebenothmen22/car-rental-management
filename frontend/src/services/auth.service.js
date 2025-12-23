import axios from "axios";

// Get the API URL from the environment variables (Vite)
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Register a new user
 * @param {Object} data - User registration data (name, email, password, role)
 * @returns {Promise} Response from the server (user info including role)
 */
export const registerApi = async (data) => {
  // Send POST request to /auth/register endpoint
  const response = await axios.post(`${API_URL}/auth/register`, data);
  // response.data should include: { user: { name, email, role }, token }
  return response.data;
};

/**
 * Login a user
 * @param {Object} data - Login credentials (email, password)
 * @returns {Promise} Response containing user info and token (including role)
 */
export const loginApi = async (data) => {
  // Send POST request to /auth/login endpoint
  const response = await axios.post(`${API_URL}/auth/login`, data);
  // response.data should include: { user: { name, email, role }, token }
  return response.data;
};

/**
 * Logout the current user
 * @returns {Promise} Response from the server
 */
export const logoutApi = async () => {
  // Send POST request to /auth/logout endpoint
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};
