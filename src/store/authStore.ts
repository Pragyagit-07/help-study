import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  token: string | null;
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: async (username, password) => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', { username, password });
      set({ token: res.data.token, user: res.data });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Login failed', err);
    }
  },
  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
  },
}));
