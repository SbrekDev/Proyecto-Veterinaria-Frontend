import { Link } from "react-router-dom";
import { useState } from "react"; 
import Alerta from "../components/Alerta";
import axios from 'axios';
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e =>{
    e.preventDefault();

    if([nombre,email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacíos', error: true})
      
    }

    if(password.length < 6){
      setAlerta({msg: 'La contraseña debe tener mas de 6 caracteres', error: true})
      return
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'La contraseña no coincide', error: true})
      return 
    }

    setAlerta({})

    // crear el usuario en la api
    try {
      
      const url = `/veterinarios`;
      await clienteAxios.post(url, {nombre, email, password})

      setAlerta({
        msg: 'Creado correctamente, revisa tu Email',
        error: false
      })
      

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
      
    }
    
  }

  const {msg} = alerta

    return (
      <>
          <div>
              <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra tus Pacientes</h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && 
                <Alerta 
                  alerta= {alerta}
                />}
                <form
                onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input 
                        value={nombre} 
                        onChange={ e => setNombre(e.target.value)} 
                        type="text" 
                        placeholder="Tu Nombre" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-md " 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input 
                        value={email} 
                        onChange={ e => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Email de registro" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-md " 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                        <input 
                        value={password} 
                        onChange={ e => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Tu password" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-md " 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
                        <input 
                        value={repetirPassword} 
                        onChange={ e => setRepetirPassword(e.target.value)} 
                        type="password" 
                        placeholder="Repetir Contraseña" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-md " 
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Registrarse" 
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center text-gray-500 my-5" to="/">Ya tienes Cuenta? Inicia Sesión</Link>
                    <Link className="block text-center text-gray-500 my-5" to="/olvide-password">Recuperar Contraseña</Link>
                </nav>
          </div>
      </>
    )
  }
  
  export default Registrar
  