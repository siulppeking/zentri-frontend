import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./routers/ProtectedRoute"
import { Categoria } from "./pages/Categoria"
import { Movimiento } from "./pages/Movimiento"
import { Configuracion } from "./pages/Configuracion"
import { Layout } from "./pages/Layout"
import { Dashboard } from "./pages/Dashboard"
import { NotFound404 } from "./pages/NotFound404"
import { Index } from "./pages/Index"
import { useAuthStore } from "./store/useAuthStore"
import { infoService } from "./services/auth.service"
import { useEffect } from "react"
import { AddCategoria } from "./components/categoria/AddCategoria"
import { EditCategoria } from "./components/categoria/EditCategoria"
import { NotAccess403 } from "./pages/NotAccess403"

export const App = () => {

  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const comprobarSesion = async () => {
      const zentriJWT = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
      if (!zentriJWT) {
        logout();
        return;
      }

      try {
        const usuarioData = await infoService();
        loginSuccess(usuarioData);
      } catch (error) {
        logout();
      }
    };

    comprobarSesion();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Páginas públicas */}
        <Route path="access-denied" element={<NotAccess403 />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="pages" element={<Layout />}>

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="categoria" element={<Categoria />} />
            <Route path="categoria/add" element={<AddCategoria />} />
            <Route path="categoria/edit/:id" element={<EditCategoria />} />

            <Route path="movimiento" element={<Movimiento />} />

            <Route path="configuracion" element={<Configuracion />} />
          </Route>
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}
