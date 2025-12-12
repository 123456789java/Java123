const express = require("express");
const router = express.Router();

const {
  registrar,
  login,
  obtenerUsuarios
} = require("../controllers/authController");

const { auth } = require("../middlewares/auth");

// Registrar usuario
router.post("/register", registrar);

// Login
router.post("/login", login);

// Obtener usuarios (solo admin)
router.get(
  "/usuarios",
  auth(["admin"]),
  obtenerUsuarios
);

module.exports = router;
