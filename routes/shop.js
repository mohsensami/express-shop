const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Shop Page');
});

module.exports = router;
