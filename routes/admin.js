const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminControllers.addProductPage);

router.post('/add-product', adminControllers.sendAllProducts);

router.post('/products', adminControllers.sendAllProducts);

module.exports = router;

// exports.routes = router;
