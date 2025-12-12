const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// CREAR USUARIO (solo admin)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Verificar correo duplicado
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      correo,
      password: hashed,
      rol
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER TODOS LOS USUARIOS
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER USUARIO POR ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR USUARIO

exports.actualizarUsuario = async (req, res) => {
  try {
    const data = { ...req.body };

    // Si se actualiza password, encriptar
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    ).select("-password");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR USUARIO
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
