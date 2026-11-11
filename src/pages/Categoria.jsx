import { Link } from "react-router-dom"
import { TableCategoria } from "../components/categoria/TableCategoria"

export const Categoria = () => {
    return (
        <>
            <h1>Categoria</h1>

            <Link to="add">Agregar Categoría</Link>

            <TableCategoria />
        </>
    )
}
