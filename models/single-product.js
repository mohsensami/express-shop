const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
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
}

module.exports = Product;
