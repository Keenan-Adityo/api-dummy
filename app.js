const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const tokopediaRoute = require("./app/tokopedia/routes");

app.use(logger(":status :method :url - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tokopedia", tokopediaRoute);

module.exports = app;