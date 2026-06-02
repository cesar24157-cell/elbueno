
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ===== RECETAS =====
app.get("/recetas", async (req, res) => {
  const result = await pool.query("SELECT * FROM recetas ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/recetas", async (req, res) => {
  const { titulo, descripcion, autor } = req.body;

  const result = await pool.query(
    "INSERT INTO recetas (titulo, descripcion, autor) VALUES ($1, $2, $3) RETURNING *",
    [titulo, descripcion, autor]
  );

  res.json(result.rows[0]);
});

// ===== OPINIONES =====
app.get("/opiniones", async (req, res) => {
  const result = await pool.query("SELECT * FROM opiniones ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/opiniones", async (req, res) => {
  const { nombre, comentario } = req.body;

  const result = await pool.query(
    "INSERT INTO opiniones (nombre, comentario, fecha) VALUES ($1, $2, NOW()) RETURNING *",
    [nombre, comentario]
  );

  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
