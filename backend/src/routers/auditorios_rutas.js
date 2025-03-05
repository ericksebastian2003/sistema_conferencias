import { Router } from 'express';
import {
    listarAuditorios,
    crearAuditorio,
    actualizarAuditorio,
    eliminarAuditorioDefinitivo,
} from '../controllers/auditorios_controlador.js';
import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = Router();

// Rutas de auditorios (protegidas con autenticación)
router.get('/auditorio', verificarAutenticacion, listarAuditorios);
router.post('/auditorio/crear', verificarAutenticacion, crearAuditorio);
router.put('/auditorio/act/:id', verificarAutenticacion, actualizarAuditorio);
router.delete('/auditorio/deldef/:id', verificarAutenticacion, eliminarAuditorioDefinitivo);

export default router;