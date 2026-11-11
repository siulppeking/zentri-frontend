import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = () => {
    const status = useAuthStore((state) => state.status);
    const usuario = useAuthStore((state) => state.usuario);

    const { pathname } = useLocation();

    if (status === 'checking') {
        return <p>Verificando sesión...</p>;
    }

    if (status !== 'authenticated') {
        return <Navigate to="/login" replace />;
    }

    const hasPermission = usuario?.menus?.some((menu) =>
        pathname === menu.url || pathname.startsWith(`${menu.url}/`)
    );

    if (!hasPermission) {
        return <Navigate to="access-denied" replace />;
    }

    return <Outlet />;
};