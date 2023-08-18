const auth = require("./Auth");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("GITHUB FINDER");
  });
  app.use("/api/auth", auth);
};
