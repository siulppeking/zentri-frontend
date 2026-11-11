import { create } from "zustand";

export const useAuthStore = create((set) => ({
    status: 'checking', // 'checking' | 'authenticated' | 'no-authenticated'
    usuario: null,

    loginSuccess: (usuario) => {
        set({
            usuario,
            status: 'authenticated'
        });
    },
    logout: () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
        set({
            usuario: null,
            status: 'no-authenticated'
        });
    },
    addToken: (token) => {
        localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token);
    },
    removeToken: () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    }
}));