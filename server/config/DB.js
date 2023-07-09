const mysql = require("mysql2");

const dev = {
  host: "127.0.0.1",
  user: "root",
  database: "inventory",
  password: "123456789",
};
// create the connection to rds
const connection = mysql.createConnection(dev);
// check connection to rds
connection.connect((err) => {
  if (err) throw err;
  console.log("Database is connected!");
});

module.exports = connection;
