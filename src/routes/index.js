const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/hola', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend con Node y Express' });
});

module.exports = router;
