import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoService, loginService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';

export const Login = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const loginSuccess = useAuthStore((state) => state.loginSuccess);
    const addToken = useAuthStore((state) => state.addToken);
    const removeToken = useAuthStore((state) => state.removeToken);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const loginData = await loginService(credentials);
            addToken(loginData.accessToken);
            console.log(loginData);

            const usuarioData = await infoService();
            loginSuccess(usuarioData);

            navigate('/pages/dashboard');
        } catch (err) {
            removeToken();
            setError('Credenciales incorrectas o servidor no disponible.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Zentri</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Usuario: </label>
                <input
                    type="text"
                    value={credentials.username}
                    onChange={handleInputChange}
                    name="username" required
                />
            </div>
            <div>
                <label>Contraseña: </label>
                <input
                    type="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    name="password"
                    required
                />
            </div>
            <br />
            <button type="submit">Ingresar</button>
        </form>
    );
};