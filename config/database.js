import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    // Mantener conexiones vivas
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
});

// FUNCIÓN PARA EJECUTAR QUERIES
export const query = async (sql, params = []) => {
    try {
        const result = await pool.query(sql, params);
        return result.rows;
    } catch (error) {
        console.error('❌ Error en DB:', error.message);
        throw new Error(`Error de base de datos: ${error.message}`);
    }
};

// PROBAR CONEXIÓN
export const testConnection = async () => {
    try {
        const result = await query('SELECT 1 as test');
        console.log('✅ PostgreSQL conectado');
        return true;
    } catch (error) {
        console.error('❌ No se pudo conectar a PostgreSQL:', error.message);
        return false;
    }
};

// CERRAR CONEXIONES
export const closePool = async () => {
    await pool.end();
    console.log('✅ Conexiones PostgreSQL cerradas');
};

export default pool;
