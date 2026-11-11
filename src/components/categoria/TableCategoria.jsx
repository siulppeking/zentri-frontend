import { useEffect } from "react";
import { useCategoriaStore } from "../../store/useCategoriaStore"
import { useNavigate } from "react-router-dom";

export const TableCategoria = () => {

    const navigate = useNavigate();
    const fetchCategorias = useCategoriaStore(state => state.fetchCategorias);
    const categorias = useCategoriaStore(state => state.categorias);

    const fetchCategoriaById = useCategoriaStore(state => state.fetchCategoriaById);

    const handleEdit = async (id) => {
        await fetchCategoriaById(id);
        navigate('edit/' + id);
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <>
            <h1>Tabla de Categorías</h1>
            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria, index) => (
                            <tr key={categoria.id}>
                                <td>{index + 1}</td>
                                <td>{categoria.nombre}</td>
                                <td>
                                    <button onClick={() => handleEdit(categoria.id)}>Editar</button>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
