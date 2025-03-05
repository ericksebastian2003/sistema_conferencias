import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.js";


const verificarAutenticacion = async (req, res, next) => {
    // Validación si se está enviando el token
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    // Desestructurar el token del headers
    const { authorization } = req.headers;

    try {
        // Verificar el token recuperado con el almacenado
        const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        // Obtener el usuario
        req.usuarioBDD = await Usuario.findById(id).lean().select("-password");

        if (!req.usuarioBDD) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Continuar el proceso
        next();
    } catch (error) {
        // Capturar errores y presentarlos
        const e = new Error("Formato del token no válido");
        return res.status(401).json({ msg: e.message });
    }
};

export default verificarAutenticacion;