const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true,
                },
                qty: {
                    type: Number,
                    require: true,
                },
            },
        ],
    },
});

module.exports = mongoose.model('User', userSchema);
