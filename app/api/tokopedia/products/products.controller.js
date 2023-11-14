const express = require("express");
const { readFile } = require("fs/promises");
const route = express.Router();

const path = "./app/data/tokopedia/product";

route.get("/", async (req, res) => {
  const data = await readFile(`${path}/products.json`);

  const products = JSON.parse(data);

  return res.json(products).status(200);
});

route.get("/get", async (req, res) => {
  const data = await readFile(`${path}/product.json`);

  const product = JSON.parse(data);

  return res.json(product).status(200);
});

route.post("/create", async (req, res) => {
  const data = await readFile(`${path}/product.json`);

  const product = JSON.parse(data);

  // const payload =

  return res.json(product).status(200);
});

module.exports = route;
