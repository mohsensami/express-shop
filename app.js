const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongodbConnect;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/Shop',
    collection: 'session',
});

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
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

const connectionURL = process.env.connectionURL;

mongoose
    .connect(connectionURL, {})
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// : 'mongodb+srv://user:123456sSa@cluster0.t1qcp.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0';
