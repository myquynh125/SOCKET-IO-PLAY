const express = require("express");
const router = express.Router();
const videos = require("../data/data");
const fs = require("fs");
const thumbsupply = require("thumbsupply");

router.get("/", (req, res) => {
  res.json(videos);
});

router.get("/testSocket", (req, res) => {
  res.write('<h3>Hello</h3>').status(200);
  res.end();
});

module.exports = router;
