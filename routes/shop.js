const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    const products = adminData.products;
    res.render('shop', {
        pageTitle: 'Shop',
        productsArray: products,
    });
    // res.sendFile(path.join(__dirname, '../', 'views/html', 'shop.html'));
});

module.exports = router;
