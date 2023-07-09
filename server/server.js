const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/employees", require("./routes/api/employees"));
app.use("/api/locations", require("./routes/api/locations"));
app.use("/api/logs", require("./routes/api/logs"));
app.use("/api/offices", require("./routes/api/offices"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/officeequipment", require("./routes/api/officeequipment"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
