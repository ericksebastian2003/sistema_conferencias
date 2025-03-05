// Importación de los iconos
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import Modal from '../components/Modals';
import { ActualizarConferencista, FormularioConferencista } from '../components/Formularios';

export const Conferencista = () => {
  const [mensaje, setMensaje] = useState({});
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conferencistas, setConferencistas] = useState([]);
  const navigate = useNavigate();

  const updateConfercistas = (conferencista) => {
    <ActualizarConferencista/>
  };

  const listofConferencistas = async () => {
    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/conferencista`;
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      const respuesta = await axios.get(url, options);
      setConferencistas(respuesta.data); 
      console.log(respuesta.data)
    } catch (error) {
      console.log('Error en la petición', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('¿Estás seguro/a de eliminar este conferencista?');
      if (confirmation) {
        const url = `${import.meta.env.VITE_URL_BACKEND}/conferencista/deldef/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(url, options);
        listofConferencistas(); 
      }
    } catch (error) {
      console.log('Error al eliminar', error);
    }
  };

  useEffect(() => {
    listofConferencistas();
  }, []); 

  return (
    <>
      <div className="p-6">
        <div className='flex items-center justify-center'>
          <button onClick={() => setIsModalOpen(true)} className="bg-yellow-600 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
            <IoMdPersonAdd className="text-2xl" />
            Crear Conferencista
          </button>
        </div>
        {Array.isArray(conferencistas) && conferencistas.length > 0 ? (
  <table className="w-full mt-5 table-auto shadow-lg bg-white">
    <thead className="bg-amber-500 text-white">
      <tr>
        <th className="p-2">#</th>
        <th className="p-2">Número de cédula</th>
        <th className="p-2">E-mail</th>
        <th className="p-2">Número de teléfono</th>
        <th className="p-2">Nombre</th>
        <th className="p-2">Apellido</th>
        <th className="p-2">Empresa</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>

      {conferencistas.map((conferencista, index) => (
        <tr className="border-b hover:bg-gray-400 text-center" key={conferencista._id}>
          <td>{index + 1}</td>
          <td>{conferencista.cedula}</td>
          <td>{conferencista.email}</td>
          <td>{conferencista.telefono}</td>
          <td>{conferencista.nombre}</td>
          <td>{conferencista.apellido}</td>
          <td>{conferencista.empresa}</td>
          <td className="py-2 flex justify-center items-center gap-4">
            <MdModeEdit
              className="h-11 text-white w-11 p-2 rounded-lg bg-sky-700 cursor-pointer hover:bg-sky-600"
              onClick={() => updateConfercistas(conferencista)}
            />
            <MdDeleteForever 
              className="p-2 text-white h-11 w-11 rounded-lg bg-red-700 cursor-pointer hover:bg-red-500"
              onClick={() => handleDelete(conferencista._id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <Mensaje tipo="active">{'No existen registros'}</Mensaje>
)}
</div>


      
      {isModalOpen && (
        <Modal isOpen={isModalOpen} title="Crear Conferencista">
          <FormularioConferencista/>
        </Modal>
      )}
    </>
  );
};
