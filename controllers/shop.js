const Product = require('../models/single-product');

module.exports.getAllProducts = (req, res) => {
    Product.find().then((products) => {
        res.render('shop/product-list', {
            pageTitle: 'Product List',
            productsArray: products,
            isAuth: req.session.isLoggedIn,
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
                isAuth: req.session.isLoggedIn,
            });
        })
        .catch((err) => console.log(err));
};

module.exports.getIndex = (req, res) => {
    Product.find().then((products) => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            productsArray: products,
            isAuth: req.session.isLoggedIn,
        });
    });
};

module.exports.getCart = (req, res) => {
    req.user
        .populate('cart.items.productId')
        // .execPopulate()
        .then((user) => {
            const products = user.cart.items;
            res.render('shop/cart', {
                pageTitle: 'Cart',
                products: products,
                isAuth: req.session.isLoggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.postCart = (req, res) => {
    const pId = req.body.productId;
    Product.findById(pId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect('/cart');
        });
};

module.exports.search = async (req, res) => {
    try {
        const query = req.query.q; // Get the 'q' parameter from the URL

        if (!query) {
            return res.status(400).json({ message: 'Query parameter "q" is required.' });
        }

        // Search for products where title matches the query (case-insensitive)
        const results = await Product.find({
            title: { $regex: query, $options: 'i' }, // 'i' makes it case-insensitive
        });

        console.log(results);

        // Respond with the search results
        res.render('shop/search', {
            pageTitle: query,
            isAuth: req.session.isLoggedIn,
            results,
        });
        // res.status(200).json({ results });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
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
