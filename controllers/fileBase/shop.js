const Product = require('../models/single-product');
const Cart = require('../models/cart');

module.exports.getAllProducts = (req, res) => {
    Product.fetchAllProducts((products) => {
        res.render('shop/product-list', {
            pageTitle: 'Shop',
            productsArray: products,
        });
    });
};

module.exports.getOneProduct = (req, res) => {
    const pId = req.params.productId;
    Product.fetchOneProduct(pId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            // pageTitle: product.title,
        });
    });
};

module.exports.getIndex = (req, res) => {
    Product.fetchAllProducts((products) => {
        res.render('shop/index', {
            pageTitle: 'Home',
            productsArray: products,
        });
    });
};

module.exports.getCart = (req, res) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
    });
};

module.exports.postCart = (req, res) => {
    const pId = req.body.productId;
    Product.fetchOneProduct(pId, (product) => {
        Cart.addProduct(pId, product.price);
    });
    res.redirect('/cart');
};

module.exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
    });
};

module.exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
    });
};
