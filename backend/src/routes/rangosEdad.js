const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rangosController');

router.post('/', ctrl.crear);
router.get('/', ctrl.obtener);

module.exports = router;
