const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const ErrorHandler = require('./ErrorHandler');

// Models
const Product = require('./models/product');
const Garment = require('./models/garment');

// Connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1/shop_db')
  .then((result) => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// Route Path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Garments
app.get(
  '/garments',
  wrapAsync(async (req, res) => {
    const garments = await Garment.find({});
    // res.send('bisa');
    console.log(garments);
    res.render('garments/index', { garments });
  })
);

app.get('/garments/create', (req, res) => {
  res.render('garments/create');
});

app.post(
  '/garments',
  wrapAsync(async (req, res) => {
    const garment = new Garment(req.body);
    // console.log(garment);
    await garment.save();
    res.redirect('/garments');
  })
);

app.get(
  '/garments/:id',
  wrapAsync(async (req, res) => {
    const garment = await Garment.findById(req.params.id);
    res.render('garments/show', { garment });
  })
);

app.get(
  '/garments/:garment_id/products/create',
  wrapAsync(async (req, res) => {
    const { garment_id } = req.params;
    res.render('products/create', { garment_id });
  })
);

app.post(
  '/garments/:garment_id/products',
  wrapAsync(async (req, res) => {
    const { garment_id } = req.params;
    const garment = await Garment.findById(garment_id);
    const product = new Product(req.body);
    garment.products.push(product);
    // garment.save();
    // product.save();
    console.log(garment);
    console.log(product);
    res.redirect(`/garments/${garment_id}`);
  })
);

// Products
app.get(
  '/products',
  wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render('products/index', { products, category });
    } else {
      const products = await Product.find({});
      res.render('products/index', { products, category: 'All' });
    }
  })
);

app.get('/products/create', (req, res) => {
  // throw new ErrorHandler('This is a custom error', 503);
  res.render('products/create');
});

app.post(
  '/products',
  wrapAsync(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
  })
);

app.get(
  '/products/:id',
  wrapAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product });
  })
);

app.put(
  '/products/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.get(
  '/products/:id/edit',
  wrapAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  })
);

app.delete(
  '/products/:id',
  wrapAsync(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  })
);

const validationHandler = (err) => {
  err.status = 400;
  err.message = Object.values(err.errors).map((item) => item.message);
  return new ErrorHandler(err.message, err.status);
};

app.use((err, req, res, next) => {
  console.dir(err);
  if (err.name === 'ValidationError') {
    err.status = 400;
    err.message = Object.values(err.errors).map((item) => item.message);
  }
  if (err.name === 'CastError') {
    err.status = 404;
    err.message = 'Product not found';
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log('shop app listening on http://127.0.0.1:3000');
});
