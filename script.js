// script.js - Lavanda Escolar

let currentUser = null;
let recetas = [];
let opiniones = [];

// Datos de polinizadores
const polinizadores = [
    { icon: "🐝", nombre: "Abejas Melíferas", desc: "Las más importantes para la polinización de la lavanda." },
    { icon: "🦋", nombre: "Mariposas", desc: "Atraídas por los colores y aroma de las flores." },
    { icon: "🐞", nombre: "Abejorros", desc: "Excelentes polinizadores nativos y muy activos." }
];

// Cargar datos guardados
async function loadData() {
    try {
        const recetasRes = await fetch("http://localhost:3000/recetas");
        recetas = await recetasRes.json();

        const opinionesRes = await fetch("http://localhost:3000/opiniones");
        opiniones = await opinionesRes.json();

        renderRecetas();
        renderOpiniones();
    } catch (error) {
        console.error(error);
    }
}
// Renderizar Recetas
function renderRecetas() {
    const container = document.getElementById('lista-recetas');
    container.innerHTML = recetas.length ? recetas.map(r => `
        <div class="bg-white rounded-3xl shadow-lg p-6 card-hover">
            <h3 class="text-xl font-bold text-purple-700 mb-3">${r.titulo}</h3>
            <p class="text-gray-600 mb-4 line-clamp-4">${r.descripcion}</p>
            <div class="text-sm text-purple-600 font-medium">Por: ${r.autor}</div>
        </div>
    `).join('') : `
        <p class="col-span-3 text-center text-gray-500 py-10">
            Aún no hay recetas. ¡Sé el primero en agregar una!
        </p>`;
}

// Renderizar Opiniones
function renderOpiniones() {
    const container = document.getElementById('lista-opiniones');
    container.innerHTML = opiniones.length ? opiniones.map(o => `
        <div class="bg-white rounded-3xl shadow p-6">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl text-white">
                    ${o.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p class="font-semibold">${o.nombre}</p>
                    <p class="text-xs text-gray-500">${new Date(o.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </div>
            <p class="text-gray-700 italic">"${o.comentario}"</p>
        </div>
    `).join('') : `<p class="text-gray-500 text-center py-8">No hay opiniones todavía. ¡Sé el primero!</p>`;
}

// ==================== AUTH ====================
function mostrarAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
    cambiarAModalLogin();
}

function cerrarModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function cambiarAModalRegistro() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = 'Crear Cuenta';
}

function cambiarAModalLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('modalTitle').textContent = 'Iniciar Sesión';
}

function registrar() {
    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!nombre || !email || !password) {
        alert("Por favor completa todos los campos");
        return;
    }

    currentUser = { nombre, email };
    localStorage.setItem('currentUserLavanda', JSON.stringify(currentUser));
    
    alert(`¡Registro exitoso! Bienvenido/a, ${nombre}`);
    cerrarModal();
}

function login() {
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    if (usuario === "admin" && password === "Lavanda2026") {
        alert("¡Bienvenido Administrador!");
        localStorage.setItem("admin", "true");
        cerrarModal();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// ==================== RECETAS ====================
function mostrarFormularioReceta() {
    if (!currentUser) {
        alert("Debes iniciar sesión para publicar una receta");
        mostrarAuthModal();
        return;
    }
    document.getElementById('recetaModal').classList.remove('hidden');
}

function cerrarModalReceta() {
    document.getElementById('recetaModal').classList.add('hidden');
    document.getElementById('formReceta').reset();
}

// ==================== CLIMA (Simulado) ====================
async function cargarClima() {
    const div = document.getElementById('clima-info');
    div.innerHTML = `
        <div class="flex items-center justify-center gap-6">
            <div class="text-7xl">☀️</div>
            <div>
                <h3 class="text-4xl font-bold">24°C</h3>
                <p class="text-xl text-gray-600">Parcialmente soleado</p>
                <p class="text-green-600 mt-2">• Condiciones ideales para lavanda •</p>
            </div>
        </div>
    `;
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {

    loadData();
    cargarClima();

    // Renderizar polinizadores
    const polContainer = document.getElementById('polinizadores-content');
    polContainer.innerHTML = polinizadores.map(p => `
        <div class="bg-white rounded-3xl shadow p-8 text-center card-hover">
            <div class="text-6xl mb-4">${p.icon}</div>
            <h3 class="text-xl font-bold mb-2">${p.nombre}</h3>
            <p class="text-gray-600">${p.desc}</p>
        </div>
    `).join('');

    // Formulario de Receta
    document.getElementById('formReceta').addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('recetaTitulo').value;
        const descripcion = document.getElementById('recetaDescripcion').value;

        recetas.unshift({
            titulo,
            descripcion,
            autor: currentUser ? currentUser.nombre : "Anónimo"
        });

        localStorage.setItem('recetasLavanda', JSON.stringify(recetas));
        renderRecetas();
        cerrarModalReceta();
    });

    // Formulario de Opinión
    document.getElementById('formOpinion').addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim() || "Estudiante";
        const comentario = document.getElementById('comentario').value.trim();

        if (!comentario) return;

        opiniones.unshift({
            nombre,
            comentario,
            fecha: new Date().toISOString()
        });

        localStorage.setItem('opinionesLavanda', JSON.stringify(opiniones));
        renderOpiniones();
        e.target.reset();
    });

    // Auto-login si existe usuario
    const saved = localStorage.getItem('currentUserLavanda');
    if (saved) currentUser = JSON.parse(saved);
});
