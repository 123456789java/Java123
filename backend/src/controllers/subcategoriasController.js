const Subcategoria = require('../models/Subcategoria');

exports.crear = async (req, res) => {
  try {
    const nueva = await Subcategoria.create(req.body);
    res.json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtener = async (req, res) => {
  const data = await Subcategoria.find().populate('categoriaId');
  res.json(data);
};
