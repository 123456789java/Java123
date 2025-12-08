const Rango = require('../models/RangoEdad');

exports.crear = async (req, res) => {
  const nuevo = await Rango.create(req.body);
  res.json(nuevo);
};

exports.obtener = async (req, res) => {
  const rangos = await Rango.find();
  res.json(rangos);
};
