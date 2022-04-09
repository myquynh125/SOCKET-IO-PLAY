var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "congcu",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connect mysql");
});

module.exports = con;
