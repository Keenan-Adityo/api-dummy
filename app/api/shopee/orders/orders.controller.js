const route = require("express").Router();
const { readFile } = require("fs/promises");

const path = "app/data/shopee/order";

route.get("/get_order_list", async (req, res) => {
  try {
    const { order_status, time_range_field, time_from, time_to, page_size } =
      req.query;

    if (!(time_range_field || time_from || time_to || page_size)) {
      return res
        .json({
          error: "Wrong parameters",
          message: "Wrong parameters",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    const validStatus = [
      "UNPAID",
      "READY_TO_SHIP",
      "PROCESSED",
      "SHIPPED",
      "COMPLETED",
      "IN_CANCEL",
      "CANCELLED",
      "INVOICE_PENDING",
    ];

    if (order_status && !validStatus.includes(order_status)) {
      return res
        .json({
          error: "Wrong parameters",
          message: "Wrong parameters",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    const data = await readFile(`${path}/orders.json`, "utf-8");
    const orders = JSON.parse(data);

    const filteredOrders = order_status
      ? orders.filter(
          (order) => order.order_status == order_status.toUpperCase()
        )
      : orders;

    return res
      .json({
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          order_list: filteredOrders,
        },
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
      })
      .status(200);
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(500);
  }
});

route.get("/get_order_detail", async (req, res) => {
  try {
    const { order_sn_list } = req.query;

    if (!order_sn_list) {
      return res
        .json({
          error: "error_not_found",
          message: "Wrong parameters, detail: the order is not found.",
          request_id: "9d0303a7608b04555fa4f3e8a3b87c51",
        })
        .status(400);
    }

    const data = await readFile(`${path}/order-detail.json`, "utf-8");

    const order = JSON.parse(data);

    return res
      .json({
        error: "",
        message: "",
        response: {
          order_list: order,
        },
        request_id: "971b45d6a002bfc680019320c9a685a0",
      })
      .status(200);
  } catch (err) {
    return res
      .json({
        error: err,
      })
      .status(500);
  }
});

route.get("/download_invoice_doc", async (req, res) => {
  try {
    const { order_sn } = req.query;

    if (!order_sn) {
      return res
        .json({
          error: "order.download_invoice_error",
          message: "Download invoice failed.",
          request_id: "a1d5eff80ac6f0f08f90f3f6cd197610",
        })
        .status(400);
    }

    const invoiceDoc = await readFile(`${path}/invoice-shopee.pdf`);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${order_sn}_invoice.pdf`
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
