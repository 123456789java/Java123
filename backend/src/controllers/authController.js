const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRAR USUARIO

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Verificar si ya existe el correo
    const existe = await Usuario.findOne({ correo });
    if (existe)
      return res.status(400).json({ error: "El correo ya está registrado" });

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      correo,
      password: hashed,
      rol
    });

    res.json({
      mensaje: "Usuario registrado correctamente",
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Login correcto",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER TODOS LOS USUARIOS (solo admin)

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password"); 
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
