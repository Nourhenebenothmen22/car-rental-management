import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, registerApi, logoutApi } from "../services/auth.service";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,           // { name, email, role }
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Async Login Action
      loginAction: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await loginApi(credentials);
          set({
            user: res.user,
            token: res.access_token,
            isAuthenticated: true,
            loading: false,
          });
          return res.user;
        } catch (error) {
          set({ error: error.response?.data?.detail || "Login failed", loading: false });
          throw error;
        }
      },

      // Async Register Action
      registerAction: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await registerApi(data);
          set({ loading: false });
          return res;
        } catch (error) {
          set({ error: error.response?.data?.detail || "Registration failed", loading: false });
          throw error;
        }
      },

      // Async Logout Action
      logoutAction: () => {
        logoutApi();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // Deprecated simple setters (keeping for backward compatibility if needed, but should rely on actions)
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage, // persistent storage
    }
  )
);

