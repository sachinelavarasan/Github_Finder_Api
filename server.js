const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const { port } = require("./config");

const app = express();

dotenv.config();

app.use(express.json());
app.use(logger("dev"));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

require("./routes")(app);
