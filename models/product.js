const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama tidak boleh kosong'],
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Baju', 'Celana', 'Aksesoris', 'Jaket'],
  },
  garments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
