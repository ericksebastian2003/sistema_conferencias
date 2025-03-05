import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdAddCircle, MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import Modal from '../components/Modals';
import { FormAuditorio } from '../components/Formularios';

const Auditorios = () =>{

  const [isModalOpen , setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const [auditorios, setAuditorios] = useState();

  const listofAuditorios = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/auditorios`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      

      console.log(response.data)
     

      setAuditorios(response.data); 
    } catch (error) {
      console.log('Error en la petición', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('¿Estás seguro/a de eliminar este auditorio?');
      if (confirmation) {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_URL_BACKEND}/auditorios/eliminar/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        //await axios.delete(url, options);
        await axios.delete(url, { headers: options.headers });
        listofClients(); // Refrescar la lista tras eliminación
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    listofAuditorios();
  }, []);

  return (
    <>
    <div className='flex items-center justify-center'>
      <button   onClick={() => setIsModalOpen(true)}  className="bg-yellow-600 flex items-center  justify-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
        <MdAddCircle className="text-2xl" />
        Crear Auditorios
      </button>
      </div>
      {auditorios.length === 0 ? (
        <Mensaje tipo="active">{'No existen registros'}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Capacidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {auditorios.map((auditorio, index) => (
              <tr className="border-b hover:bg-gray-400 text-center" key={auditorio._id}>
                <td>{index + 1}</td>
                <td>{auditorio.nombre}</td>
                <td>{auditorio.capacidad}</td>
                <td className="py-2 flex justify-center items-center gap-4">
                  <MdModeEdit
                    className="h-11 text-white w-11 p-2 rounded-lg bg-sky-700 cursor-pointer hover:bg-sky-600"
                    onClick={() => navigate(`/clientes/editar/${client._id}`)}
                  />
                  <MdDeleteForever 
                    className=" p-2 text-white h-11 w-11  rounded-lg bg-red-700 cursor-pointer hover:bg-red-500"
                    onClick={() => handleDelete(client._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
  <Modal isOpen={isModalOpen} title="Crear Auditorio">
    <FormAuditorio/>
  </Modal>
)}

    </>
  );
};

export default Auditorios