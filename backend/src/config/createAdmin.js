const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

async function crearAdminPorDefecto() {
  try {
    const existe = await Usuario.findOne({ correo: "admin_rodolfo@system.com" });
    if (existe) return;

    const hashed = await bcrypt.hash("admin123", 10);

    await Usuario.create({
      nombre: "Administrador_rodolfo",
      correo: "admin_rodolfo@system.com",
      password: hashed,
      rol: "admin",
    });

    console.log("✔ Admin por defecto creado: admin_rodolfo@system.com / admin123");
  } catch (err) {
    console.error("Error creando admin:", err.message);
  }
}

module.exports = crearAdminPorDefecto;
