const products = [];

module.exports.addProductPage = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
    });
};

module.exports.sendAllProducts = (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

module.exports.getAllProducts = (req, res) => {
    // const products = adminData.products;
    res.render('shop', {
        pageTitle: 'Shop',
        productsArray: products,
    });
};
