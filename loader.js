// loader.js - Carga las variables de entorno ANTES de todo
import dotenv from 'dotenv';
dotenv.config();

// Import dinámico - se ejecuta DESPUÉS de cargar dotenv
const app = await import('./app.js');

