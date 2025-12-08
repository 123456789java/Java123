const Nivel = require('../models/NivelDificultad');

exports.crear = async (req, res) => {
  const nuevo = await Nivel.create(req.body);
  res.json(nuevo);
};

exports.obtener = async (req, res) => {
  const niveles = await Nivel.find();
  res.json(niveles);
};
