const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor adicione um nome para o produto'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Por favor adicione uma descrição'],
    maxlength: [500, 'Descrição não pode exceder 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'Por favor adicione um preço'],
    min: [0, 'Preço não pode ser negativo']
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Estoque não pode ser negativo'],
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['porta', 'janela', 'acessorio']
  },
  dimensions: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true,
    enum: ['madeira', 'alumínio', 'PVC', 'vidro']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);