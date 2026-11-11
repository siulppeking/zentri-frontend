
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCategoriaStore } from "../../store/useCategoriaStore";
import { useFetchStore } from "../../store/useFetchStore";
import { addCategoriaSchema } from "./validation/add.categoria.schema";

export const EditCategoria = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const categoria = useCategoriaStore(state => state.categoriaSeleccionada);
    const updateCategoria = useCategoriaStore(state => state.updateCategoria);

    const error = useFetchStore(state => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(addCategoriaSchema),
        defaultValues: {
            nombre: categoria.nombre
        }
    });

    const onSubmit = async (values) => {
        const success = await updateCategoria(id, values);
        if (success) {
            navigate('/pages/categoria');
        }
    };

    return (
        <>
            <h1>Editar Categoría</h1>

            {error && (
                <p style={{ color: 'red' }} className="error">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>

                    <input
                        type="text"
                        id="nombre"
                        autoComplete="off"
                        {...register('nombre')}
                    />

                    {errors.nombre && (
                        <p className="error">
                            {errors.nombre.message}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => navigate('/pages/categoria')}
                >
                    Cancelar
                </button>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Actualizar'}
                </button>
            </form>
        </>
    );
};
