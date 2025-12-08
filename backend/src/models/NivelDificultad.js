const mongoose = require('mongoose');

const NivelDificultadSchema = new mongoose.Schema({
  nombre: { type: String, required: true }   // Fácil, Medio, Difícil
});

module.exports = mongoose.model('NivelDificultad', NivelDificultadSchema);
