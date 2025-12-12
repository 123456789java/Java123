require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

// Crear admin por defecto
const crearAdminPorDefecto = require('./config/createAdmin');

const app = express();

// CONEXIONES
connectDB();
crearAdminPorDefecto();

// MIDDLEWARES
app.use(express.json());

// RUTAS
const authRoutes = require('./routes/auth');
const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const nivelesRoutes = require('./routes/nivelesDificultad');
const rangosRoutes = require('./routes/rangosEdad');
const usuarioRoutes = require('./routes/usuario');

// API PREFIX
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/niveles', nivelesRoutes);
app.use('/api/rangos', rangosRoutes);

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', http2: true });
});

// EXPORT
module.exports = app;
