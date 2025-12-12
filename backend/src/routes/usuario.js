const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuario');
const { auth } = require('../middlewares/auth');

router.post(
  '/',
  auth(["admin"]),
  controller.crearUsuario
);

router.get(
  '/',
  auth(["admin"]),
  controller.obtenerUsuarios
);

router.get(
  '/:id',
  auth(["admin"]),
  controller.obtenerUsuario
);

router.put(
  '/:id',
  auth(["admin"]),
  controller.actualizarUsuario
);

router.delete(
  '/:id',
  auth(["admin"]),
  controller.eliminarUsuario
);

module.exports = router;
