import Reserva from '../models/reservas.js';
import Conferencista from '../models/conferencistas.js';
import Auditorio from '../models/auditorios.js';

// Listar todas las reservas
const listarReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .populate('conferencista', 'nombre apellido email')
            .populate('auditorio.auditorio', 'codigo nombre descripcion');
        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al listar las reservas.' });
    }
};

// Crear una nueva reserva
const crearReserva = async (req, res) => {
    try {
        const { conferencista, auditorio, codigo, descripcion } = req.body;

        // Validar si el conferencista existe
        const conferencistaBDD = await Conferencista.findById(conferencista);
        if (!conferencistaBDD) return res.status(400).json({ msg: 'Conferencista no encontrado.' });

        // Validar si los auditorios existen
        const auditoriosValidos = [];
        for (let i = 0; i < auditorio.length; i++) {
            const auditorioBDD = await Auditorio.findById(auditorio[i].auditorio);
            if (!auditorioBDD) return res.status(400).json({ msg: `Auditorio ${auditorio[i].auditorio} no encontrado.` });

            // Agregar el auditorio a la lista de auditorios válidos
            auditoriosValidos.push({
                auditorio: auditorioBDD._id,
            });
        }

        // Crear la reserva
        const nuevaReserva = new Reserva({
            codigo,
            descripcion,
            conferencista: conferencistaBDD._id,
            auditorio: auditoriosValidos,
        });

        // Guardar la reserva
        await nuevaReserva.save();

        res.status(201).json({ msg: 'Reserva creada exitosamente.', reserva: nuevaReserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la reserva.' });
    }
};

// Actualizar una reserva
const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, conferencista, auditorio } = req.body;

    try {
        const reserva = await Reserva.findById(id);
        if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });

        // Actualizar campos básicos
        reserva.codigo = codigo || reserva.codigo;
        reserva.descripcion = descripcion || reserva.descripcion;

        // Validar y actualizar conferencista si se proporciona
        if (conferencista) {
            const conferencistaBDD = await Conferencista.findById(conferencista);
            if (!conferencistaBDD) return res.status(400).json({ msg: 'Conferencista no encontrado.' });
            reserva.conferencista = conferencistaBDD._id;
        }

        // Validar y actualizar auditorios si se proporcionan
        if (auditorio && auditorio.length > 0) {
            const auditoriosValidos = [];
            for (let i = 0; i < auditorio.length; i++) {
                const auditorioBDD = await Auditorio.findById(auditorio[i].auditorio);
                if (!auditorioBDD) return res.status(400).json({ msg: `Auditorio ${auditorio[i].auditorio} no encontrado.` });
                auditoriosValidos.push({ auditorio: auditorioBDD._id });
            }
            reserva.auditorio = auditoriosValidos;
        }

        await reserva.save();
        res.status(200).json({ msg: 'Reserva actualizada exitosamente.', reserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la reserva.' });
    }
};

// Eliminar una reserva definitivamente
const eliminarReservaDefinitivo = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await Reserva.deleteOne({ _id: id });
        if (resultado.deletedCount === 0) return res.status(404).json({ msg: 'Reserva no encontrada.' });
        res.status(200).json({ msg: 'Reserva eliminada definitivamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la reserva.' });
    }
};

export {
    listarReservas,
    crearReserva,
    actualizarReserva,
    eliminarReservaDefinitivo,
};