const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/phim", (req, res) => {
  let sql = "SELECT * FROM movie ";
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.send(data);
    console.log(data);
  });
});

router.get("/phim/:id", (req, res) => {
  var IdMovie = req.params.id;
  db.query(
    "SELECT * FROM movie WHERE IdMovie=?",
    [IdMovie],
    function (err, data) {
      if (err) throw err;
      res.send(data);
      console.log(data);
    }
  );
});

module.exports = router;
