const Categoria = require('../models/Categoria');

exports.crear = async (req, res) => {
  try {
    const nueva = await Categoria.create(req.body);
    res.json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtener = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};
