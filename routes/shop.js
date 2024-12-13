// const path = require('path');

const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getIndex);

router.get('/products', shopControllers.getAllProducts);

router.get('/products/:productId', shopControllers.getOneProduct);

router.get('/cart', shopControllers.getCart);

router.post('/cart', shopControllers.postCart);

// router.get('/orders', shopControllers.getOrders);

// router.get('/checkout', shopControllers.getCheckout);

module.exports = router;
