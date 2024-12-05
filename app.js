const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

app.listen(3000);
