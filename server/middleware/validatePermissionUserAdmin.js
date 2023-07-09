const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const connection = require("../config/DB");

module.exports = async (req, res, next) => {
  //Verify token
  try {
    //Get the token from the header
    const userId = req.header("userId");
    const token = req.header("x-auth-token");
    //Check if not token
    if (!token) {
      return res
        .status(401)
        .json({
          errors: [{ msg: "No token, authorization denied -> " + token }],
        });
    }
    if (!userId) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Please include a userId in the header " }] });
    }
    const decoded = jwt.verify(token, config["jwtSecret"]);
    req.user = decoded.user;
    const query = `SELECT permission FROM inventory.users WHERE userId = '${userId}';`;

    await connection.execute(query, async (err, result, fields) => {
      if (err) return res.status(400).json({ errors: err });
      else if (result[0] && result[0].permission === "Admin") {
        next();
      } else {
        return res
          .status(500)
          .send({
            errors: [{ msg: "You do not have permission to do this action" }],
          });
      }
    });
  } catch (err) {
    // console.error(err.massege);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
