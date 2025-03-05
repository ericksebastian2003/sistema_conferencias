import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import rutaUsuario from './routers/usuarios_rutas.js';
import rutaConferencista from './routers/conferencistas_rutas.js';
import rutaAuditorio from './routers/auditorios_rutas.js';
import rutaReserva from './routers/reservas_rutas.js';



const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.set('port',process.env.port || 3000)

app.use('/api',rutaUsuario)
app.use('/api',rutaConferencista)
app.use('/api',rutaAuditorio)
app.use('/api',rutaReserva)

export default app  
