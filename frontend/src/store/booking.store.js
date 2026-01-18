import { create } from "zustand";
import { 
  getBookingsApi, 
  createBookingApi, 
  getUserBookingsApi, 
  getOwnerBookingsApi, 
  updateBookingApi, 
  deleteBookingApi 
} from "../services/booking.service";

export const useBookingStore = create((set) => ({
  bookings: [], // for admin/owner or general list
  userBookings: [],
  loading: false,
  error: null,
  success: false,

  // Fetch all bookings (Admin)
  fetchAllBookings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getBookingsApi();
      set({ bookings: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to fetch bookings", loading: false });
    }
  },

  // Fetch user bookings
  fetchUserBookings: async (userId) => {
    set({ loading: true, error: null });
    try {
      const data = await getUserBookingsApi(userId);
      set({ userBookings: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to fetch your bookings", loading: false });
    }
  },

  // Fetch owner bookings
  fetchOwnerBookings: async (ownerId) => {
     set({ loading: true, error: null });
     try {
       const data = await getOwnerBookingsApi(ownerId);
       set({ bookings: data, loading: false }); // Using 'bookings' as the main list for owner/admin view
     } catch (error) {
       set({ error: error.response?.data?.detail || "Failed to fetch owner bookings", loading: false });
     }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    set({ loading: true, error: null });
    try {
      await updateBookingApi(bookingId, { status });
      // Update local state
      set((state) => ({
        bookings: state.bookings.map((b) => 
          (b.id === bookingId || b._id === bookingId) ? { ...b, status } : b
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to update booking", loading: false });
    }
  },

  // Create booking
  addBooking: async (bookingData) => {
    set({ loading: true, error: null, success: false });
    try {
      const newBooking = await createBookingApi(bookingData);
      set((state) => ({ 
        userBookings: [...state.userBookings, newBooking], 
        loading: false,
        success: true
      }));
      return newBooking;
    } catch (error) {
      set({ error: error.response?.data?.detail || "Booking failed", loading: false, success: false });
      throw error;
    }
  },

  // Reset success state
  resetSuccess: () => set({ success: false }),
}));
