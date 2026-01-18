import api from "./api";

/**
 * Fetch all cars with optional pagination
 */
export const getCarsApi = async (skip = 0, limit = 100) => {
  const response = await api.get("/cars/", { params: { skip, limit } });
  return response.data;
};

/**
 * Fetch a single car by ID
 */
export const getCarByIdApi = async (carId) => {
  const response = await api.get(`/cars/${carId}`);
  return response.data;
};

/**
 * Fetch cars owned by a specific user
 */
export const getCarsByOwnerApi = async (ownerId) => {
  const response = await api.get(`/cars/owner/${ownerId}`);
  return response.data;
};

/**
 * Create a new car (supports image upload)
 */
export const createCarApi = async (carFormData) => {
  const response = await api.post("/cars/", carFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Update an existing car
 */
export const updateCarApi = async (carId, carFormData) => {
  const response = await api.put(`/cars/${carId}`, carFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete a car
 */
export const deleteCarApi = async (carId) => {
  const response = await api.delete(`/cars/${carId}`);
  return response.data;
};

