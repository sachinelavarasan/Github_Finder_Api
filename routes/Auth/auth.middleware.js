const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

const authenticateJWT = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized user",
        });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

module.exports = {
  authenticateJWT,
};
