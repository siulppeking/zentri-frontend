import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Layout = () => {
    const logout = useAuthStore((state) => state.logout);
    const usuario = useAuthStore((state) => state.usuario);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <aside>
                <h2>Zentri</h2>
                <nav>
                    <ul>
                        {usuario?.menus?.map((menu) => (
                            <li key={menu.idMenu}>
                                <Link to={menu.url}>{menu.nombre}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <p>{usuario?.username}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </aside>

            <hr />

            <main>
                <header>
                </header>
                <main>
                    <Outlet />
                </main>
            </main>
        </div>
    );
};