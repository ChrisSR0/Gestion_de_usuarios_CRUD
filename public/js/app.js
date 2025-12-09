// ============================================
// SLASHKIDS - Frontend JavaScript
// ============================================
// 
// CONCEPTO: Separación de responsabilidades
// - HTML → Estructura (qué se muestra)
// - CSS → Estilos (cómo se ve)
// - JS → Lógica (qué hace)
//
// FLUJO:
// Frontend (aquí) → fetch() → Backend API → Database
// ============================================

const API_URL = 'http://localhost:8000/api/users';

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    document.getElementById('user-form').addEventListener('submit', handleSubmit);
});

// ============================================
// CRUD OPERATIONS
// ============================================

// READ ALL - Cargar usuarios (GET)
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
            renderUsers(data.data);
        }
    } catch (error) {
        showMessage('Error al cargar usuarios', 'error');
    }
}

// CREATE / UPDATE - Guardar usuario (POST/PUT)
async function handleSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('user-id').value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value
    };
    
    // Si es nuevo usuario, agregar contraseña
    if (!id) {
        userData.password_hash = document.getElementById('password').value;
    }
    
    try {
        const url = id ? `${API_URL}/${id}` : API_URL;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(id ? 'Usuario actualizado' : 'Usuario creado', 'success');
            loadUsers();
            cancelEdit();
        } else {
            showMessage(data.error || 'Error', 'error');
        }
    } catch (error) {
        showMessage('Error de conexión', 'error');
    }
}

// READ ONE - Cargar datos para editar (GET /:id)
async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('user-id').value = data.data.id;
            document.getElementById('name').value = data.data.name;
            document.getElementById('email').value = data.data.email;
            document.getElementById('role').value = data.data.role;
            document.getElementById('form-title').textContent = '✏️ Editar Usuario';
        }
    } catch (error) {
        showMessage('Error al cargar usuario', 'error');
    }
}

// DELETE - Eliminar usuario (DELETE /:id)
async function deleteUser(id) {
    if (!confirm('¿Eliminar este usuario?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const data = await response.json();
        
        if (data.success) {
            showMessage('Usuario eliminado', 'success');
            loadUsers();
        }
    } catch (error) {
        showMessage('Error al eliminar', 'error');
    }
}

// ============================================
// FUNCIONES DE UI (Interfaz de Usuario)
// ============================================

// Renderizar tabla de usuarios
function renderUsers(users) {
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-warning" onclick="editUser(${user.id})">✏️ Editar</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Cancelar edición
function cancelEdit() {
    document.getElementById('user-form').reset();
    document.getElementById('user-id').value = '';
    document.getElementById('form-title').textContent = '➕ Crear Usuario';
}

// Mostrar mensaje
function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = `message ${type}`;
    setTimeout(() => msg.className = 'message', 3000);
}