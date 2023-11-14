const router = require("express").Router();

const orderRouter = require("./orders/orders.controller");
const logisticRouter = require("./orders/orders.controller");

router.use("/order", orderRouter);
router.use("/logistics", logisticRouter);

module.exports = router;
