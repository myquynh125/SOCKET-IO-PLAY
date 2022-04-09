const db = require("../data/db.js");
const express = require("express");
const router = express.Router();

router.post("/dangnhap", (req, res) => {
  let userpassword = req.body.userpassword;
  let username = req.body.username;
  if (username && userpassword) {
    db.query(
      "SELECT * FROM user WHERE username=? and userpassword=?",
      [username, userpassword],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            res.send(result);
          } else {
            res.send({ message: "Sai thông tin tài khoản" });
          }
        }
      }
    );
  }
});

module.exports = router;
