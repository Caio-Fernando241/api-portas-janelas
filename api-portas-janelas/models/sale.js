const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantidade deve ser pelo menos 1']
      },
      priceAtSale: {
        type: Number,
        required: true
      }
    }
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['dinheiro', 'cartão', 'pix'],
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'concluída', 'cancelada'],
    default: 'concluída'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', SaleSchema);