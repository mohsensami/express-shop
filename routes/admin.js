const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views/html', 'add-product.html'));
});

module.exports = router;
