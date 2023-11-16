const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const tokopediaRoute = require("./app/api/tokopedia/routes");
const shopeeRoute = require("./app/api/shopee/routes");
const { checkUser } = require("./app/middlewares/tokopedia/tokopedia");
const errorHandlerMiddleware = require("./app/middlewares/error-handler");
const notFoundMiddleware = require("./app/middlewares/not-found");
const prisma = require("./app/utils/prisma");

app.use(logger(":method :status :url - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/shopee/api/v2", shopeeRoute);
app.use("/tokopedia/v2", checkUser, tokopediaRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
