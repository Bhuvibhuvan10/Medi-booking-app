const express = require("express");

const app = express();

const postsRoute = require("./routers/posts");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/posts", postsRoute);

module.exports = app;
