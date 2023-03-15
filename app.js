require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

const users = require("./Routers/usersRouter");

app.use("/api/users", users);
app.listen(PORT, () => {
  console.log(`The server is listening to ${PORT}`);
});
