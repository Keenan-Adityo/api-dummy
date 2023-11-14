const express = require("express");
const router = express.Router();

const productRouter = require("./products/products.controller");

router.use("/products", productRouter);

module.exports = router;
