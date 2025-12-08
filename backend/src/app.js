require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middleware
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/auth");
const categoriasRoutes = require("./routes/categorias");
const subcategoriasRoutes = require("./routes/subcategorias");
const nivelesRoutes = require("./routes/nivelesDificultad");
const rangosRoutes = require("./routes/rangosEdad");

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/subcategorias", subcategoriasRoutes);
app.use("/api/niveles", nivelesRoutes);
app.use("/api/rangos", rangosRoutes);

// Exportar aplicación
module.exports = app;
