import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Layout = () => {
    const logout = useAuthStore((state) => state.logout);
    const usuario = useAuthStore((state) => state.usuario);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const nombreCompleto = [usuario?.nombre, usuario?.apellido].filter(Boolean).join(' ') ||
        usuario?.username?.split('@')[0] ||
        'bienvenido';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="app-shell">
            <div className={`sidebar-backdrop ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
            <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <Link to="/pages/dashboard" className="text-decoration-none">
                        <span className="brand-symbol">z</span>
                        <span className="brand-name">Zentri</span>
                    </Link>
                    <button className="btn btn-sm d-lg-none" type="button" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="sidebar-label">Menú principal</div>
                <nav aria-label="Navegación principal">
                    <ul className="nav flex-column gap-1">
                        {usuario?.menus?.map((menu) => (
                            <li className="nav-item" key={menu.idMenu}>
                                <NavLink
                                    to={menu.url}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) => `nav-link app-nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <span className="nav-link-dot" aria-hidden="true" />
                                    {menu.nombre}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <div className="app-content">
                <header className="app-header">
                    <button className="btn btn-sm sidebar-toggle d-lg-none" type="button" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
                        <span aria-hidden="true">☰</span>
                    </button>
                    <div>
                        <p className="header-overline mb-1">Tu espacio financiero</p>
                        <h1 className="h5 mb-0 fw-bold">Hola, {nombreCompleto}</h1>
                    </div>
                    <div className="user-summary header-user ms-auto">
                        <span className="user-avatar">{usuario?.username?.charAt(0).toUpperCase() || 'U'}</span>
                        <div className="text-truncate d-none d-sm-block">
                            <strong className="d-block text-truncate">{usuario?.username || 'Usuario'}</strong>
                        </div>
                    </div>
                </header>
                <main className="app-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};