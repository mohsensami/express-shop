const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res) => {
    res.send('add-product');
});

module.exports = router;
