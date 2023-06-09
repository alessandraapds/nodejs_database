require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

const users = require("./Routers/usersRouter");
const orders = require("./Routers/ordersRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/orders", orders);
app.listen(PORT, () => {
  console.log(`The server is listening to ${PORT}`);
});
