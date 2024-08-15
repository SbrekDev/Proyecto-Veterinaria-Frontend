import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const {cerrarSesion} = useAuth()

  return (
    <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-white font-bold text-2xl text-center">Administrador de Pacientes de Veterinaria</h1>

            <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-sm font-bold uppercase">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-sm font-bold uppercase">Perfil</Link>

                <button 
                onClick={cerrarSesion} 
                type="button" 
                className="text-white text-sm font-bold uppercase">
                   Cerrar Sesión 
                </button>
            </nav>
        </div>
    </header>
  )
}

export default Header