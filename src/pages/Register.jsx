import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerService } from '../services/auth.service';

const initialForm = {
    nombre: '',
    apellido: '',
    username: '',
    password: ''
};

export const Register = () => {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
        setErrors((previous) => ({
            ...previous,
            [name]: ''
        }));
        setSubmitError('');
    };

    const validateForm = () => {
        const nextErrors = {};
        const fields = [
            ['nombre', 'Nombre', 3, 50],
            ['apellido', 'Apellido', 3, 50],
            ['username', 'Username', 3, 50],
            ['password', 'Password', 6, 20]
        ];

        fields.forEach(([field, label, min, max]) => {
            const value = formData[field].trim();
            if (!value) {
                nextErrors[field] = `${label} no puede ser vacio`;
            } else if (value.length < min || value.length > max) {
                nextErrors[field] = `${label} debe tener entre ${min} y ${max} caracteres`;
            }
        });

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError('');
        try {
            await registerService(formData);
            navigate('/login');
        } catch (error) {
            setSubmitError(
                error.response?.data?.message ||
                'No pudimos crear tu cuenta. Revisa los datos e inténtalo de nuevo.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container-fluid min-vh-100 login-page">
            <div className="row min-vh-100">
                <section className="col-12 d-flex align-items-center justify-content-center p-3 p-md-4">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm p-3 p-md-4">
                            <div className="card-body">
                                <div className="mb-4">
                                    <div className="fw-bold fs-3 mb-4 login-brand">Zentri</div>
                                    <h1 className="h3 fw-bold mb-2">Crea tu cuenta</h1>
                                    <p className="text-secondary mb-0">Empieza a organizar tus finanzas personales.</p>
                                </div>
                                <form onSubmit={handleSubmit} noValidate>
                                    {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                autoComplete="given-name"
                                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                                aria-invalid={Boolean(errors.nombre)}
                                                aria-describedby={errors.nombre ? 'nombreFeedback' : undefined}
                                            />
                                            {errors.nombre && <div id="nombreFeedback" className="invalid-feedback">{errors.nombre}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="apellido" className="form-label fw-semibold">Apellido</label>
                                            <input
                                                type="text"
                                                id="apellido"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleInputChange}
                                                autoComplete="family-name"
                                                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                                aria-invalid={Boolean(errors.apellido)}
                                                aria-describedby={errors.apellido ? 'apellidoFeedback' : undefined}
                                            />
                                            {errors.apellido && <div id="apellidoFeedback" className="invalid-feedback">{errors.apellido}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-semibold">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            autoComplete="username"
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                            aria-invalid={Boolean(errors.username)}
                                            aria-describedby={errors.username ? 'usernameFeedback' : undefined}
                                        />
                                        {errors.username && <div id="usernameFeedback" className="invalid-feedback">{errors.username}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            autoComplete="new-password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            aria-invalid={Boolean(errors.password)}
                                            aria-describedby={errors.password ? 'passwordFeedback' : undefined}
                                        />
                                        {errors.password && <div id="passwordFeedback" className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <button className="btn w-100 mt-3 text-white login-button" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                                    </button>
                                </form>
                                <p className="text-center text-secondary small mt-4 mb-0">
                                    ¿Ya tienes una cuenta? <Link to="/login" className="fw-semibold text-decoration-none login-link">Inicia sesión</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};