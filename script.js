// ==================== VARIABLES ====================

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

// ==================== MODAL LOGIN ====================

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
        localStorage.setItem("admin", "true");
        currentUser = {
            nombre: "Administrador"
        };

        alert("Bienvenido Administrador");
        cerrarModal();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// ==================== RECETAS ====================

function mostrarFormularioReceta() {

    const admin = localStorage.getItem("admin");

    if (admin !== "true") {
        alert("Solo el administrador puede agregar recetas");
        return;
    }

    document.getElementById("recetaModal").classList.remove("hidden");
}

function cerrarModalReceta() {
    document.getElementById("recetaModal").classList.add("hidden");
}

// ==================== RENDER RECETAS ====================

function renderRecetas() {

    const container = document.getElementById("lista-recetas");

    if (!container) return;

    if (recetas.length === 0) {
        container.innerHTML = `
            <p class="col-span-3 text-center text-gray-500">
                No hay recetas todavía.
            </p>
        `;
        return;
    }

    container.innerHTML = recetas.map(r => `
        <div class="bg-white rounded-3xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-purple-700 mb-3">
                ${r.titulo}
            </h3>

            <p class="text-gray-600">
                ${r.descripcion}
            </p>

            <div class="mt-4 text-sm text-purple-600">
                Por: ${r.autor}
            </div>
        </div>
    `).join("");
}

// ==================== RENDER OPINIONES ====================

function renderOpiniones() {

    const container = document.getElementById("lista-opiniones");

    if (!container) return;

    if (opiniones.length === 0) {
        container.innerHTML = `
            <p class="text-center text-gray-500">
                No hay opiniones todavía.
            </p>
        `;
        return;
    }

    container.innerHTML = opiniones.map(o => `
        <div class="bg-white rounded-3xl shadow p-6">
            <h4 class="font-bold">${o.nombre}</h4>
            <p class="mt-2">${o.comentario}</p>
        </div>
    `).join("");
}

// ==================== CLIMA ====================

function cargarClima() {

    const div = document.getElementById("clima-info");

    if (!div) return;

    div.innerHTML = `
        <div class="flex items-center justify-center gap-6">
            <div class="text-7xl">☀️</div>

            <div>
                <h3 class="text-4xl font-bold">
                    24°C
                </h3>

                <p class="text-xl text-gray-600">
                    Parcialmente soleado
                </p>
            </div>
        </div>
    `;
}

// ==================== INICIO ====================

document.addEventListener("DOMContentLoaded", () => {

    cargarClima();

    const polContainer =
        document.getElementById("polinizadores-content");

    if (polContainer) {

        polContainer.innerHTML = polinizadores.map(p => `
            <div class="bg-white rounded-3xl shadow p-8 text-center">
                <div class="text-6xl mb-4">${p.icon}</div>
                <h3 class="text-xl font-bold mb-2">${p.nombre}</h3>
                <p>${p.desc}</p>
            </div>
        `).join("");
    }

    renderRecetas();
    renderOpiniones();

    const formOpinion =
        document.getElementById("formOpinion");

    if (formOpinion) {

        formOpinion.addEventListener("submit", (e) => {

            e.preventDefault();

            const nombre =
                document.getElementById("nombre").value;

            const comentario =
                document.getElementById("comentario").value;

            opiniones.unshift({
                nombre,
                comentario
            });

            renderOpiniones();

            formOpinion.reset();
        });
    }

    const formReceta =
        document.getElementById("formReceta");

    if (formReceta) {

        formReceta.addEventListener("submit", (e) => {

            e.preventDefault();

            const titulo =
                document.getElementById("recetaTitulo").value;

            const descripcion =
                document.getElementById("recetaDescripcion").value;

            recetas.unshift({
                titulo,
                descripcion,
                autor: "Administrador"
            });

            renderRecetas();

            formReceta.reset();

            cerrarModalReceta();
        });
    }
});
