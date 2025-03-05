import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthProvider"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "./Modals";

export const FormularioConferencista = ({ conferencista }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    email: conferencista?.email ?? "",
    telefono: conferencista?.telefono ?? "",
    nombre: conferencista?.nombre ?? "",
    apellido: conferencista?.apellido ?? "",
    cedula: conferencista?.cedula ?? "",
    direccion: conferencista?.direccion ?? "",
    fechaNacimiento: conferencista?.fechaNacimiento ?? "",
    ciudad: conferencista?.ciudad ?? "",
    genero: conferencista?.genero ?? "",
    empresa: conferencista?.empresa ?? "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(conferencista?._id){
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}conferencista/act/${conferencista?.id}`;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    await axios.put(url, form, options)
    navigate('/dashboard/conferencistas')
    
    }
else{
  
try{
    const token = localStorage.getItem('token');
    form.id = auth.id
    const url = `${import.meta.env.VITE_BACKEND_URL}/conferencista/crear`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
      await axios.post(url , form , options)
      navigate('/dashboard/conferencistas');
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  }};


  return (
    <>
      <form onSubmit={handleSubmit} className="items-center justify-content-center">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="email" className="font-bold text-lg">Correo electrónico</label>
          <input id="email" name="email" value={form.email} placeholder="Correo electrónico" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="telefono" className="font-bold text-lg">Teléfono</label>
          <input id="telefono" name="telefono" value={form.telefono} placeholder="Teléfono" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="nombre" className="font-bold text-lg">Nombre</label>
          <input   id="nombre"  name="nombre" value={form.nombre} placeholder="Nombre" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="apellido" className="font-bold text-lg">Apellido</label>
          <input id="apellido"  name="apellido" value={form.apellido} placeholder="Apellido" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="cedula" className="font-bold text-lg">Número de Cédula</label>
          <input id="cedula"  name="cedula" value={form.cedula} placeholder="Número de cédula" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="direccion" className="font-bold text-lg">Dirección</label>
          <input id="direccion" name="direccion" value={form.direccion} placeholder="Dirección" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="fechaNacimiento" className="font-bold text-lg">Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="ciudad" className="font-bold text-lg">Ciudad</label>
          <input id="ciudad" name="ciudad" value={form.ciudad} placeholder="Ciudad" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="genero" className="font-bold text-lg">Género</label>
          <select name="genero" value={form.genero} onChange={handleChange} className="border rounded-lg text-center">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="empresa" className="font-bold text-lg">Empresa</label>
          <input id="empresa"  name="empresa" value={form.empresa} placeholder="Empresa" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="mt-4 flex justify-center items-center px-3">
          <input type="submit" className="mr-8 bg-green-700 text-white px-4 py-2 font-bold w-50 h-10 rounded-lg hover:bg-green-500 cursor-pointer transition-all" value={conferencista?._id ? 'Actualizar Conferencista' : 'Crear Conferencista'} />
          <input type="button" className="mr-8 bg-red-700 text-white px-4 py-2 rounded-lg font-bold w-50 h-10 hover:bg-red-500" onClick={() => navigate("/dashboard/conferencistas")}>Cancelar</input>
        </div>
      </form>
    </>
  );
}


export const ActualizarConferencista = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conferencista, setConferencista] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [modalOpen, setModalOpen] = useState(true); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const fetchConferencista = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_URL_BACKEND}/conferencista/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, options);
        setConferencista(response.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    fetchConferencista();
  }, [id]);

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    navigate("/dashboard/conferencistas"); // Redirigir cuando se cierre el modal
  };

  return (
    <Modal isOpen={modalOpen} title="Actualizar Conferencista" closeModal={closeModal}>
      <FormularioConferencista conferencista={conferencista} />
    </Modal>
  );
};


//Formulario de Reservas

export const FormularioReservas= ({reserva})  =>{
  const {auth} = useContext(AuthContext) 
  const navigate = useNavigate()
  const [mensaje , setMensaje] = useState({})
  const [form ,setForm] = useState({
    nombre: "",
    descipcion: "",
    

  })
  const handleChange = (e) =>{

    setForm({
      ...form,
      [e.target.name] : e.target.value

    })
  } 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(reserva?._id){

    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_URL_BACKEND}conferencista/act/${reserva?._id}`
    const options = {
      method : 'PUT',
      headers: {
       
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    await axios.post(url,form, options);
    navigate('/dashboard/reservas')
  }
  else{
    try{
      const token = localStorage.getItem('token')
      form.id = auth._id
      const url = `${import.meta.env.VITE_URL_BACKEND}/reserva/crear`
      const options ={
        headers :{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(url,form,options)
      navigate('/dashboard/reservas')

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg , tipo:false})
      setTimeout(()=>{
        setMensaje({})
      },3000);
    }
  }
    
}
  return(
    <>
    <form onSubmit={handleSubmit}  className="items-center justify-content-center">
      <div className="flex flex-col items-center justify-center">
      <label
      htmlFor="nombre" className="font-bold text-lg">
        Cliente
      </label>
      <select name="nombre"  placeholder="Nombre" className="border rounded-lg text-center" onChange={handleChange}>
        {nombres.map ((nombre , index) =>(
             <option key={index} value={nombre}>{nombre}
             </option>

        ))}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center">
      <label htmlFor="productos" className="font-bold text-lg">
        Productos
      </label>
      <input  type ="text-area" value={form.descipcion} className="border rounded-lg  text-center "  onChange={handleChange}/>
      </div>
      <div>
        <label>Producto</label>
        <select>
          {
            productos.map((index,producto)=>(
              <option key = {index} value={producto}>
                {producto}
              </option>
            )
          )}
        </select>
        <label>Total</label>
        <label>{producto.total}</label>

      </div>
      
      <div className="mt-4 flex justify-center items-center px-3">
                    <input type="submit"  className="mr-8 bg-green-700 text-white px-4 py-2 font-bold w-50 h-10 rounded-lg hover:bg-green-500 cursor-pointer transition-all" value ={pedido?._id ? 'Actualizar Pedido' : 'Crear Pedido'}/>
                    <button onClick={()=>{
                      navigate("/dashboard/pedidos")
                    }} className=" mr-8 bg-red-700 text-white px-4 py-2 rounded-lg font-bold w-50 h-10 hover:bg-red-500">
                        Cancelar
                    </button>
        </div>
    </form>
    </>

  )
}


