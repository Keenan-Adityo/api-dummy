const route = require("express").Router();

const path = "app/data/shopee/logistic";

route.post("/download_shipping_document", async (req, res) => {
  try {
    const { order_list } = req.body;

    if (!order_list || !Array.isArray(order_list) || order_list.length === 0) {
      return res.status(400).json({
        error: "Wrong parameters",
        message: "Wrong parameters.",
      });
    }

    for (const order of order_list) {
      const { order_sn, package_number } = order;

      if (!order_sn || !package_number) {
        return res.status(400).json({
          error: "Wrong parameters",
          message: "Wrong parameters.",
        });
      }
    }

    const invoiceDoc = await readFile(`${path}/shipping-label.pdf`);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=shipping-label.pdf`
    );

    return res.send(invoiceDoc);
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(500);
  }
});

module.exports = route;
