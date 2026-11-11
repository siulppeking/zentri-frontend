import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { infoService, loginService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const loginSuccess = useAuthStore((state) => state.loginSuccess);
    const addToken = useAuthStore((state) => state.addToken);
    const removeToken = useAuthStore((state) => state.removeToken);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev, [name]: value
        }));
        setSubmitError('');
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {
            username: '',
            password: ''
        };
        const username = credentials.username.trim();
        const password = credentials.password;

        if (username === '') {
            errorsCopy.username = 'El correo es obligatorio';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            errorsCopy.username = 'Ingresa un correo electrónico válido';
            valid = false;
        }

        if (password === '') {
            errorsCopy.password = 'La contraseña es obligatoria';
            valid = false;
        } else if (password.length < 6) {
            errorsCopy.password = 'Debe tener al menos 6 caracteres';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        setSubmitError('');
        try {
            const loginData = await loginService(credentials);
            addToken(loginData.accessToken);

            const usuarioData = await infoService();
            loginSuccess(usuarioData);

            navigate('/pages/dashboard');
        } catch {
            removeToken();
            setSubmitError('No pudimos iniciar sesión. Revisa tus datos e inténtalo de nuevo.');
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
                                    <h1 className="h3 fw-bold mb-2">Inicia sesión</h1>
                                    <p className="text-secondary mb-0">Accede a tus finanzas personales.</p>
                                </div>
                                <form onSubmit={handleSubmit} noValidate>
                                    {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-semibold">Correo electrónico</label>
                                        <input
                                            type="email"
                                            id="username"
                                            name="username"
                                            value={credentials.username}
                                            onChange={handleInputChange}
                                            placeholder="tu@correo.com"
                                            autoComplete="email"
                                            aria-invalid={Boolean(errors.username)}
                                            aria-describedby={errors.username ? 'usernameFeedback' : undefined}
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        />
                                        {errors.username && <div id="usernameFeedback" className="invalid-feedback">{errors.username}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                                            <a href="#recuperar" className="small text-decoration-none login-link">¿La olvidaste?</a>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            aria-invalid={Boolean(errors.password)}
                                            aria-describedby={errors.password ? 'passwordFeedback' : undefined}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        />
                                        {errors.password && <div id="passwordFeedback" className="invalid-feedback d-block">{errors.password}</div>}
                                    </div>
                                    <button className="btn w-100 mt-3 text-white login-button" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                                    </button>
                                </form>
                                <p className="text-center text-secondary small mt-4 mb-0">
                                    ¿No tienes una cuenta? <Link to="/register" className="fw-semibold text-decoration-none login-link">Regístrate</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};