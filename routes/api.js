// routes/api.js
import express from 'express';
import userRoutes from './UserRoutes.js';

const router = express.Router();

// Ruta de prueba para /api
router.get('/', (req, res) => {
    res.json({ message: 'API routes funcionando ✔' });
});

// Sección de usuarios
router.use('/users', userRoutes);

export default router;
