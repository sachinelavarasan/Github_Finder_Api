const express = require("express");
const {
  loginValidation,
  signupValidation,
  validator,
} = require("../../utils/validation");
const { login, getUser, register } = require("./auth.controller");
const { authenticateJWT } = require("./auth.middleware");

var router = express.Router();

router.post("/login", loginValidation, validator, login);
router.post("/register", signupValidation, validator, register);
router.get("/getuser", authenticateJWT, getUser);

module.exports = router;
