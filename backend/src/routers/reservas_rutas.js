import { Router } from 'express';
import {
    listarReservas,
    crearReserva,
    actualizarReserva,
    eliminarReservaDefinitivo,
} from '../controllers/reservas_controlador.js';
import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = Router();

// Rutas de reservas (protegidas con autenticación)
router.get('/reserva', verificarAutenticacion, listarReservas);
router.post('/reserva/crear', verificarAutenticacion, crearReserva);
router.put('/reserva/act/:id', verificarAutenticacion, actualizarReserva);
router.delete('/reserva/deldef/:id', verificarAutenticacion, eliminarReservaDefinitivo);

export default router;