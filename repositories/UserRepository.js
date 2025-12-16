// solo habla con POSTGRESQL

import { query } from '../config/database.js';


// create => create user
export const createUser = async(userData)=>{
    const sql = `
        INSERT INTO users (name, email, password_hash, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, role, created_at
    `;

    return await query(sql, [
        userData.name,
        userData.email,
        userData.password_hash,
        userData.role || 'parent',
    ]);
};


//READ ALL => obtener todos lo usuarios
export const getAllUsers = async ()=>{
    // obtengo lo usurios ordenados por id
    const sql = 'SELECT id, name,email, role, created_at FROM users ORDER BY id';
    return await query(sql); //Espera a que el sql este con los datos
}

// READ ONE  => obtener un user por su ID
export const getUserById = async (id)=>{
    const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
    const users = await query(sql,[id] );
    return users[0] || null //Devuelve el user o null si No existe
};


// UPDATE => actualiza user 
export const updateUser = async (id, userData)=>{
    
    const sql = `UPDATE  users
    SET name = $1, email = $2, role = $3
    WHERE id = $4
    RETURNING id, name, email,role
    `;

    return await query(sql, [
        userData.name,
        userData.email,
        userData.role,
        id

    ]);
};



// DELETE => eliminar user
export const deleteUser = async(id)=>{
    try {
        // Deshabilitar restricciones temporalmente
        await query('SET session_replication_role = replica');
        
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING id';
        const result = await query(sql, [id]);
        
        // Reactivar restricciones
        await query('SET session_replication_role = DEFAULT');
        
        console.log('✅ Usuario ID', id, 'eliminado');
        return result;
    } catch (error) {
        console.error('❌ Error al eliminar ID', id, ':', error.message);
        // Reactivar restricciones en caso de error
        await query('SET session_replication_role = DEFAULT');
        throw error;
    }
}