// USER CONTROLLER - Maneja peticiones HTTP
import * as userService from '../services/UserService.js';

/* CONCEPTO: CONTROLLER
 * ¿QUÉ? Recibe peticiones HTTP, llama a servicios, envía respuestas
 * ¿POR QUÉ? Separa rutas (HTTP) de lógica (service)
 * RESPONSABILIDAD: Solo req/res, NO lógica de negocio
 */

// POST /api/users  - crear un user 
export const createUser = async (req, res) => {
    try {
        // Paso 1: Leer datos del body
        const userData = req.body;
        
        // Paso 2: Llamar al Service
        const result = await userService.registerUser(userData);
        
        // Paso 3: Responder con éxito (201 = Created)
        res.status(201).json({
            success: true,
            message: 'Usuario creado',
            data: result[0]
        });

    } catch (error) {
        // Si falla (email duplicado, datos inválidos, etc)
        res.status(400).json({
            success: false,
            message: 'Error al crear usuario',
            error: error.message
        });
    }
};

// GET /api/users - listar usuarios
export const getUsers = async (req, res) => {
    try {
        // Paso 1: Llamar al Service
        const users = await userService.getUsers();
        
        // Paso 2: Responder con éxito
        res.json({
            success: true,
            message: 'Usuarios obtenidos',
            count: users.length,
            data: users
        });

    } catch (error) {
        console.log('❌ ERROR en getUsers:', error);  // DEBUG
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

// GET /api/users/:id - obtener user por ID
export const getUser = async (req, res) => {
    try {
        // Paso 1: Leer ID de la URL
        const { id } = req.params;
        
        // Paso 2: Llamar al Service
        const user = await userService.getUser(id);
        
        // Paso 3: Verificar si existe
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        // Paso 4: Responder con éxito
        res.json({
            success: true,
            message: 'Usuario encontrado',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario',
            error: error.message
        });
    }
};

// PUT - UPDATE  
export const updateUser = async (req, res)=>{
    try{
        // leo el id de la URL
        const {id} = req.params;
        // leo los datos del body
        const userData = req.body;

        // llamo al service
        const result = await userService.updateUser(id, userData)
        
        // verifico si se actualizo 
        if(result.length === 0){
            return res.status(404).json({
                success:false,
                message: 'Usuario no encontrado'
            });
        }

        // respoder con exito
        res.json({
            success: true,
            message: 'Usuario actualizado',
            data:result[0]
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:'Error al actualizar usuario',
            error: error.message
        })
    }
}


// DELETE => borrar un user
export const deleteUser = async (req, res)=>{
    try{

        // leer la id de la url
        const {id} = req.params;
        // llamo al service
        const result = await userService.deleteUser(id);

        // verifico si se elimino (si es un array vacio es que no se encontro nada en la db y  entra al if)
        if(result.length === 0){//si el resultado que le pido a service y service a repository y este a la db es 0 pues no existe (no se encontro)

            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // repo nos devuelve(a servivce y service a nosotros) el id es decir length = 1 si encontro y elimino al usuario (asi sabemos si existia)
        // reponder con exito => si no entro al if aterio eluser si existe (y repo lo elimino)
        res.json({
            success:true,
            message: 'Usuario Eliminado',
            data: {id: result[0].id}
        });

    } catch(error){
        res.status(500).json({
            success:false,
            message:'Error al eliminar usuario',
            error: error.message
        });
    }
}