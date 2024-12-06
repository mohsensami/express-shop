const path = require('path');

const express = require('express');

const productsControllers = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsControllers.addProductPage);

router.post('/add-product', productsControllers.sendAllProducts);

module.exports = router;

// exports.routes = router;
