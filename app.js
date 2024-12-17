const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongodbConnect;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();
const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/Shop',
    collection: 'session',
});

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

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
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
