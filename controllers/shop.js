const Product = require('../models/single-product');

module.exports.getAllProducts = (req, res) => {
    Product.find().then((products) => {
        res.render('shop/product-list', {
            pageTitle: 'Product List',
            productsArray: products,
        });
    });
};

module.exports.getOneProduct = (req, res) => {
    const pId = req.params.productId;
    Product.findById(pId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
            });
        })
        .catch((err) => console.log(err));
};

module.exports.getIndex = (req, res) => {
    Product.find().then((products) => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            productsArray: products,
        });
    });
};

module.exports.getCart = (req, res) => {
    req.user
        .getCart()
        .then((products) => {
            res.render('shop/cart', {
                pageTitle: 'سبد خرید',
                products: products,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.postCart = (req, res) => {
    const pId = req.body.productId;
    Product.fetchOneProduct(pId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect('/cart');
        });
};

// module.exports.getOrders = (req, res) => {
//     res.render('shop/orders', {
//         pageTitle: 'Orders',
//     });
// };

// module.exports.getCheckout = (req, res) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//     });
// };
