import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const params = useParams()
    const {token} = params

    useEffect(()=>{
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({msg: 'Coloca tu nueva contraseña'})
                setTokenValido(true)
            } catch (error) {
                setAlerta({msg: 'Hubo un error', error:true})
            }
        }
        comprobarToken()
    }, [])

    const {msg} = alerta;

    const handleSubmit = async e => {
        e.preventDefault();

        if(password.length < 6){
            setAlerta({msg: 'La contraseña debe contener al menos 6 caracteres', error:true})
            return
        }

        try {
          const url = `/veterinarios/olvide-password/${token}` 
          const {data} =  await clienteAxios.post(url, {password})
          setAlerta({msg: data.msg})
          setPasswordModificado(true)
          
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error:true})
        }

    }

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Contraseña</h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && 
                <Alerta 
                  alerta= {alerta}
                />}

                { tokenValido && (
                    <>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
                            <input 
                            value={password} 
                            onChange={ e => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="Tu nueva contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-md " 
                            />
                        </div>

                        <input 
                        type="submit" 
                        value="Reestablecer" 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                    </form>

                    </>
                )}

                {passwordModificado &&                    
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link className="block text-center text-gray-500 my-5" to="/">Inicia Sesión</Link>
                    </nav>
                }

        </div>

    </>
  )
}

export default NuevoPassword;