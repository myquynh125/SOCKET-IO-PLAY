const express = require("express");
const router = express.Router();
const videos = require("../data/data");
const fs = require("fs");
const thumbsupply = require("thumbsupply");

router.get("/", (req, res) => {
  res.json(videos);
});

router.get("/testSocket", (req, res) => {
  res.send({ Response: "Hello World" }).status(200);
});

module.exports = router;
