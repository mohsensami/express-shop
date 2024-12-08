const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
    saveProductData() {
        this.id = Math.floor(Math.random() * 10);
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAllProducts(cb) {
        getProductsFromFile(cb);
    }

    static fetchOneProduct(id, cb) {
        getProductsFromFile((products) => {
            const oneProduct = products.find((p) => {
                return p.id == id;
            });
            cb(oneProduct);
        });
    }
};
