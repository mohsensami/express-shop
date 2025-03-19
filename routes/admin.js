const path = require("path");

const express = require("express");

const adminControllers = require("../controllers/admin");
const { isAuth } = require("../middleware/is-auth");

const router = express.Router();

router.get("/dashboard", isAuth, adminControllers.getDashboard);

router.get("/add-product", isAuth, adminControllers.addProductPage);

router.post("/add-product", isAuth, adminControllers.sendProducts);

router.get("/products", isAuth, adminControllers.getProducts);

router.post("/delete-product", isAuth, adminControllers.deleteProduct);

module.exports = router;

// exports.routes = router;
