const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongodbConnect;
const mongooe = require('mongoose');

//const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findUserById('6759c5dab685116f7877f4b1')
//         .then((user) => {
//             req.user = new User(user.username, user.email, user.cart, user._id);
//             next();
//         })
//         .catch((err) => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

mongoose
    .connect('mongodb://127.0.0.1:27017/Shop', { useNewUrlParser: true })
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
