import api from "./api";

/**
 * Fetch all bookings (Admin/Owner)
 */
export const getBookingsApi = async () => {
  const response = await api.get("/bookings/");
  return response.data;
};

/**
 * Create a new booking
 */
export const createBookingApi = async (bookingData) => {
  const response = await api.post("/bookings/", bookingData);
  return response.data;
};

/**
 * Fetch bookings for a specific user
 */
export const getUserBookingsApi = async (userId) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

/**
 * Fetch bookings received by a specific car owner
 */
export const getOwnerBookingsApi = async (ownerId) => {
  const response = await api.get(`/bookings/owner/${ownerId}`);
  return response.data;
};

/**
 * Update a booking (confirm/cancel)
 */
export const updateBookingApi = async (bookingId, bookingUpdate) => {
  const response = await api.put(`/bookings/${bookingId}`, bookingUpdate);
  return response.data;
};

/**
 * Delete/Cancel a booking
 */
export const deleteBookingApi = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

