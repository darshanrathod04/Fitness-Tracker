import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  saveToken: (token: string) => Promise<void>;
  setUser: (user: User) => void;
  loadToken: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  saveToken: async (token) => {
    await SecureStore.setItemAsync("jwt", token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync("jwt");

    set({
      token,
      isAuthenticated: !!token,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("jwt");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));