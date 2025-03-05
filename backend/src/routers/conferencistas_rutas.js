import { Router } from 'express';
import {
    crearConferencista,
    perfilConferencista,
    listarConferencistas,
    obtenerConferencista,
    actualizarConferencista,
    eliminarConferencistaDefinitivo
} from '../controllers/conferencistas_controlador.js';
import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = Router();

// Rutas de conferencistas (protegidas con autenticación)
router.get('/conferencista', verificarAutenticacion, listarConferencistas);
router.post('/conferencista/crear', verificarAutenticacion, crearConferencista);
router.get('/conferencista/perfil', verificarAutenticacion, perfilConferencista);
router.get('/conferencista/:id', verificarAutenticacion, obtenerConferencista);
router.put('/conferencista/act/:id', verificarAutenticacion, actualizarConferencista);
router.delete('/conferencista/deldef/:id', verificarAutenticacion, eliminarConferencistaDefinitivo);

export default router;