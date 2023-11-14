const express = require("express");
const router = express.Router();

const productRouter = require("./products/products.controller");
const orderRouter = require("./orders/orders.controller");

router.use("/products", productRouter);
router.use("/", orderRouter);

module.exports = router;
