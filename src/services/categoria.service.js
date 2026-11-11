import { http } from "../config/axios.config";

export const listarCategoriasService = async () => {
    const response = await http.get("/api/categorias");
    return response.data;
}

export const crearCategoriaService = async (categoriaData) => {
    const response = await http.post("/api/categorias", categoriaData);
    return response.data;
}

export const buscarCategoriaService = async (id) => {
    const response = await http.get(`/api/categorias/${id}`);
    return response.data;
}

export const actualizarCategoriaService = async (id, categoriaData) => {
    const response = await http.put(`/api/categorias/${id}`, categoriaData);
    return response.data;
}

export const eliminarCategoriaService = async (id) => {
    const response = await http.delete(`/api/categorias/${id}`);
    return response.data;
}