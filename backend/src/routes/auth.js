const express = require("express");
const router = express.Router();

const { registrar, login, obtenerUsuarios } = require("../controllers/authController");
const { auth, esAdmin } = require("../middlewares/auth");

// Registrar usuario
router.post("/register", registrar);

// Login
router.post("/login", login);

// Obtener todos los usuarios — solo admin puede verlos
router.get("/usuarios", auth, esAdmin, obtenerUsuarios);

module.exports = router;
