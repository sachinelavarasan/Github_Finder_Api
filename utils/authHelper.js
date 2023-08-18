const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../config");

module.exports = {
  comparePasswords: (passwordInHand, passwordInDBHash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwordInHand, passwordInDBHash, (err, result) => {
        if (result) {
          resolve(result);
        }
        if (err) {
          reject(err);
        }
        reject(new Error("Passwords not matching!"));
      });
    });
  },

  encryptPassword: (password) => {
    if (!password) throw new Error("password is required");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return { password: hash, salt };
  },

  createJWTToken: (user) => {
    return jwt.sign(user, secret);
  },
  verifyJWTToken: (token) => {
    return jwt.verify(token, secret);
  },
};
