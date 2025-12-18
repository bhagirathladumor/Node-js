require("./config/db.config.js");
const express = require("express");
const app = express();
const port = 9000;

app.set("view engine","ejs")

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(port, () => {
  console.log(`Server is started`);
});
