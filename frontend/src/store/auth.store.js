import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,           // { name, email, role }
      token: null,
      isAuthenticated: false,

      // Login with user info including role
      login: (user, token) =>
        set({
          user,             
          token,
          isAuthenticated: true,
        }),

      register: (user, token) =>
        set({
          user,             
          token,
          isAuthenticated: true,
        }),

      // Logout clears everything
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
