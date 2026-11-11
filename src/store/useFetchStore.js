import { create } from 'zustand';

export const useFetchStore = create((set) => ({
    cargando: false,
    error: null,

    setCargando: (cargando) => set({ cargando }),
    setError: (error) => set({ error }),
    clearFetch: () => set({ cargando: false, error: null }),

    handleApiError: (err, mensajePorDefecto) => {
        const apiError = err.response?.data;
        set({
            error: apiError?.message || mensajePorDefecto,
            cargando: false
        });
    }
}));