export const ActualizarReserva = () =>{
  const {id} = useParams()
  const [reserva , setReserva] = useState({})
  const [mensaje , setMensaje] = useState({})

  useEffect(()=>{
    const listaReserva = async () =>{
      try{
           const url = `${import.meta.env.VITE_BACKEND_URL}/reserva/act/${id}`
          const token = localStorage.getItem('token')
          const options ={
            headers:{
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${token}`
            }
          }
          const respuesta = await axios.put(url , {headers : options.headers})
          setPedidos(respuesta.data)

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg,tipo:false})

    }
  }
  listaReserva()
  navigate("/dashboard/reservas")
  
  
  },[])

  return(
    <>
    <Modal isOpen={true} title={"Actualizar Reserva"}>
      <FormularioReservas reserva={reserva}/>

    </Modal>
    
    </>
  )

}


export const FormAuditorio = ({auditorio}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    codigo: auditorio?.codigo ?? "",
    nombre: auditorio?.nombre ?? "",
    descripcion: auditorio?.descripcion ?? "",
    capacidad: auditorio?.capacidad ?? "",
    ubicacion: auditorio?.ubicacion ?? "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(conferencista?._id){
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/act/${auditorio?.id}`;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    await axios.put(url, form, options)
    navigate('/dashboard/auditorios')
    
    }
else{
  
try{
    const token = localStorage.getItem('token');
    form.id = auth.id
    const url = `${import.meta.env.VITE_BACKEND_URL}/conferencista/crear`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
      await axios.post(url , form , options)
      navigate('/dashboard/auditorios');
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  }};


  return (
    <>
      <form onSubmit={handleSubmit} className="items-center justify-content-center">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="codigo" className="font-bold text-lg">Código</label>
          <input id="codigo" name="codigo" value={form.codigo} placeholder="Código" className="border rounded-lg text-center" onChange={handleChange} />
        </div>


        <div className="flex flex-col items-center justify-center">
          <label htmlFor="nombre" className="font-bold text-lg">Nombre</label>
          <input   id="nombre"  name="nombre" value={form.nombre} placeholder="Nombre" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="descripcion" className="font-bold text-lg">Descripción</label>
          <input id="descripcion"  name="descripcion" value={form.descripcion} placeholder="Descripción" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="capacidad" className="font-bold text-lg">Capacidad</label>
          <input id="capacidad"  name="capacidad" value={form.capacidad} placeholder="Capacidad" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="ubicacion" className="font-bold text-lg">Ubicación</label>
          <input id="ubicacion" name="ubicacio" value={form.ubicacion} placeholder="Ubicación" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

    

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="genero" className="font-bold text-lg">Género</label>
          <select name="genero" value={form.genero} onChange={handleChange} className="border rounded-lg text-center">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="empresa" className="font-bold text-lg">Empresa</label>
          <input id="empresa"  name="empresa" value={form.empresa} placeholder="Empresa" className="border rounded-lg text-center" onChange={handleChange} />
        </div>

        <div className="mt-4 flex justify-center items-center px-3">
          <input type="submit" className="mr-8 bg-green-700 text-white px-4 py-2 font-bold w-50 h-10 rounded-lg hover:bg-green-500 cursor-pointer transition-all" value={conferencista?._id ? 'Actualizar Conferencista' : 'Crear Conferencista'} />
          <button className="mr-8 bg-red-700 text-white px-4 py-2 rounded-lg font-bold w-50 h-10 hover:bg-red-500" onClick={() => navigate("/dashboard/conferencistas")}>Cancelar</button>
        </div>
      </form>
    </>
  );
}