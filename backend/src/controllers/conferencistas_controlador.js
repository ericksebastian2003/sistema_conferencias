import Conferencista from "../models/conferencistas.js";

const perfilConferencista = async (req, res) => {
    delete req.usuarioBDD.token;
    delete req.usuarioBDD._id;
    delete req.usuarioBDD.createdAt;
    delete req.usuarioBDD.updatedAt;
    delete req.usuarioBDD.__v;
    res.status(200).json(req.usuarioBDD);
};

const listarConferencistas = async (req, res) => {
    try {
        const conferencistas = await Conferencista.find().select("nombre apellido email empresa");
        res.status(200).json(conferencistas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al listar conferencistas" });
    }
};

const crearConferencista = async (req, res) => {
    try {
        const { cedula, nombre, apellido, ciudad, email, telefono, direccion, fechaNacimiento, genero, empresa } = req.body;

        if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        if (await Conferencista.findOne({ email })) return res.status(400).json({ msg: "Lo sentimos, el email ya ha sido registrado" });
        if (await Conferencista.findOne({ cedula })) return res.status(400).json({ msg: "Lo sentimos, la cédula ya ha sido registrada" });

        const nuevoConferencista = new Conferencista({
            cedula,
            nombre,
            apellido,
            ciudad,
            email,
            telefono,
            direccion,
            fechaNacimiento,
            genero,
            empresa,
        });

        await nuevoConferencista.save();
        res.status(201).json({ msg: "Conferencista registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar el conferencista" });
    }
};

const obtenerConferencista = async (req, res) => {
    try {
        const conferencista = await Conferencista.findById(req.params.id);
        if (!conferencista) return res.status(404).json({ msg: "Conferencista no encontrado" });
        res.status(200).json(conferencista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el conferencista" });
    }
};

const actualizarConferencista = async (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, apellido, ciudad, telefono, direccion, email, fechaNacimiento, genero, empresa } = req.body;

    try {
        const conferencista = await Conferencista.findById(id);

        if (!conferencista) return res.status(404).json({ mensaje: "Conferencista no encontrado" });

        conferencista.cedula = cedula || conferencista.cedula;
        conferencista.nombre = nombre || conferencista.nombre;
        conferencista.apellido = apellido || conferencista.apellido;
        conferencista.ciudad = ciudad || conferencista.ciudad;
        conferencista.telefono = telefono || conferencista.telefono;
        conferencista.direccion = direccion || conferencista.direccion;
        conferencista.email = email || conferencista.email;
        conferencista.fechaNacimiento = fechaNacimiento || conferencista.fechaNacimiento;
        conferencista.genero = genero || conferencista.genero;
        conferencista.empresa = empresa || conferencista.empresa;

        await conferencista.save();
        res.status(200).json("conferencista actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el conferencista:", error);
        res.status(500).json({ mensaje: "Error al actualizar el conferencista", error: error.message });
    }
};

const eliminarConferencistaDefinitivo = async (req, res) => {
    try {
        const resultado = await Conferencista.deleteOne({ _id: req.params.id });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ msg: "Conferencista no encontrado" });
        }
        res.status(200).json({ msg: "Conferencista eliminado definitivamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el conferencista" });
    }
};

export {
    crearConferencista,
    perfilConferencista,
    listarConferencistas,
    obtenerConferencista,
    actualizarConferencista,
    eliminarConferencistaDefinitivo
};