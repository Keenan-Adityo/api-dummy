const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const tokopediaRoute = require("./app/api/tokopedia/routes");
const shopeeRoute = require("./app/api/shopee/routes");

const errorHandlerMiddleware = require("./app/middlewares/error-handler");
const notFoundMiddleware = require("./app/middlewares/not-found");

const { checkUserTokopedia } = require("./app/middlewares/tokopedia/tokopedia");
const { checkUserShopee } = require("./app/middlewares/shopee/shopee");

app.use(logger(":method :status :url - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/shopee/api/v2", checkUserShopee, shopeeRoute);
app.use("/tokopedia/v2", checkUserTokopedia, tokopediaRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
