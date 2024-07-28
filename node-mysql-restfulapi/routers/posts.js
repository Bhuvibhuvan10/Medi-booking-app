const express = require("express");
const postsController = require("../controller/post.controller");

const router = express.Router();

router.post("/", postsController.save);

module.exports = router;
