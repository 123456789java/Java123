const mongoose = require('mongoose');

const RangoEdadSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },  // ej: "5-7 años"
  edadMin: { type: Number, required: true },
  edadMax: { type: Number, required: true }
});

module.exports = mongoose.model('RangoEdad', RangoEdadSchema);
