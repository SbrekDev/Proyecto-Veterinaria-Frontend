import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams();

    const {id} = params;
    useEffect(()=> {
      const confirmarCuenta = async ()=> {
        try {
          const url = `/veterinarios/confirmar/${id}`;
          const { data } = await clienteAxios(url)

          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg
          })
          
        } catch (error) {
          setAlerta({msg: error.response.data.msg, error: true});
        }

        setCargando(false);

      }
      confirmarCuenta();
    }, [])

    return (
      <>
          <div>
              <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a administrar tus Pacientes</h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando && 
                <Alerta 
                alerta={alerta}
               />}

               {cuentaConfirmada && (
                  <Link className="block text-center text-gray-500 my-5" to="/">Iniciar Sesión</Link>
               )}
          </div>
      </>
    )
  }
  
  export default ConfirmarCuenta
  