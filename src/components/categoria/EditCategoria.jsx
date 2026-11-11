
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCategoriaStore } from "../../store/useCategoriaStore";
import { useFetchStore } from "../../store/useFetchStore";
import { useState } from "react";

export const EditCategoria = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const categoria = useCategoriaStore(state => state.categoriaSeleccionada);
    const fetchCategoriaById = useCategoriaStore(state => state.fetchCategoriaById);
    const updateCategoria = useCategoriaStore(state => state.updateCategoria);
    const error = useFetchStore(state => state.error);
    const cargando = useFetchStore(state => state.cargando);
    const [formValues, setFormValues] = useState({ nombre: '' });
    const [errors, setErrors] = useState({ nombre: '' });
    const nombreActual = formValues.nombre || categoria?.nombre || '';

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: '' }));
    };

    useEffect(() => {
        if (!categoria || String(categoria.id) !== String(id)) {
            fetchCategoriaById(id);
        }
    }, [categoria, fetchCategoriaById, id]);

    const validateForm = () => {
        const nombre = nombreActual.trim();
        const nextErrors = { nombre: '' };

        if (!nombre) {
            nextErrors.nombre = 'El nombre es obligatorio';
        } else if (nombre.length < 3 || nombre.length > 20) {
            nextErrors.nombre = 'El nombre debe tener entre 3 y 20 caracteres';
        }

        setErrors(nextErrors);
        return !nextErrors.nombre;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const success = await updateCategoria(id, { nombre: nombreActual });
        if (success) {
            navigate('/pages/categoria');
        }
    };

    return (
        <div className="container-fluid px-0">
            <h1 className="h3 fw-bold mb-1">Editar categoría</h1>
            <p className="text-secondary mb-4">Actualiza el nombre de tu categoría.</p>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                autoComplete="off"
                                value={nombreActual}
                                onChange={handleInputChange}
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                disabled={cargando && !categoria}
                                autoFocus
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/pages/categoria')}>Cancelar</button>
                            <button type="submit" className="btn text-white category-primary-button" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Actualizar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
