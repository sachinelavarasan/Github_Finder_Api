// config.js
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  db_user: process.env.DB_USER,
  db_password: process.env.PASSWORD,
  db_host: process.env.DB_HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
};
