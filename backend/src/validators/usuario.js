const { check } = require('express-validator');

exports.validarUsuario = [
  check('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  check('correo')
    .isEmail()
    .withMessage('Correo inválido'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
];
