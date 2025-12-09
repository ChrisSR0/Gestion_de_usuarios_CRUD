// USER ROUTES - Definición de endpoints
import express from 'express';
import * as userController from '../controllers/UserController.js';

const router = express.Router();

/**
 * CONCEPTO: ROUTING
 * ¿QUÉ? Asocia URLs con funciones controller
 * ¿POR QUÉ? Mantener URLs organizadas en un lugar
 * FLUJO: URL → Router → Controller → Service → Repository → DB
 */

// CRUD USER
router.post('/', userController.createUser);       // CREATE
router.get('/', userController.getUsers);          // READ ALL
router.get('/:id', userController.getUser);    //READ ONE
router.put('/:id', userController.updateUser);    //UPDATE ONE
router.delete('/:id', userController.deleteUser);
export default router;
