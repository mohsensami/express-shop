const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
    saveProductData() {
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(filePath, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAllProducts(cb) {
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
};
