import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddBusiness } from "react-icons/md";
import { ActualizarReserva,  FormularioReservas } from "../components/Formularios";
import Mensaje from "../components/Mensaje";
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import Modal from "../components/Modals";


const Reservas = () => {
  const [mensaje , setMensaje] = useState({})
  const [isModalOpen , setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const updateReservas = () =>
  {
    <ActualizarReserva/>
  }
  const listaReserva = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/reserva/crear`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      //const response = await axios.get(url, { headers: options.headers });
      
      setClients(response.data); 
    } catch (error) {
      console.log('Error en la petición', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('¿Estás seguro/a de eliminar la reserva?');
      if (confirmation) {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_URL_BACKEND}/reserva/deldef/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(url, { headers: options.headers });
        lis();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    listaReserva();
  }, []);

  return (
    <>
    <div className="p-6">
      <div className='flex items-center justify-center '>
      <button   onClick={() => setIsModalOpen(true)}  className="bg-yellow-600 flex items-center  justify-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
        <MdOutlineAddBusiness     className="text-2xl" />
        Crear Reserva
      </button>
      </div>
      {reservas.length === 0 ? (
        <Mensaje tipo="active">{'No existen registros'}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr className="border-b hover:bg-gray-400 text-center" key={order._id}>
                <td>{index + 1}</td>
                <td>{reserva.codigo}</td>
                <td>{reserva.descripcion}</td>
                <td>{reserva.conferencista}</td>
                <td>{reserva.auditorio}</td>
                <td className="py-2 flex justify-center items-center gap-4">
                  <MdModeEdit
                    className="h-11 text-white w-11 p-2 rounded-lg bg-sky-700 cursor-pointer hover:bg-sky-600"
                    onClick={updateReservas}
                  />
                  <MdDeleteForever 
                    className=" p-2 text-white h-11 w-11  rounded-lg bg-red-700 cursor-pointer hover:bg-red-500"
                    onClick={() => handleDelete(reserva._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      {isModalOpen && (
  <Modal isOpen={isModalOpen} title="Crear Reserva">
    <FormularioReservas/>
  </Modal>
)}


    </>
  );
};

export default Reservas;
