const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongodbConnect;
const mongoose = require('mongoose');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('675af5da9e85329026f53def')
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

let dbUri;

// if(process.env)
// console.log(process.env.NODE_ENV);

const connectionURL =
    process.env.NODE_ENV == 'dev'
        ? 'mongodb://127.0.0.1:27017/Shop'
        : 'mongodb+srv://user:123456sSa@cluster0.t1qcp.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(connectionURL, {})
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    username: 'admin',
                    email: 'admin@email.com',
                    car: {
                        items: [],
                    },
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
