// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection, closePool } from './config/database.js';
import apiRoutes from './routes/api.js';

// Para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ Rutas importadas correctamente');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api', apiRoutes);
console.log('✅ Rutas /api montadas');

// Cerrar conexiones al terminar
process.on('SIGINT', async () => {
    console.log('\nCerrando servidor...');
    await closePool();
    process.exit(0);
});

// Iniciar servidor PRIMERO, luego probar conexión
const server = app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    await testConnection();
});
