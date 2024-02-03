const mongoose = require('mongoose');
const Product = require('./models/product');

// Connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1/shop_db')
  .then((result) => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

const seedProducts = [
  {
    name: 'Kemeja Flanel',
    brand: 'Hollister',
    price: 750000,
    color: 'biru muda',
    category: 'Jaket',
  },
  {
    name: 'Celana Chino',
    brand: "Levi's",
    price: 900000,
    color: 'krem',
    category: 'Aksesoris',
  },
  {
    name: 'Sweater',
    brand: 'Gap',
    price: 650000,
    color: 'merah muda',
    category: 'Celana',
  },
  {
    name: 'Sepatu Sneakers',
    brand: 'Nike',
    price: 1200000,
    color: 'putih',
    category: 'Baju',
  },
  {
    name: 'Tas Ransel',
    brand: 'Herschel',
    price: 1500000,
    color: 'biru',
    category: 'Jaket',
  },
  {
    name: 'Kacamata Aviator',
    brand: 'Ray-Ban',
    price: 2000000,
    color: 'emas',
    category: 'Aksesoris',
  },
  {
    name: 'Baju Renang',
    brand: 'Speedo',
    price: 500000,
    color: 'biru tua',
    category: 'Celana',
  },
  {
    name: 'Topi Baseball',
    brand: 'New Era',
    price: 350000,
    color: 'hitam',
    category: 'Baju',
  },
  {
    name: 'Rompi',
    brand: 'Zara',
    price: 850000,
    color: 'abu-abu',
    category: 'Jaket',
  },
  {
    name: 'Jas',
    brand: 'Hugo Boss',
    price: 4500000,
    color: 'hitam',
    category: 'Aksesoris',
  },
  {
    name: 'Sepatu Loafers',
    brand: 'Gucci',
    price: 8000000,
    color: 'coklat',
    category: 'Celana',
  },
];

Product.insertMany(seedProducts)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
