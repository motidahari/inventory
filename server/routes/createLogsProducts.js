const connection = require("../config/DB");

module.exports = async (req, res, log, query, msgToClient) => {
  try {
    await connection.execute(query, async (err, result, fields) => {
      if (err) {
        return res.status(401).json({ errors: [{ msg: err }] });
      } else if (result.affectedRows > 0) {
        return res.send({ msg: msgToClient.succeeded });
      } else {
        return res.status(402).json({ errors: [{ msg: msgToClient.failed }] });
      }
    });
  } catch (err) {
    return res.status(403).json({ errors: [{ msg: msgToClient.failed }] });
  }
};
