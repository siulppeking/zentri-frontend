import { useNavigate } from 'react-router-dom';
import { useCategoriaStore } from '../../store/useCategoriaStore';
import { addCategoriaSchema } from './validation/add.categoria.schema'
import { useFetchStore } from '../../store/useFetchStore';
import { useForm } from '../../hooks/useForm';

export const AddCategoria = () => {
    const navigate = useNavigate();
    const addCategoria = useCategoriaStore(state => state.addCategoria);
    const error = useFetchStore(state => state.error);

    const {
        formValues,
        errors,
        handleInputChange,
        isFormValid
    } = useForm({
        nombre: ''
    }, addCategoriaSchema);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) return;

        const success = await addCategoria(formValues);
        if (success) {
            navigate('/pages/categoria');
        }
    };

    return (
        <>
            <h1>Agregar Categoría</h1>
            {
                error && <p style={{ color: 'red' }} className="error">{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        name="nombre"
                        value={formValues.nombre}
                        onChange={handleInputChange}
                    />
                    {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
                </div>

                <button type="submit">Guardar</button>
            </form>
        </>
    );
};
