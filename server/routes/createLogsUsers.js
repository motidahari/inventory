const connection = require("../config/DB");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, userId, action, msgToClient) => {
  const userCreateAction = req.header("userId");

  try {
    const query = `INSERT INTO inventory.logsusers (logId, userId, userCreateAction, action, date) VALUES('${uuidv4()}', '${userId}', '${userCreateAction}', '${action}', NOW());`;
    await connection.execute(query, async (err, result, fields) => {
      if (err) return res.status(400).json({ errors: [{ msg: err }] });
      else if (result.affectedRows != 1) {
        return res
          .status(401)
          .json({ msg: "Error when add new log for logsusers" });
      } else if (msgToClient.length > 0) {
        return res.send({ msgToClient });
      }
    });
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "Error when add new log for logsusers" });
  }
};
