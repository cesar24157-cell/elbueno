// script.js - Lavanda Escolar

let currentUser = null;
let recetas = [];
let opiniones = [];

// ==================== POLINIZADORES ====================
const polinizadores = [
    {
        icon: "🐝",
        nombre: "Abejas Melíferas",
        desc: "Las más importantes para la polinización de la lavanda."
    },
    {
        icon: "🦋",
        nombre: "Mariposas",
        desc: "Atraídas por los colores y aroma de las flores."
    },
    {
        icon: "🐞",
        nombre: "Abejorros",
        desc: "Excelentes polinizadores nativos y muy activos."
    }
];

// ==================== RECETAS ====================
function renderRecetas() {
    const container = document.getElementById("lista-recetas");

    if (!container) return;

    container.innerHTML = recetas.length
        ? recetas.map(r => `
            <div class="bg-white rounded-3xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-purple-700 mb-3">${r.titulo}</h3>
                <p class="text-gray-600">${r.descripcion}</p>
            </div>
        `).join("")
        : `
            <p class="col-span-3 text-center text-gray-500 py-10">
                Aún no hay recetas.
            </p>
        `;
}

// ==================== OPINIONES ====================
function renderOpiniones() {
    const container = document.getElementById("lista-opiniones");

    if (!container) return;

    container.innerHTML = opiniones.length
        ? opiniones.map(o => `
            <div class="bg-white rounded-3xl shadow p-6">
                <h3 class="font-bold">${o.nombre}</h3>
                <p class="text-gray-600">${o.comentario}</p>
            </div>
        `).join("")
        : `
            <p class="text-center text-gray-500">
                No hay opiniones todavía.
            </p>
        `;
}

// ==================== LOGIN ====================
function mostrarAuthModal() {
    document.getElementById("authModal").classList.remove("hidden");
}

function cerrarModal() {
    document.getElementById("authModal").classList.add("hidden");
}

function login() {
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (usuario === "admin" && password === "Lavanda2026") {
        alert("Bienvenido Administrador");
        localStorage.setItem("admin", "true");
        cerrarModal();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// ==================== CLIMA ====================
function cargarClima() {
    const div = document.getElementById("clima-info");

    if (!div) return;

    div.innerHTML = `
        <div class="flex items-center justify-center gap-6">
            <div class="text-7xl">☀️</div>
            <div>
                <h3 class="text-4xl font-bold">24°C</h3>
                <p class="text-xl text-gray-600">
                    Parcialmente soleado
                </p>
                <p class="text-green-600 mt-2">
                    • Condiciones ideales para lavanda •
                </p>
            </div>
        </div>
    `;
}

// ==================== INICIO ====================
document.addEventListener("DOMContentLoaded", () => {

    cargarClima();

    const polContainer = document.getElementById("polinizadores-content");

    if (polContainer) {
        polContainer.innerHTML = polinizadores.map(p => `
            <div class="bg-white rounded-3xl shadow p-8 text-center">
                <div class="text-6xl mb-4">${p.icon}</div>
                <h3 class="text-xl font-bold mb-2">${p.nombre}</h3>
                <p class="text-gray-600">${p.desc}</p>
            </div>
        `).join("");
    }

    const formOpinion = document.getElementById("formOpinion");

    if (formOpinion) {
        formOpinion.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre =
                document.getElementById("nombre").value.trim() ||
                "Estudiante";

            const comentario =
                document.getElementById("comentario").value.trim();

            if (!comentario) return;

            opiniones.unshift({
                nombre,
                comentario
            });

            renderOpiniones();
            e.target.reset();
        });
    }

    renderOpiniones();
    renderRecetas();
});
