const express = require("express");
const router = express.Router();

const productRouter = require("./products/product.controller");

router.use("/products", productRouter);

module.exports = router;
