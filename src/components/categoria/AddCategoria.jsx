import { useNavigate } from 'react-router-dom';
import { useCategoriaStore } from '../../store/useCategoriaStore';
import { useFetchStore } from '../../store/useFetchStore';
import { useState } from 'react';

export const AddCategoria = () => {
    const navigate = useNavigate();
    const addCategoria = useCategoriaStore(state => state.addCategoria);
    const error = useFetchStore(state => state.error);
    const [formValues, setFormValues] = useState({ nombre: '' });
    const [errors, setErrors] = useState({ nombre: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: '' }));
    };

    const validateForm = () => {
        const nombre = formValues.nombre.trim();
        const nextErrors = { nombre: '' };

        if (!nombre) {
            nextErrors.nombre = 'El nombre es obligatorio';
        } else if (nombre.length < 3 || nombre.length > 20) {
            nextErrors.nombre = 'El nombre debe tener entre 3 y 20 caracteres';
        }

        setErrors(nextErrors);
        return !nextErrors.nombre;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const success = await addCategoria(formValues);
        if (success) {
            navigate('/pages/categoria');
        }
    };

    return (
        <div className="container-fluid px-0">
            <h1 className="h3 fw-bold mb-1">Nueva categoría</h1>
            <p className="text-secondary mb-4">Agrega una categoría para organizar tus movimientos.</p>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
                            <input
                                id="nombre"
                                name="nombre"
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                value={formValues.nombre}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/pages/categoria')}>Cancelar</button>
                            <button type="submit" className="btn text-white category-primary-button">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
