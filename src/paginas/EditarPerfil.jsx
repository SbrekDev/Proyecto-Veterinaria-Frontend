import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth()
    const[perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})
    
    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
 
        const { nombre, email} = perfil;
 
        if( [nombre,email].includes('') ){
            setAlerta({
                msg: 'El campo Email y Nombre Son Obligatorios.',
                error : true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)

    }

    const {msg} = alerta;
    
    
    

  return (
    <>
        <AdminNav></AdminNav>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Perfil</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
            {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input 
                        type="text"
                        name="nombre"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="web" className="uppercase font-bold text-gray-600">Sito Web</label>
                        <input 
                        type="text"
                        name="web"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                        <input 
                        type="tel"
                        name="telefono"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        value={perfil.telefono || ''}
                        onChange={e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                        <input 
                        type="email"
                        name="email"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Guardar Cambios"
                    className="bg-indigo-600 px-10 py-3 font-bold rounded-lg w-full uppercase text-white mt-5 cursor-pointer hover:bg-indigo-700"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil