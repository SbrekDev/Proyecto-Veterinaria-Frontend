import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";


const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo:''
    })

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(campo => campo ==='')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if( password.pwd_nuevo.length <6 ) {
            setAlerta({
                msg: 'La contraseña debe contener al menos 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta)
    }

    const {msg} = alerta;


  return (
    <>
        <AdminNav></AdminNav>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Contraseña</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
            {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="pwd_actual" className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                        <input 
                        type="password"
                        name="pwd_actual"
                        placeholder="Escribe tu contraseña actual"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="pwd_nuevo" className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                        <input 
                        type="password"
                        name="pwd_nuevo"
                        placeholder="Escribe tu nueva contraseña"
                        className="border bg-gray-50 w-full mt-5 rounded-lg p-2"
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Actualizar Contraseña"
                    className="bg-indigo-600 px-10 py-3 font-bold rounded-lg w-full uppercase text-white mt-5 cursor-pointer hover:bg-indigo-700"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword