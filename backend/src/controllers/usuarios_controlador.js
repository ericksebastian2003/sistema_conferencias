import Usuario from '../models/usuarios.js';
import generarJWT from '../helpers/crearJWT.js';


const CrearAdminInicial = async (req, res) => {
    try {
        const { email, password, nombre, apellido } = req.body;
        if (!email || !password) {return res.status(400).json({ error: 'Email y contraseña son requeridos' });}
        const usuarioBDD = await Usuario.findOne({ email });
        if (usuarioBDD) {return res.status(409).json({ error: 'Admin inicial ya existe' });}
        const adminInicial = new Usuario({
            email,
            nombre,
            apellido
        });

        adminInicial.password = await adminInicial.encryptPassword(password);
        await adminInicial.save();

        res.status(201).json({ msg: 'Admin creado exitosamente' });
    } catch (error) {
        console.error('Error al crear admin inicial:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });}
    const usuarioBDD = await Usuario.findOne({ email });
    if (!usuarioBDD) { return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });}
    const verificarPassword = await usuarioBDD.matchPassword(password);
    if (!verificarPassword) {return res.status(401).json({ msg: "Lo sentimos, el password no es el correcto" }); }

    const token = generarJWT(usuarioBDD._id); 

    const { nombre, apellido, _id } = usuarioBDD;

    res.status(200).json({
        token,
        nombre,
        apellido,
        email,
        _id,
    });
};
    


export {
    CrearAdminInicial,
    login 
}