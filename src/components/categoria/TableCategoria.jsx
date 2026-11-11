import { useEffect } from "react";
import { useCategoriaStore } from "../../store/useCategoriaStore";
import { useNavigate } from "react-router-dom";
import { useFetchStore } from "../../store/useFetchStore";

export const TableCategoria = () => {
    const navigate = useNavigate();
    const fetchCategorias = useCategoriaStore(state => state.fetchCategorias);
    const categorias = useCategoriaStore(state => state.categorias);
    const fetchCategoriaById = useCategoriaStore(state => state.fetchCategoriaById);
    const deleteCategoria = useCategoriaStore(state => state.deleteCategoria);
    const cargando = useFetchStore(state => state.cargando);
    const error = useFetchStore(state => state.error);

    const handleEdit = async (id) => {
        const categoria = await fetchCategoriaById(id);
        if (categoria) navigate(`edit/${id}`);
    };

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    const handleDelete = async (categoria) => {
        if (window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
            await deleteCategoria(categoria.id);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
                {error && <div className="alert alert-danger m-3" role="alert">{error}</div>}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="category-table-head">
                            <tr>
                                <th className="ps-4">N°</th>
                                <th>Nombre</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && categorias.length === 0 && (
                                <tr><td colSpan="3" className="text-center py-4 text-secondary">Cargando categorías...</td></tr>
                            )}
                            {!cargando && categorias.length === 0 && (
                                <tr><td colSpan="3" className="text-center py-4 text-secondary">No hay categorías registradas.</td></tr>
                            )}
                            {categorias.map((categoria, index) => (
                                <tr key={categoria.id}>
                                    <td className="ps-4 text-secondary">{index + 1}</td>
                                    <td className="fw-semibold">{categoria.nombre}</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm category-edit-button me-2" onClick={() => handleEdit(categoria.id)} disabled={cargando}>
                                            Editar
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(categoria)} disabled={cargando}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
