const db = require("../../database/dbConnection");
const {
  comparePasswords,
  encryptPassword,
  createJWTToken,
} = require("../../utils/authHelper");

const getUser = (req, res) => {
  const { user } = req;
  db.query(
    "SELECT * FROM users where id=?",
    user.name,
    function (error, results) {
      if (!results.length) {
        return res.status(401).json({
          message: "Bad credentials",
        });
      } else if (error) {
        throw error;
      }
      return res.send({
        user: results[0],
      });
    }
  );
};

const register = async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(?)`,
        [req.body.email],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    if (rows.length) {
      return res.status(409).json({
        status: false,
        message: "This user is already in use!",
      });
    }
    const { password, salt } = encryptPassword(req.body.password);
    console.log(password, salt);

    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, email, password,password_salt) VALUES (?,?,?,?)`,
        [req.body.name, req.body.email, password, salt],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json({
      status: true,
      message: "The user has been registerd with us!",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [req.body.email],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    if (!rows.length) {
      return res.status(401).json({
        status: false,
        message: "User cannot be found",
      });
    }
    await comparePasswords(req.body.password, rows[0].password);

    const token = createJWTToken(rows[0]);

    const loginUser = rows[0];

    return res.status(200).send({
      status: true,
      message: "Successfully logged in",
      token,
      user: loginUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: "The email address or password is incorrect.",
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
