const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/databse').mongodbConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

mongoConnect(() => {
    app.listen(3000);
});
