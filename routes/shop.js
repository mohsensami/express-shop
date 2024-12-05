const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(adminData.products);
    res.sendFile(path.join(__dirname, '../', 'views/html', 'shop.html'));
});

module.exports = router;
