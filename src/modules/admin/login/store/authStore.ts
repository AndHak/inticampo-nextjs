import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rememberUser: boolean;
  login: (username: string, remember: boolean) => void;
  logout: () => void;
}


const cookieStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    try {
      const state = JSON.parse(value);
      // If rememberUser is true, set a long expiration (e.g., 365 days)
      const expires = state.state.rememberUser ? 365 : undefined; 
      Cookies.set(name, value, { 
        expires, 
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
    } catch (e) {
      Cookies.set(name, value);
    }
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      rememberUser: false,
      login: (username, remember) => {
        set({ user: { username }, isAuthenticated: true, rememberUser: remember });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, rememberUser: false });
        Cookies.remove('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);

