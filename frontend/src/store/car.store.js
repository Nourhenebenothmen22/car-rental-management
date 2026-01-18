import { create } from "zustand";
import { 
  getCarsApi, 
  getCarByIdApi, 
  getCarsByOwnerApi, 
  createCarApi,
  updateCarApi,
  deleteCarApi
} from "../services/car.service";

export const useCarStore = create((set, get) => ({
  cars: [],
  currentCar: null,
  ownerCars: [],
  loading: false,
  error: null,

  // Fetch all cars
  fetchCars: async (skip = 0, limit = 100) => {
    set({ loading: true, error: null });
    try {
      const data = await getCarsApi(skip, limit);
      set({ cars: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to fetch cars", loading: false });
    }
  },

  // Fetch single car
  fetchCarById: async (id) => {
    set({ loading: true, error: null, currentCar: null });
    try {
      const data = await getCarByIdApi(id);
      set({ currentCar: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to fetch car details", loading: false });
    }
  },

  // Fetch owner cars
  fetchOwnerCars: async (ownerId) => {
    set({ loading: true, error: null });
    try {
      const data = await getCarsByOwnerApi(ownerId);
      set({ ownerCars: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to fetch owner cars", loading: false });
    }
  },

  // Create car
  addCar: async (carData) => {
    set({ loading: true, error: null });
    try {
      const newCar = await createCarApi(carData);
      set((state) => ({ 
        cars: [...state.cars, newCar], 
        ownerCars: [...state.ownerCars, newCar],
        loading: false 
      }));
      return newCar;
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to create car", loading: false });
      throw error;
    }
  },

  // Update car
  updateCar: async (carId, carData) => {
    set({ loading: true, error: null });
    try {
      const updatedCar = await updateCarApi(carId, carData);
      set((state) => ({
        cars: state.cars.map((c) => (c.id === carId ? updatedCar : c)),
        ownerCars: state.ownerCars.map((c) => (c.id === carId ? updatedCar : c)),
        currentCar: state.currentCar?.id === carId ? updatedCar : state.currentCar,
        loading: false
      }));
      return updatedCar;
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to update car", loading: false });
      throw error;
    }
  },

  // Delete car
  deleteCar: async (carId) => {
    set({ loading: true, error: null });
    try {
      await deleteCarApi(carId);
      set((state) => ({
        cars: state.cars.filter((c) => c.id !== carId),
        ownerCars: state.ownerCars.filter((c) => c.id !== carId),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.detail || "Failed to delete car", loading: false });
      throw error;
    }
  },
}));
