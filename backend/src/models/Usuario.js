const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
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
  },
  {
    timestamps: true
  }
);

// 🔐 OCULTAR PASSWORD EN TODAS LAS RESPUESTAS JSON
UsuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
