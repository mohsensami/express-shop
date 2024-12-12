const mongodb = require('mongodb');
const getDB = require('../../util/database').getDB;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    saveUserData() {
        const db = getDB();
        return db.collection('user').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex((cp) => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQty = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQty = this.cart.items[cartProductIndex].qty + 1;
            updatedCartItems[cartProductIndex].qty = newQty;
        } else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), qty: newQty });
        }
        const updatedCart = {
            items: updatedCartItems,
        };
        const db = getDB();
        return db
            .collection('user')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map((i) => {
            return i.productId;
        });
        return db
            .collection('product')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then((products) => {
                return products.map((p) => {
                    return { ...p };
                });
            });
    }

    static findUserById(uId) {
        const db = getDB();
        return db
            .collection('user')
            .findOne({ _id: new mongodb.ObjectId(uId) })
            .then((user) => {
                console.log(user);
                return user;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = User;
