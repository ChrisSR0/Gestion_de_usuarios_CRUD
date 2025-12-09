// USER SERVICE - Lógica de negocio
import * as userRepo from '../repositories/UserRepository.js';

// Crear usuario
export const registerUser = async (data) => {
    return await userRepo.createUser(data);
};

// Listar todos
export const getUsers = async () => {
    return await userRepo.getAllUsers();
};

// Obtener uno
export const getUser = async (id) => {
    return await userRepo.getUserById(id);
};


// UPDATE - actualizar user
export const updateUser = async (id, data)=>{
    return await userRepo.updateUser(id,data);
};

// DELETE _ borrar un user
export const deleteUser = async (id)=>{
    return await userRepo.deleteUser(id)
};