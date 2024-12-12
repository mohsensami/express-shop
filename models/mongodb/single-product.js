const mongodb = require('mongodb');
const getDB = require('../../util/database').getDB;

class Product {
    constructor(title, description, price, uId) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.uId = uId;
    }

    saveProductData() {
        const db = getDB();
        return db
            .collection('product')
            .insertOne(this)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static fetchAllProducts() {
        const db = getDB();
        return db
            .collection('product')
            .find()
            .toArray()
            .then((products) => {
                console.log(products);
                return products;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static fetchOneProduct(pId) {
        const db = getDB();
        return db
            .collection('product')
            .find({ _id: new mongodb.ObjectId(pId) })
            .next()
            .then((product) => {
                console.log(product);
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static deleteOneProduct(pId) {
        const db = getDB();
        return db
            .collection('product')
            .deleteOne({ _id: new mongodb.ObjectId(pId) })
            .then((result) => {
                console.log('Product Deleted!');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
