import { Router } from 'express';
import {
    CrearAdminInicial,
    login
} from '../controllers/usuarios_controlador.js';


const router = Router();

router.post('/registro', CrearAdminInicial); 
router.post('/login', login); 

export default router;