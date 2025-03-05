import Auditorio from "../models/auditorios.js";

const listarAuditorios = async (req, res) => {
    try {
        const auditorios = await Auditorio.find().select("codigo nombre descripcion capacidad ubicacion");
        res.status(200).json(auditorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los auditorios" });
    }
};

const crearAuditorio = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, capacidad, ubicacion } = req.body;

        if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        if (await Auditorio.findOne({ codigo })) return res.status(400).json({ msg: "Lo sentimos, el código ya ha sido registrado" });

        const nuevoAuditorio = new Auditorio({
            codigo,
            nombre,
            descripcion,
            capacidad,
            ubicacion,
        });

        await nuevoAuditorio.save();
        res.status(201).json({ msg: "Auditorio creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el auditorio" });
    }
};

const actualizarAuditorio = async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, descripcion, capacidad, ubicacion } = req.body;

    try {
        const auditorio = await Auditorio.findById(id);

        if (!auditorio) return res.status(404).json({ msg: "Auditorio no encontrado" });

        auditorio.codigo = codigo || auditorio.codigo;
        auditorio.nombre = nombre || auditorio.nombre;
        auditorio.descripcion = descripcion || auditorio.descripcion;
        auditorio.capacidad = capacidad || auditorio.capacidad;
        auditorio.ubicacion = ubicacion || auditorio.ubicacion;

        await auditorio.save();
        res.status(200).json("auditorio actualizado exitosamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el auditorio" });
    }
};

const eliminarAuditorioDefinitivo = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await Auditorio.deleteOne({ _id: id });
        if (resultado.deletedCount === 0) return res.status(404).json({ msg: "Auditorio no encontrado" });
        res.status(200).json({ msg: "Auditorio eliminado definitivamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el auditorio" });
    }
};

export {
    listarAuditorios,
    crearAuditorio,
    actualizarAuditorio,
    eliminarAuditorioDefinitivo,
};