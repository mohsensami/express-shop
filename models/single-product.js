const mongodb = require('mongodb');
const getDB = require('../util/databse').getDB;

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
}

module.exports = Product;
