var mysql = require("mysql2");
const { db_host, db_password, db_user, database } = require("../config");

var conn = mysql.createConnection({
  host: db_host, // Replace with your host name
  user: db_user, // Replace with your database username
  password: db_password, // Replace with your database password
  database: database,
  debug: false, // // Replace with your database Name
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = conn;
