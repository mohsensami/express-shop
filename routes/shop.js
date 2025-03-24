// const path = require('path');

const express = require("express");
const { isAuth } = require("../middleware/is-auth");
const shopControllers = require("../controllers/shop");

const router = express.Router();

router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getAllProducts);

router.get("/products/:productId", shopControllers.getOneProduct);

router.get("/cart", isAuth, shopControllers.getCart);

router.post("/cart", isAuth, shopControllers.postCart);

router.get("/search", shopControllers.search);

// router.use(shopControllers.globalDataMiddleware);

router.get("/orders", isAuth, shopControllers.getOrders);

router.get("/checkout", isAuth, shopControllers.getCheckout);

module.exports = router;
