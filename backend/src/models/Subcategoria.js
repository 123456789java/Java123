const mongoose = require('mongoose');

const SubcategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true }
});

module.exports = mongoose.model('Subcategoria', SubcategoriaSchema);
