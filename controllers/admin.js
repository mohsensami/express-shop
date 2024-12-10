const Product = require('../models/single-product');

module.exports.addProductPage = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
    });
};

module.exports.sendAllProducts = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const products = new Product(title, description, price);
    products
        .saveProductData()
        .then((result) => {
            console.log('Product Created');
            res.redirect('admin/add-product');
        })
        .catch((err) => console.log(err));
};

// module.exports.getProducts = (req, res) => {
//     Product.fetchAllProducts((products) => {
//         res.render('admin/products', {
//             pageTitle: 'Admin Products',
//             productsArray: products,
//         });
//     });
// };

// module.exports.deleteProduct = (req, res) => {
//     const pId = req.body.productId;
//     Product.deleteProductData(pId);
//     res.redirect('/admin/products');
// };
