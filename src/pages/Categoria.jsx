import { Link } from "react-router-dom"
import { TableCategoria } from "../components/categoria/TableCategoria"

export const Categoria = () => {
    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Categorías</h1>
                    <p className="text-secondary mb-0">Organiza tus ingresos y gastos.</p>
                </div>
                <Link to="add" className="btn text-white category-primary-button">
                    Agregar categoría
                </Link>
            </div>
            <TableCategoria />
        </div>
    )
}
