const Product = require('../models/single-product');

module.exports.addProductPage = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        isAuth: req.session.isLoggedIn,
    });
};

module.exports.sendProducts = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.file.path;
    const products = new Product({
        title: title,
        description: description,
        price: price,
        image: image,
        userId: req.user,
    });
    products
        .save()
        .then((result) => {
            console.log('Product Created');
            res.redirect('/admin/add-product');
        })
        .catch((err) => console.log(err));
};

module.exports.getProducts = (req, res) => {
    Product.find({ userId: req.user._id }).then((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            productsArray: products,
            isAuth: req.session.isLoggedIn,
        });
    });
};

module.exports.deleteProduct = (req, res) => {
    const pId = req.body.productId;
    Product.deleteOne({ _id: pId, userId: req.user._id })
        .then(() => {
            console.log('Product Deleted');
            res.redirect('/admin/add-product');
        })
        .catch((err) => console.log(err));
};
