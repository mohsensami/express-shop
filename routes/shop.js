// const path = require('path');

const express = require('express');

const shopControllers = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopControllers.getIndex);

router.get('/products', shopControllers.getAllProducts);

router.get('/products/:productId', shopControllers.getOneProduct);

router.get('/cart', isAuth, shopControllers.getCart);

router.post('/cart', isAuth, shopControllers.postCart);

router.get('/search', shopControllers.search);

// router.get('/orders', shopControllers.getOrders);

// router.get('/checkout', shopControllers.getCheckout);

module.exports = router;
