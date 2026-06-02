
const API_URL = "https://TU-API-AQUI.onrender.com/api";   // ← Cambia esta URL

// Cargar Recetas
async function cargarRecetas() {
    try {
        const res = await fetch(API_URL + "/recetas");
        const data = await res.json();
        let html = "";
        data.forEach(r => {
            html += `<div><h3>${r.nombre}</h3><p><strong>Ingredientes:</strong> ${r.ingredientes}</p></div>`;
        });
        document.getElementById("recetas").innerHTML = html || "No hay recetas aún.";
    } catch(e) {
        document.getElementById("recetas").innerHTML = "Error al cargar recetas.";
    }
}

// Formulario de Opiniones
document.getElementById("formOpinion").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const comentario = document.getElementById("comentario").value;

    await fetch(API_URL + "/opiniones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_estudiante: nombre, comentario, calificacion: 5 })
    });

    alert("¡Gracias por tu opinión!");
    e.target.reset();
    cargarOpiniones();
});

cargarRecetas();
