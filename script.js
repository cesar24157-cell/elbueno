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

function mostrarRegistro() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registroForm").classList.remove("hidden");
    document.getElementById("modalTitle").textContent = "Registrarse";
}

function mostrarLogin() {
    document.getElementById("registroForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("modalTitle").textContent = "Iniciar Sesión";
}

// ==================== REGISTRO ====================

function registrar() {

    const nombre = document.getElementById("regNombre").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!nombre || !email || !password) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios =
        JSON.parse(localStorage.getItem("usuariosLavanda")) || [];

    const existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Ese correo ya está registrado");
        return;
    }

    usuarios.push({
        nombre,
        email,
        password
    });

    localStorage.setItem(
        "usuariosLavanda",
        JSON.stringify(usuarios)
    );

    alert("Usuario registrado correctamente");

    document.getElementById("regNombre").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";

    mostrarLogin();
}

// ==================== LOGIN ====================

function login() {

    const usuario =
        document.getElementById("usuario").value.trim();

    const password =
        document.getElementById("password").value.trim();

    // ADMINISTRADOR

    if (
        usuario === "admin" &&
        password === "Lavanda2026"
    ) {

        localStorage.setItem("admin", "true");

        alert("Bienvenido Administrador");

        cerrarModal();
        return;
    }

    // USUARIOS REGISTRADOS

    let usuarios =
        JSON.parse(localStorage.getItem("usuariosLavanda")) || [];

    const encontrado = usuarios.find(
        u =>
            u.email === usuario &&
            u.password === password
    );

    if (encontrado) {

        currentUser = encontrado;

        localStorage.setItem(
            "currentUserLavanda",
            JSON.stringify(encontrado)
        );

        alert(`Bienvenido ${encontrado.nombre}`);

        cerrarModal();

    } else {

        alert("Correo o contraseña incorrectos");

    }
}

// ==================== RECETAS ====================

function renderRecetas() {

    const container =
        document.getElementById("lista-recetas");

    if (!container) return;

    container.innerHTML =
        recetas.length > 0
            ? recetas.map(r => `
                <div class="bg-white rounded-3xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-purple-700 mb-3">
                        ${r.titulo}
                    </h3>

                    <p class="text-gray-600">
                        ${r.descripcion}
                    </p>
                </div>
            `).join("")
            : `
                <p class="text-center text-gray-500 col-span-3">
                    No hay recetas todavía.
                </p>
            `;
}

// ==================== OPINIONES ====================

function renderOpiniones() {

    const container =
        document.getElementById("lista-opiniones");

    if (!container) return;

    container.innerHTML =
        opiniones.length > 0
            ? opiniones.map(o => `
                <div class="bg-white rounded-3xl shadow p-6">

                    <h3 class="font-bold text-lg">
                        ${o.nombre}
                    </h3>

                    <p class="text-gray-600 mt-2">
                        ${o.comentario}
                    </p>

                </div>
            `).join("")
            : `
                <p class="text-center text-gray-500">
                    No hay opiniones todavía.
                </p>
            `;
}

// ==================== CLIMA ====================

function cargarClima() {

    const div =
        document.getElementById("clima-info");

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

                <p class="text-green-600 mt-2">
                    • Condiciones ideales para la lavanda •
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

        polContainer.innerHTML =
            polinizadores.map(p => `
                <div class="bg-white rounded-3xl shadow p-8 text-center">

                    <div class="text-6xl mb-4">
                        ${p.icon}
                    </div>

                    <h3 class="text-xl font-bold mb-2">
                        ${p.nombre}
                    </h3>

                    <p class="text-gray-600">
                        ${p.desc}
                    </p>

                </div>
            `).join("");
    }

    const formOpinion =
        document.getElementById("formOpinion");

    if (formOpinion) {

        formOpinion.addEventListener("submit", (e) => {

            e.preventDefault();

            const nombre =
                document.getElementById("nombre").value.trim() || "Usuario";

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

    const usuarioGuardado =
        localStorage.getItem("currentUserLavanda");

    if (usuarioGuardado) {
        currentUser = JSON.parse(usuarioGuardado);
    }

    renderOpiniones();
    renderRecetas();
});
