import { useState, useEffect } from "react"
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

    const [nombre,setNombre] = useState('')
    const [propietario,setPropietario] = useState('')
    const [email,setEmail] = useState('')
    const [fecha,setFecha] = useState('')
    const [sintomas,setSintomas] = useState('')
    const [id, setId] = useState(null)

    const[alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes();

    useEffect(()=>{
        
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'));
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        
    }, [paciente])
    



    const handleSubmit = e => {
        e.preventDefault()

        // validar form
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios', 
                error: true
            })
            return
        }

        setAlerta({})
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            msg: 'Guardado Correctamente', 
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const {msg} = alerta

  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className="text-xl text-center mb-10 mt-5">Añade tus Pacientes y {''}<span className="text-indigo-600 font-bold">Administralos</span></p>
        {msg && <Alerta alerta={alerta}>
            </Alerta>}
        <form 
        className="bg-white shadow-md py-10 px-5 mb-10 lg:mb-0 rounded-md"
        onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
                type="text"
                id="nombre"
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input 
                value={propietario}
                onChange={e=>setPropietario(e.target.value)}
                type="text"
                id="propietario"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                <input
                value={email}
                onChange={e=>setEmail(e.target.value)} 
                type="email"
                id="email"
                placeholder="Su Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha de alta</label>
                <input
                value={fecha}
                onChange={e=>setFecha(e.target.value)} 
                type="date"
                id="fecha"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
                <textarea
                value={sintomas}
                onChange={e=>setSintomas(e.target.value)}
                id="sintomas"
                placeholder="Describe los Síntomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>

            <input 
            type="submit" 
            value={id ? "Guardar Cambios" : "Agregar Paciente"}
            className="bg-indigo-600 w-full p-3 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer rounded transition-colors"
            />

        </form>

    </>
  )
}

export default Formulario