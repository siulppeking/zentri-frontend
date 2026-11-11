import { create } from 'zustand';
import { useFetchStore } from './useFetchStore';
import {
    listarCategoriasService,
    crearCategoriaService,
    buscarCategoriaService,
    actualizarCategoriaService,
    eliminarCategoriaService
} from '../services/categoria.service';

export const useCategoriaStore = create((set, get) => ({
    categorias: [],
    categoriaSeleccionada: null,

    setCategoriaSeleccionada: (categoria) => {
        useFetchStore.getState().clear();
        set({ categoriaSeleccionada: categoria });
    },

    fetchCategorias: async () => {
        const { setCargando, clearFetch, handleApiError } = useFetchStore.getState();
        clearFetch();
        setCargando(true);
        try {
            const data = await listarCategoriasService();
            set({ categorias: data });
        } catch (err) {
            handleApiError(err, 'Error al obtener la lista de categorias.');
        } finally {
            setCargando(false);
        }
    },

    fetchCategoriaById: async (id) => {
        const { setCargando, clearFetch, handleApiError } = useFetchStore.getState();

        clearFetch();
        set({ categoriaSeleccionada: null });
        setCargando(true);

        try {
            const data = await buscarCategoriaService(id);
            set({ categoriaSeleccionada: data });
        } catch (err) {
            handleApiError(err, 'Error al consultar la categoría.');
        } finally {
            setCargando(false);
        }
    },

    addCategoria: async (nuevaCategoria) => {
        const { setCargando, clearFetch, handleApiError } = useFetchStore.getState();
        clearFetch();
        setCargando(true);
        try {
            const categoriaCreada = await crearCategoriaService(nuevaCategoria);
            set({ categorias: [categoriaCreada, ...get().categorias] });
            return true;
        } catch (err) {
            handleApiError(err, 'Error al registrar la categoria.');
            return false;
        } finally {
            setCargando(false);
        }
    },

    updateCategoria: async (id, categoriaActualizada) => {
        const { setCargando, clearFetch, handleApiError } = useFetchStore.getState();
        clearFetch();
        setCargando(true);
        try {
            const categoriaModificada = await actualizarCategoriaService(id, categoriaActualizada);
            const listaActualizada = get().categorias.map((c) =>
                Number(c.id) === Number(id) ? categoriaModificada : c
            );
            set({ categorias: listaActualizada, categoriaSeleccionada: null });
            return true;
        } catch (err) {
            handleApiError(err, 'Error al actualizar la categoria.');
            return false;
        } finally {
            setCargando(false);
        }
    },

    deleteCategoria: async (id) => {
        const { setCargando, clearFetch, handleApiError } = useFetchStore.getState();
        clearFetch();
        setCargando(true);
        try {
            await eliminarCategoriaService(id);
            const listaFiltrada = get().categorias.filter((c) => Number(c.id) !== Number(id));
            set({ categorias: listaFiltrada, categoriaSeleccionada: null });
        } catch (err) {
            handleApiError(err, 'Error al eliminar la categoria.');
        } finally {
            setCargando(false);
        }
    }
}));
