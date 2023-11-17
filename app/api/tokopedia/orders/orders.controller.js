const route = require("express").Router();
const { readFile } = require("fs/promises");

const path = "app/data/tokopedia/order";

route.get("/order/list", async (req, res) => {
  try {
    const { fs_id, from_date, to_date, page, per_page, status } = req.query;

    const validStatus = [
      0, 3, 5, 6, 10, 15, 100, 103, 220, 221, 400, 450, 500, 501, 520, 530, 540,
      550, 600, 601, 690, 700,
    ];

    if (!fs_id) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "fs_id cannot be empty",
          error_code: "ORD_DLV_001",
        },
        data: null,
      });
    }

    if (!from_date) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "from_date cannot be empty",
          error_code: "ORD_DLV_009",
        },
        data: null,
      });
    }

    if (!to_date) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "to_date cannot be empty",
          error_code: "ORD_DLV_011",
        },
        data: null,
      });
    }

    if (!page) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "page cannot be empty",
          error_code: "ORD_DLV_014",
        },
        data: null,
      });
    }

    if (!per_page) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "per_page cannot be empty",
          error_code: "ORD_DLV_016",
        },
        data: null,
      });
    }

    if (status && !validStatus.includes(parseInt(status))) {
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "invalid status format",
          error_code: "ORD_DLV_018",
        },
        data: null,
      });
    }

    const data = await readFile(`${path}/orders.json`, "utf-8");
    const orders = JSON.parse(data);

    const filteredOrders = status
      ? orders.filter((order) => order.order_status == status)
      : orders;

    return res.status(200).json({
      header: {
        process_time: 0.018328845,
        messages: "Your request has been processed successfully",
      },
      data: filteredOrders,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

route.get("/fs/:fs_id/order", async (req, res) => {
  try {
    const { fs_id } = req.params;

    const { order_id } = req.query;

    if (!fs_id) {
      return res.json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "fs_id cannot be empty",
          error_code: "ORD_DLV_001",
        },
        data: null,
      });
    }

    if (!order_id) {
      return res.json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason:
            "error must choose either order id or invoice no as parameter",
          error_code: "ORD_DLV_004",
        },
        data: null,
      });
    }

    const data = await readFile(`${path}/order.json`, "utf-8");
    const order = JSON.parse(data);

    return res.status(200).json({
      header: {
        process_time: 0.018328845,
        messages: "Your request has been processed successfully",
      },
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

route.get("/order/:order_id/fs/:fs_id/shipping-label", async (req, res) => {
  try {
    const { order_id, fs_id } = req.params;

    if (!order_id || !fs_id) {
      return res.status(400).json({
        header: {
          process_time: 0.112139045,
          messages: "Our server encounters an error, please try again later",
          reason: "Data Not Found",
          error_code: "ORD_API_008",
        },
        data: null,
      });
    }

    const invoiceDoc = await readFile(`${path}/shipping-label.pdf`);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=shipping-label.pdf`
    );

    return res.send(invoiceDoc);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = route;
