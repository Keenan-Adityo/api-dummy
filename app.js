const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const tokopediaRoute = require("./app/api/tokopedia/routes");
const shopeeRoute = require("./app/api/shopee/routes");

app.use(logger(":method :status :url - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/shopee/api/v2", shopeeRoute);
app.use("/tokopedia/v2", tokopediaRoute);

module.exports = app;
