const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "profesor"],
    default: "profesor"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
