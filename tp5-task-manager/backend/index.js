const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'taskdb',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

const limpiarFecha = (fecha) => (fecha === '' || fecha === undefined ? null : fecha);

const initDB = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tareas (
      id SERIAL PRIMARY KEY,
      "nombreProyecto" VARCHAR(255),
      "tipoActividad" VARCHAR(255),
      "estado" VARCHAR(50),
      "resumen" VARCHAR(255),
      "descripcion" TEXT,
      "prioridad" VARCHAR(50),
      "informador" VARCHAR(255),
      "personaAsignada" VARCHAR(255),
      "precondicion" VARCHAR(255),
      "fechaCreacion" DATE,
      "fechaCierre" DATE,
      "sprint" VARCHAR(100)
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Tabla 'tareas' lista y configurada en PostgreSQL");
  } catch (err) {
    console.error("Error creando tabla:", err);
  }
};
initDB();

// 1. Obtener todas las tareas
app.get('/api/tareas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Crear una nueva tarea
app.post('/api/tareas', async (req, res) => {
  const { 
    nombreProyecto, tipoActividad, estado, resumen, descripcion, 
    prioridad, informador, personaAsignada, precondicion, 
    fechaCreacion, fechaCierre, sprint 
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO tareas 
      ("nombreProyecto", "tipoActividad", "estado", "resumen", "descripcion", "prioridad", "informador", "personaAsignada", "precondicion", "fechaCreacion", "fechaCierre", "sprint") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        nombreProyecto, tipoActividad, estado, resumen, descripcion, prioridad, 
        informador, personaAsignada, precondicion, 
        limpiarFecha(fechaCreacion), limpiarFecha(fechaCierre), sprint
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Actualizar una tarea
app.put('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    nombreProyecto, tipoActividad, estado, resumen, descripcion, 
    prioridad, informador, personaAsignada, precondicion, 
    fechaCreacion, fechaCierre, sprint 
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tareas SET 
      "nombreProyecto" = $1, "tipoActividad" = $2, "estado" = $3, "resumen" = $4, 
      "descripcion" = $5, "prioridad" = $6, "informador" = $7, "personaAsignada" = $8, 
      "precondicion" = $9, "fechaCreacion" = $10, "fechaCierre" = $11, "sprint" = $12 
      WHERE id = $13 RETURNING *`,
      [
        nombreProyecto, tipoActividad, estado, resumen, descripcion, prioridad, 
        informador, personaAsignada, precondicion, 
        limpiarFecha(fechaCreacion), limpiarFecha(fechaCierre), sprint, id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Eliminar una tarea
app.delete('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tareas WHERE id = $1', [id]);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Backend corriendo en el puerto ${port}`);
});